"use client"
 
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { useTheme } from "next-themes"
import Link from "next/link"
import { useEffect, useState } from "react"
import { Moon, Sun } from "lucide-react"
import useAuthStore from "./zustand_auth"
import AccountModal from "./account_modal"
import Image from "next/image"



export default function Header() {
    const {isLoggedIn, signIn, signOut} = useAuthStore()

    const { theme, setTheme } = useTheme()
    const [ isDarkMode, setIsDarkmode] = useState()

    useEffect(() => {
        setIsDarkmode(theme == 'dark')
    }, [])

    return (
        <>
            <h1 className="text-lg">
                <Link href='/' className="flex font-bold items-center">
                    <img src={'/favicon.png'} width={40} height={40} alt="Logo"/>
                    Animated Chart
                </Link>
            </h1>
            <div className="flex items-center gap-x-4">
                <div className={`flex items-center gap-x-4 ${isLoggedIn() ? 'hidden' : true}`}>
                    <Button className="font-bold" onClick={signIn}>SignUp Or Login</Button>
                </div>
                <Button className={`font-bold ${!isLoggedIn() ? 'hidden' : ''}`} onClick={signOut}>Log out</Button>
                <AccountModal/>
                {isDarkMode ? <Moon/> : <Sun/>}
                <Switch
                    checked = {isDarkMode}
                    onCheckedChange={() => {
                        if(isDarkMode) {
                            setTheme('light')
                            setIsDarkmode(false)
                        } else {
                            setTheme('dark')
                            setIsDarkmode(true)
                        }
                    }}
                />
            </div>
        </> 
    )
}