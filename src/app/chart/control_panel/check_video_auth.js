"use cient"

import useAuthStore from "@/app/header_components/zustand_auth"
import SubscriptionButton from "@/app/subscription/subscription_button"
import { LockKeyholeOpen } from "lucide-react"

export default function CheckVideoAuth() {
    const {isLoggedIn} = useAuthStore()
    return (
        <>
            {!isLoggedIn() ?
                <div className="w-full h-full font-bold">
                    <div className="flex"><LockKeyholeOpen className="mr-2"/>Create animation and download it!</div>
                    <div>Login & get Unlocker!</div>
                </div>
                :
                <div className="flex font-bold">
                    
                    <div className="flex justify-center"><LockKeyholeOpen className="mr-2"/>Get Unlocker and create animation!</div>
                    <SubscriptionButton/>
                </div>
            }
        </>
    )
}