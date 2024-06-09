import React, { useState } from 'react'
import './login.css'
import chatlogo from '../image/chat-app-logo.avif'
import { Backdrop, Button,CircularProgress,Link} from '@mui/material'
import {useNavigate} from "react-router-dom"
import Toaster from './Toaster'
import axios from "axios"


export default function Login() {
  const [showlogin,setShowlogin] = useState(false);
  const [data,setData] = useState({ name:"",email:"",password:""});
  const [loading,setLoading] = useState(false);

  const [logInStatus,setLogInStatus] = React.useState("");
  const [signInStatus,setSignInStatus] = React.useState("");

  const navigate = useNavigate();

  const changeHandler = (e)=>{
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const { name, email, password } = data;

  const loginHandler = async(e)=>{
    setLoading(true);
    console.log(data);
    try{
      const header = {
        headers:{
          "Content-type": "application/json",
        },
      };

      const response = await axios.post(
        "http://localhost:8000/user/login/",
        data,
        header
      );
      console.log("login: ", response);
      setLoading(false);
      setLogInStatus({msg:"Success",key:Math.random()});
      localStorage.setItem("userdata", JSON.stringify(response));
      navigate("/chat-app/home");
    }
    catch(err){
      setLogInStatus({
        msg:"invalid username or password",key:Math.random(),
      });
    }
    setLoading(false);
  };

  const signupHandler = async()=>{
    // console.log(data);
    setLoading(true);
    if (!name || !email || !password) {
      setLoading(false);
      setSignInStatus({
        msg: "fill all details correctly", key: Math.random()
      });
    } else {
      try {
        const header = {
          headers: {
            "Content-type": "application/json",
          },
        };

        const response = await axios.post(
          "http://localhost:8000/user/signup/",
          data,
          header
        );
        console.log(response);
        setLoading(false);
        setSignInStatus({ msg: "Success", key: Math.random() });
        navigate("/chat-app/home");
        localStorage.setItem("userdata", JSON.stringify(response));
      }
      catch (err) {
        console.log(err);
        if (err.response.status === 405) {
          setSignInStatus({
            msg: "user name already exists, you can login", key: Math.random()
          });
        }
        if (err.response.status === 406) {
          setSignInStatus({
            msg: "user email already exists, you can login", key: Math.random()
          });
        }
        setLoading(false);
      }
    }
  };

  return (
    <>
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
        <CircularProgress color="secondary" />
      </Backdrop>
      <div className='login-container'>
        <div className='login-leftbar'>
          <img src={chatlogo} alt="chatlogo" />
        </div>
          { showlogin && (
          <div className='login-rightbar'>
            <div className='login-inner'>
              <p className='login-head'>LOGIN</p>
              <div className='user-details'>
                  <input type="text" placeholder='Enter name' onChange={changeHandler} name='name' value={name} autoComplete='off'/>
                  <input type="text" placeholder='Enter password' onChange={changeHandler} name='password' value={password} autoComplete='off'/>
                  <Button style={{color:'#0087ff'}} variant='none' onClick={loginHandler}>Login</Button>
                  <p>Does't have account ?</p>
                  <Button variant='none' onClick={()=>{ setShowlogin(false) }}>
                      <Link sx={{ textDecoration: 'none' }} to='/signup'>Signup</Link>
                  </Button>
                  { logInStatus ? (
                  <Toaster key={logInStatus.key} message={logInStatus.msg}/>
                  ) : 
                  null
                }
              </div>
              </div>
            </div>
          )}
          { !showlogin && (
          <div className='login-rightbar'>
            <div className='login-inner'>
              <p className='login-head'>REGISTER</p>
              <div className='user-details'>
                  <input type="text" placeholder='Enter name' onChange={changeHandler} name='name' value={name} autoComplete='off'/>
                  <input type="text" placeholder='Enter email' onChange={changeHandler} name='email' value={email} autoComplete='off'/>
                  <input type="text" placeholder='Enter password' onChange={changeHandler} name='password' value={password} autoComplete='off'/>
                  <Button variant='none' style={{color:'#0087ff'}} onClick={signupHandler}>Signup</Button>
                  <p>Already have account ?</p>
                  <Button variant='none'  onClick={()=>{ setShowlogin(true) }}>
                      <Link sx={{ textDecoration: 'none' }} to='/login'>Login</Link>
                  </Button>
                  { signInStatus ? (
                    <Toaster key={signInStatus.key} message={signInStatus.msg}/>
                    ) : 
                    null
                  }
              </div>
              </div>
            </div>
          )}
      </div>
    </>
  );
}
