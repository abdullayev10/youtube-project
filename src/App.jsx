import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./companents/Register";
import Index from "./companents/Index";
import Admin from "./companents/Admin";
import Login from "./companents/Login";

export default function App(){

    return(
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="/index" element={<Index/>}/>
                    <Route path="/" element={<Register/>}/>
                    <Route path="/admin" element={<Admin/>}/>
                    <Route path="/login" element={<Login/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    )
}