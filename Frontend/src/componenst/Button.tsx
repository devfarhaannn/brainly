import type { ReactElement } from "react"

interface ButtonProps{
    variant:"primary" | "secondary",
    text : String,
    startIcon:ReactElement,
    onClick?:() => void,
    fullWidhth:boolean,
    loading:boolean
}

const variantClasses = {
    "primary":"bg-purple-600 text-white",
    "secondary":"bg-purple-200 text-purple-500"
}
const defaultClasses = "px-4 py-2 rounded-md font-light flex  items-center"

export function Button({variant, text,startIcon,onClick,fullWidhth,loading}:ButtonProps){
    return <button onClick = {onClick} className = {variantClasses[variant] + " " + defaultClasses + `${fullWidhth ? " w-full  justify-center " : ""} ${loading ? "opacity-45" : ""}`}
    disabled = {loading}>
        <div className="pr-2">
            {startIcon}
            </div>
        {text}
        </button>
}