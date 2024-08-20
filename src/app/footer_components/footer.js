import Link from "next/link"

export default function Footer() {
    return(
        <div className="flex">
            <div className="text-xs mr-3"><Link href={'/terms'}>Terms of conditions</Link></div>
            <div className="text-xs mr-3"><Link href={'/privacy'}>Privacy policy</Link></div>
            <div className="text-xs">Copyright © 2024 - All rights reserved</div>
        </div>
        
    )
}