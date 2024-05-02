import axios from "axios"
import "../css/register.css"
import "../css/styles.css"
import "../css/material-design-iconic-font.css"
import "../css/material-design-iconic-font.min.css"
import img from "../img/signup-image.jpg"
import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"

export default function Register(){
    
    const [pass, setPass] = useState("")
    const [name, setName] = useState("")
    const [file, setFile] = useState("")
    const [isError,setIsError] = useState(false)

    const navigate = useNavigate()

    function hendleClick(e) {
        e.preventDefault()
        let formData = new FormData()
        formData.append("userName", name)
        formData.append("password", pass)
        formData.append("profilImg", file)
        axios.post("https://youtube-backend-pvou.onrender.com/api/register", formData, {
            headers: {
                "Content-Type": "application/multi-part"
            }

        }).then(res => {
            console.log(res)
            if (res.status === 201) {
                window.localStorage.setItem("token",res.data.token)
                window.localStorage.setItem("data",JSON.stringify(res.data.data))
                navigate("/index")
            }
        }).catch(error => {
            setIsError(error.response.data.message)
            console.log(error)
        })
    }


    return(
        <div class="container1">
        <div class="wrapper1">
            <h1 class="title1">Registration Page</h1>
            <form id="registerForm" action="#" class="site-form">
                <span id="errorMessage" style={{"margin-bottom": "15px", "height": "19px", "color": "red"}}>
                {
                    isError ? isError : <></>
                }
                </span>
                <label>
                    <span class="zmdi zmdi-account"></span>
                    <input onChange={e => setName(e.target.value)} type="text" id="usernameInput" placeholder="Your name" required />
                </label>
                <label>
                    <span class="zmdi zmdi-lock"></span>
                    <input onChange={e => setPass(e.target.value)} type="password" id="passwordInput" placeholder="Password" required />
                    <button class="zmdi zmdi-eye" type="button" id="showButton"></button>
                </label>
                <label class="custom-upload">
                    <span class="zmdi zmdi-upload"></span>
                    <span class="file-name">click upload a avatar picture</span>
                    <input onChange={e => setFile(e.target.files[0])}  type="file" id="uploadInput" accept="image/*" />
                </label>
                <input onClick={hendleClick} type="submit" value="Register" id="submitButton" />
            </form>
            <div style={{"margin-top": "20px"}}>
               <Link style={{"margin-right": "25px"}} to ="/index" class="sign-link">home</Link>
               <Link to ="/login">I am already member</Link>
           </div>
            <img src={img} alt="signup-image" class="signup-image" />
        </div>
    </div>
    )
}

