"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import Image from "next/image";
import useAuthStore from "./zustand_auth";

export default function LoginModal() {
    const { isLoggedIn, signIn } = useAuthStore();
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null;
    }

    return (
        <Dialog modal={false}>
            <DialogTrigger className={`${isLoggedIn() ? 'hidden' : ''}`}>
                <Button className="font-bold">Sign up or Login</Button>
            </DialogTrigger>
            <DialogContent className={`${isLoggedIn() ? 'hidden' : ''}`}>
                <DialogHeader>
                    <DialogTitle>Sign up or Login</DialogTitle>
                </DialogHeader>
                <div className="flex flex-col items-center">
                    <Image
                        className="cursor-pointer"
                        src={'/google_signup_2x.png'}
                        width={250}
                        height={50}
                        alt="Signup with Google"
                        onClick={signIn}
                    />
                </div>
                
            </DialogContent>
        </Dialog>
    );
}