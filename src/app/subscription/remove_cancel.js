"use client"

import useAuthStore from "../header_components/zustand_auth";
import { Button } from "@/components/ui/button"
import { ScheduledAction, SubscriptionStatus } from "./subscription_status";

export default function RemoveCancelButton() {    
    const {firestoreSubscription} = useAuthStore()
    const unSubscribe = async () => {
        if(!isButtonShow()) {
            return null
        }

        const subscription_id = firestoreSubscription.subscription_id
        const response = await fetch(`/subscription/removeCancelSchedule/${subscription_id}`, {method:"PATCH"});
        // const result = await response.json()
        // const status = response.status
    }

    const isButtonShow = () => {
        if(firestoreSubscription === null) {
            return false
        }

        const scheduledChange = firestoreSubscription.scheduled_change

        if(scheduledChange === null) {
            return false
        }

        const action = scheduledChange.action

        if(action === ScheduledAction.CANCEL) {
            return true
        }

        return false
    }

    return (
        <Button className={`font-bold ${isButtonShow() ? '' : 'hidden'}`} onClick={async () => await unSubscribe()}>Remove Cancel Schedule of this subscription</Button>
    )
}