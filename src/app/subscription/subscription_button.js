"use client"

import useAuthStore from "../header_components/zustand_auth";
import { Button } from "@/components/ui/button"
import { SubscriptionStatus } from "./subscription_status";

export default function SubscriptionButton() {
    const {getUid, getEmail, firestoreSubscription} = useAuthStore()
    const productId = process.env.NEXT_PUBLIC_PRODUCT_ID_UNLOCKER
    const monthItems = [
        {
            priceId: process.env.NEXT_PUBLIC_PRICE_ID_UNLOCKER,
            quantity: 1
        }
    ]

    function subscribe(items) {
        Paddle.Checkout.open({
            customData: {uid: getUid()},
            items: items,
            customer: {
                email: getEmail()
            }
        })
    }

    const isButtonShow = () => {
        if(firestoreSubscription === null) {
            return true
        }

        const status = firestoreSubscription.status        
        if(status === SubscriptionStatus.CANCELED) {
            return true
        }

        return false
    }

    return (
        <Button className={`font-bold ${isButtonShow() ? '' : 'hidden'}`} onClick={() => subscribe(monthItems)}>Subscribe</Button>
    )
}