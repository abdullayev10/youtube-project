import img from "../img/signin-image.jpg"
import "../css/login.css"
import "../css/material-design-iconic-font.css"
import "../css/material-design-iconic-font.min.css"
import { useState } from "react";
import axios from "axios"
import { Link, useNavigate } from "react-router-dom"

export default function Login() {
    const [name, setName] = useState("")
    const [pass, setPass] = useState("")
    const [isError,setIsError] = useState(false)
    const navigate = useNavigate()

    
    function handleClick(e){
        e.preventDefault()
        axios.post("https://youtube-backend-pvou.onrender.com/api/login",{
            "userName" :name,
            "password":pass
        }).then(res => {
            console.log(res)
            if(res.status == 200){
                window.localStorage.setItem("token" ,res.data.token)
                window.localStorage.setItem("data",JSON.stringify(res.data.data))
                navigate("/index")
            }
        }).catch(error => {
            setIsError(error.response.data.message)
            console.log(error)
        })
       
    }

    return(
        <div class="container3">
        <div class="wrapper2 sign-in">
            <form id="loginForm" action="#" class="site-form">
                <h1 class="title">Sign in</h1>
                <span id="errorMessage" style={{"margin-bottom" : "15px", "height": "19px" , "color": "red"}}>
                {
                    isError ? isError : <></>
                }
                </span>
                <label>
                    <span class="zmdi zmdi-account"></span>
                    <input type="text" id="usernameInput" placeholder="Your name" onChange={(e) =>  setName(e.target.value)}/>
                </label>
                <label>
                    <span class="zmdi zmdi-lock"></span>
                    <input type="password" id="passwordInput" placeholder="Password" onChange={(e) =>  setPass(e.target.value)}/>
                    <button class="zmdi zmdi-eye" id="showButton" type="button"></button>
                </label>
                    <input type="submit" value="Log in" id="submitButton" onClick={handleClick} />
            </form>
           <div style={{"margin-top ": "20px"}}>
               <Link style={{"margin-right ": "25px"}} to="/index" class="sign-link">home</Link>
               <Link to="/" class="sign-link">Create an account</Link>
           </div>
            <img src={img} alt="signin-image" class="signin-image" />
        </div>
    </div>
    )
}