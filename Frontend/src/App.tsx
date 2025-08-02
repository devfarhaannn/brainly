import { BrowserRouter, Route, Routes } from "react-router-dom"
import Dashboard from "./Pages/dashboard"
import { SignIn } from "./Pages/Signin"
import { SignUp } from "./Pages/Signup"



function App(){
  return <BrowserRouter>
  <Routes>

    <Route path="/signup" element={<SignUp/>}/>
    <Route path="/signin" element={<SignIn/>}/>
    <Route path="/dashboard" element={<Dashboard/>}/>
  </Routes>
  </BrowserRouter>
}

export default App