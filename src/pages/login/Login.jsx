import React, { useEffect, useState } from 'react'
import "./login.css"
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { IoIosArrowRoundForward } from "react-icons/io";
import { jwtDecode } from "jwt-decode";


const clientId = import.meta.env.VITE_CLIENT_ID;
console.log("Google Client ID:", clientId);


const Login = ( ) => {
  const [name ,setName] = useState('')
  const [password ,setPassword] = useState('')
  const navigate= useNavigate()
   useEffect(() => {
        /* global google */
        if (window.google) {
          google.accounts.id.initialize({
            client_id: clientId,
            callback: handleCredentialResponse,
          });

          google.accounts.id.renderButton(
            document.getElementById("googleSignInDiv"),
            { theme: "outline", size: "large", width: 200,height:100}
          );
        }
      }, []);

      const handleCredentialResponse =(response)=>{
          try {
              const user = jwtDecode(response.credential);
              console.log("✅ Google User:", user);

              // Save to localStorage
              localStorage.setItem("loggedInUser", JSON.stringify(user));
              window.dispatchEvent(new Event("storage"));
              toast.success("Google login success!");
              navigate("/");
              } catch (error) {
                console.error("Error decoding Google token:", error);
                toast.error("Google login failed!");
            }
          }
  const handleSubmit =(e)=>{
    e.preventDefault()
      let users=JSON.parse(localStorage.getItem("users"))||[]
      let validate=users.find(
        (user)=>user.name===name && user.password===password  
      )

      // console.log("validate",validate)
      if(validate){
        localStorage.setItem("loggedInUser",JSON.stringify(validate))
        // alert("logged in succesfully")
        window.dispatchEvent(new Event("storage"));
        toast.success("Login success")
        navigate("/")
        console.log(validate)
      }
      else{
        toast.error("invalid username and password")
        
      }
  }
  
  return (
    <div className='container-fluid'> 
      <div className="row  justify-content-center ">
        
        <div className=" d-flex justify-content-center" >
        <div className="position-relative w-100 hero-section">
          {/* Background image */}
          <img className="img-fluid bg-img" src="./collection/6.avif" alt="" />

          <div className="overlay-content-login text-center text-dark px-3"  data-aos="">
            <div className="login  ">
                <h1 className="login-title mb-5"><b>Login</b></h1>
                {
                  <p className='text-danger'>Please login before accessing site </p>
                }
                
                <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    {/* <label htmlFor="username" className="form-label fs-5">Username</label> */}
                    <input type="text" name="name" id="name" value={name} onChange={(e)=>setName(e.target.value)} className="form-control" placeholder='Username' />
                </div>
                <div class="mb-3">
                    {/* <label htmlFor="password" className="form-label fs-5">Password</label> */}
                    <input type="password" name="password" value={password} onChange={(e)=>setPassword(e.target.value)} id="password" className="form-control"  placeholder='Password'/>
                </div>
                <div className=' text-center '>
                    <button className="login-btn btn ps-4 pe-4 fs-5  ">Login</button>
                    <div className='d-flex justify-content-center'>
                      <div className="mt-4 text-center">
                  <div id="googleSignInDiv"></div>
                </div>
                

                    </div>
                    <p className='mt-3'>
                  Don't have Account? <Link to="/register"><u>Sign up here</u></Link>
                </p>
                </div>
                <div className="mt-3 text-center">
                   
                </div>
                </form>
                  
            </div>
            
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}

export default Login
