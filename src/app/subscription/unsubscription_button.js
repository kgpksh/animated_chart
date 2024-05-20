"use client"

import useAuthStore from "../header_components/zustand_auth";
import { Button } from "@/components/ui/button"
import { ScheduledAction, SubscriptionStatus } from "./subscription_status";

export default function UnSubscriptionButton() {    
    const {isLoggedIn, firestoreSubscription} = useAuthStore()
    const unSubscribe = async () => {
        if(!isButtonShow()) {
            return null
        }

        const subscription_id = firestoreSubscription.subscription_id
        const response = await fetch(`/subscription/unsubscription/${subscription_id}`);
        const data = await response.json()
        
        const cancelUrl = data.cancelUrl

        window.open(cancelUrl, '_blank')

    }

    const isButtonShow = () => {
        if(firestoreSubscription === null) {
            return false
        }

        const status = firestoreSubscription.status

        if(status === SubscriptionStatus.CANCELED) {
            return false
        }
        const scheduledChange = firestoreSubscription.scheduled_change

        if(scheduledChange === null) {
            return false
        }

        if(scheduledChange.action === ScheduledAction.CANCEL) {
            return false
        }

        return true
    }

    return (
        <Button className={`font-bold ${isButtonShow() ? '' : 'hidden'}`} onClick={async () => await unSubscribe()}>Unsubscribe</Button>
    )
}