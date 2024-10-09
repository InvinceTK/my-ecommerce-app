import Logo from "../admin/_components/logo";
import NavbarClient from "./navbarClient";

export default function PageHeaderClient(){
    return(
        <div className="flex w-full bg-slate-200 text text-black justify-between top-0 sticky p-5 z-50" >
            <Logo/>
            <NavbarClient/>
        </div>
    )
}