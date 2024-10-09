import Link from "next/link";

export default function NavbarClient(){
    return(
        <nav className="flex items-center gap-10">
            <Link href="/">Home</Link>
            <Link href ="/catalog">Catalog</Link>
            <Link href = "/login">Admin Login</Link>
            
        </nav>
    )
}