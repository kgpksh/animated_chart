import Link from "next/link"

export default function Footer() {
    return(
        <div className="text-xs"><Link href={'/terms'}>Terms of Service</Link></div>
    )
}