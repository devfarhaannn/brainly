import { Logo } from "../icons/Logo";
import { TwitterIcon } from "../icons/TwitterIcon";
import { YouTubeIcon } from "../icons/YouTubeIcon";
import { SidebarItem } from "./Sidebaritem";

export function Sidebar(){
    return <div className=" h-screen bg-white  w-72 border-r fixed left-0 top-0 pl-6">
     <div className="text-2xl flex pt-8 items-center">
        <div className="pr-2 pt-2">
        {<Logo/>}
        </div>
        Brainly
     </div>
     <div className="pt-8 pl-4 ">
    <SidebarItem text="Twitter" Icon={<TwitterIcon/>}/>
    <SidebarItem text="YouTube" Icon={<YouTubeIcon/>}/>
     </div>

    </div>
}