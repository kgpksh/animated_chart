"use client"
 
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { useTheme } from "next-themes"
import Link from "next/link"
import { useEffect, useState } from "react"
import { Moon, Sun } from "lucide-react"
import { initFirebase } from "./firebase"
import { getAuth, GoogleAuthProvider, signInWithPopup} from 'firebase/auth'

export default function Header() {
    const { theme, setTheme } = useTheme()
    const [ isDarkMode, setIsDarkmode] = useState()

    const app = initFirebase()
    const auth = getAuth(app)
    const provider = new GoogleAuthProvider()

    const [isLoggedIn, setIsloggedIn] = useState()

    const googleSignIn = async () => {
        try {
            const result = await signInWithPopup(auth, provider)
            const user = result.user
            setIsloggedIn(user != null)
        } catch (e) {
            
        }
    }

    const signOut = () => {
        auth.signOut()
        setIsloggedIn(false)
    }

    useEffect(() => {
        setIsDarkmode(theme == 'dark')
        console.log(auth.currentUser)
    }, [])
    return (
        <header className="flex w-full item-center justify-between">
            <Link href='/' className="font-bold">To home</Link>
            <div className="flex items-center gap-x-4">
                <div className={`flex items-center gap-x-4 ${isLoggedIn ? 'hidden' : true}`}>
                    <Button className="font-bold" onClick={googleSignIn}>SignUp Or Login</Button>
                </div>
                <Button className={`font-bold ${!isLoggedIn ? 'hidden' : true}`} onClick={signOut}>Log out</Button>
                
                
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
            
        </header>
    )
}