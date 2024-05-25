import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';

const LoginPage = () => {

    const[loginData,setLoginData] = useState({
        username:'',
        password:''
    })

    const handleLoginChange = (e)=>{
      const {name,value} = e.target;
      setLoginData((prevData)=>({
        ...prevData,
        [name]: value 
      }))
    }

    const handleLoginSubmit = async(e)=>{
        e.preventDefault();
        try{ 
            const response = await axios.post('http://localhost:8000/login', loginData);
            const{success,message} = response.data;
        
            if(success){
                console.log(message);
            }
            else{
                console.log(message);
            }
        }
        catch(error){
            console.error('Login Error',error); 
        }

        setLoginData({
            username:'',
            password:''
        })
    }

    return (
    <div>
      <h1>Login Page</h1>
      <form onSubmit={handleLoginSubmit}>
        
        <input
        type='text'
        name='username'
        placeholder='Username'
        value={loginData.username}
        onChange={handleLoginChange}
        required
        />

        <input
        type='password' 
        name='password'
        placeholder='Password'
        value={loginData.password}
        onChange={handleLoginChange}
        required
        />

        <button type='submit'>Log in</button>

        <p>Not Registerred Yet? <Link to = '/registration'>Register Now</Link> </p>

      </form>
    </div>
  )
}

export default LoginPage
