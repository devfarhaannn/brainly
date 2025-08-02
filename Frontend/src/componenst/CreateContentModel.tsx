import { useRef, useState } from "react"
import { CrossIcon } from "../icons/CrossIcon"
import { Button } from "./Button"
import { Input } from "./Input"
import axios from "axios"
import { BACKEND_URL } from "../config"

enum ContentType{
    YouTube = "youtube",
    Twitter = "twitter",
}
interface CreateModelContentProps {
  open: boolean;
  onClose: () => void;
}

export function CreateModelContent({open, onClose}:CreateModelContentProps) {
    const titleRef = useRef<HTMLInputElement>(null)
    const linkRef = useRef<HTMLInputElement>(null)
    const [type, setType] = useState(ContentType.YouTube)

   async  function addContent(){
        const title = titleRef.current?.value
        const link = linkRef.current?.value

       await axios.post(`${BACKEND_URL}/api/v1/content`,{
            link,
            type,
            title
        },{
            headers:{
                "Authorization":localStorage.getItem("token")
            }
        })
        onClose()
    }

    return <div>
        {open && <div><div className="w-screen h-screen bg-gray-500 opacity-60 fixed top-0 left-0 flex justify-center ">
          
        </div>
        <div className="w-screen h-screen  fixed top-0 left-0 flex justify-center ">
            <div className="flex flex-col justify-center ">
          <span className="bg-white opacity-100 p-4  rounded fixed border">
            <div className="flex justify-end" >
                <div onClick={onClose} className="cursor-pointer">
                <CrossIcon/>
                </div>
                
            </div>
           <div>
               <Input reference = {titleRef} placeholder = {"Title"}/>,
               <Input reference={linkRef} placeholder = {"Link"}/>
           </div>
           <h1>Type</h1>
           <div className="flex gap-1 justify-center pb-4">
           <Button text="YouTube" variant={type === ContentType.YouTube ? "primary" : "secondary"}
           onClick={() =>{
            setType(ContentType.YouTube)
           }}/>
           <Button text="Twitter" variant={type === ContentType.Twitter ? "primary" : "secondary"}
           onClick={() =>{
            setType(ContentType.Twitter)
           }}/>
           </div>
           <div className=" flex justify-center" >
            <Button onClick={addContent} variant="primary" text="Submit"   />
           </div>
          </span>
          </div>
          
        </div>
        
        
        </div>}
    </div>
}

