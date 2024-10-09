import Logo from "./logo";
import Navbar from "./navbar";

export default function PageHeader(){
    return(
        <div className="flex w-full bg-slate-200 text text-black justify-between top-0 sticky p-5 ">
            <Logo/>
            <Navbar/>
        </div>
    )
}