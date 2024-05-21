"use client"

import useAuthStore from "../header_components/zustand_auth"
import { SubscriptionStatus } from "./subscription_status";
import { Button } from "@/components/ui/button";

export default function UpdateSubscriptionDetailButton() {
    const {firestoreSubscription} = useAuthStore()
    const updateDetail = async () => {
        if(!isButtonShow()) {
            return null
        }

        const subscription_id = firestoreSubscription.subscription_id
        const response = await fetch(`/subscription/updateDetail/${subscription_id}`);
        const data = await response.json()
        
        const txnId = data.txnId
        
        Paddle.Checkout.open({
            transactionId : txnId
        })
    }

    const isButtonShow = () => {
        if(firestoreSubscription === null) {
            return false
        }

        const status = firestoreSubscription.status        
        if(status === SubscriptionStatus.CANCELED) {
            return false
        }

        return true
    }

    return (
        <Button className={`font-bold ${isButtonShow() ? '' : 'hidden'}`} onClick={() => updateDetail()}>Update Payment Method</Button>
    )
}