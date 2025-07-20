import type { ReactElement } from "react"

export function SidebarItem({ text, Icon }: {
    text: String,
    Icon: ReactElement
}) {
    return <div className="flex text-gray-700 py-2 cursor-pointer hover:bg-gray-300 rounded max-w-48 trasition-all duration-150">

        <div className="pr-2 text-gray-200">
            {Icon}
        </div>
        <div className="">
        {text}
        </div>
        
    </div>
}