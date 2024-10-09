import Image from "next/image";
import Link from "next/link";

export default function Logo(){
    return(
       <Link href = "/admin"> <Image alt = "logo" src = "/logo.svg" height = "64" width="64" ></Image></Link>
    )
}