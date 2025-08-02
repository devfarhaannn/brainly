import { useRef } from "react";
import { Button } from "../componenst/Button";
import { Input } from "../componenst/Input";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";

export function SignUp(){
    const usernameRef = useRef<HTMLInputElement>(null)
    const passwordRef = useRef<HTMLInputElement>(null)
    const navigate = useNavigate()

   async function signup(){
        const username = usernameRef.current?.value
        const password = passwordRef.current?.value
    
        
        await axios.post(BACKEND_URL + "/api/v1/signup",{
                username,
                password  
        }) 
        navigate("/signin")
        alert("You are signedup!")
    }
    return <div className="h-screen w-screen bg-gray-200 flex justify-center items-center">
           <div className="bg-white rounded-xl border min-w-48 p-8  ">
              <Input reference={usernameRef} placeholder="Username" />
              <Input reference={passwordRef}placeholder="Password"/>
              <div className="flex justify-center items-center pt-4">
              <Button onClick={signup} loading={false} variant="primary" text="Signup" fullWidhth={true}/>
              </div>
           </div>
    </div>
}
