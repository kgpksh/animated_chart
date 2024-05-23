"use client"

import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import SubscriptionButton from "../subscription/subscription_button";
import UnSubscriptionButton from "../subscription/unsubscription_button";
import { User } from "lucide-react";
import useAuthStore from "./zustand_auth";
import { ScheduledAction, SubscriptionStatus } from "../subscription/subscription_status";
import formatDateString from "../utils/date_time_format_converter";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import UpdateSubscriptionDetailButton from "../subscription/update_detail_button";
import RemoveCancelButton from "../subscription/remove_cancel";

export default function AccountModal() {
    useEffect(() => {
        if (Paddle) {
            Paddle.Environment.set("sandbox");
            Paddle.Initialize({ token: process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN });
          }
    }, [])

    const {isLoggedIn, firestoreSubscription} = useAuthStore()
    const styles = {
        iconContainer: {
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "40px",
          height: "40px",
          borderRadius: "50%",
          border: "2px solid",
        },
      }

      const periodSentence = () => {
        if(firestoreSubscription === null) {
            return ''
        }

        const status = firestoreSubscription.status
        
        if(status === SubscriptionStatus.CANCELED) {
            return ''
        }

        const nextBilledAt = formatDateString(firestoreSubscription.next_billed_at)
        const scheduledChange = firestoreSubscription.scheduled_change
        const scheduledChangeDate = formatDateString(scheduledChange?.effective_at)

        if(status === SubscriptionStatus.ACTIVE) {
            if(scheduledChange === null) {
                return `Your subscription renews around ${nextBilledAt}.`
            }

            const action = scheduledChange.action

            if(action === ScheduledAction.CANCEL) {
                return `This cancelled subscription will still be available until around ${scheduledChangeDate}`
            }

            if(action === ScheduledAction.PAUSE) {
                return `Your subscription will be paused starting on around ${scheduledChangeDate}`
            }

            if(action === ScheduledAction.RESUME) {
                return `Your subscription will resume on around ${scheduledChangeDate}`
            }
        }

        if(status === SubscriptionStatus.PAUSED) {
            return `Your subscription is paused.`
        }

        if(status === SubscriptionStatus.PASTDUE) {
            return `Your subscription is past-due. Please update your payment method.`
        }

        if(status === SubscriptionStatus.TRAILING) {
            return `You are currently in a trial subscription.`
        }
      }

    return (
        <Dialog>
            <DialogTrigger className={`${!isLoggedIn() ? 'hidden' : ''}`}>
            <div style={styles.iconContainer}>
                <User size={24}/>
            </div>
            </DialogTrigger>
            <DialogContent className={`${!isLoggedIn() ? 'hidden' : ''}`}>
                <DialogHeader>
                    <DialogTitle>Account</DialogTitle>
                </DialogHeader>
                {periodSentence()}
                <SubscriptionButton></SubscriptionButton>
                <UnSubscriptionButton></UnSubscriptionButton>
                <RemoveCancelButton></RemoveCancelButton>
                <UpdateSubscriptionDetailButton></UpdateSubscriptionDetailButton>
                <DialogClose>
                    <Button>OK</Button>
                </DialogClose>
            </DialogContent>
        </Dialog>
    )
}