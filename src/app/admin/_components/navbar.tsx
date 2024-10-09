import Link from "next/link";

export default function Navbar(){
    return(
        <nav className="flex items-center gap-10">
            <Link href = "/admin">Admin</Link>
            <Link href = "/admin/dashboard">Dashboard</Link>
            <Link href = "/">Client Home</Link>
        </nav>
    )
}