import React, { useState } from 'react'
import {Link} from 'react-router-dom';
import axios from 'axios';

const RegistrationPage = () => {

  const[userData,setUserData] = useState({
    username:'',
    password:''
  })

  const handlefieldChange = (e)=>{
    const {name,value} = e.target;
      setUserData((prevData)=>({
        ...prevData,
        [name]: value 
      }))
  
  }

  const handleregistrationSubmit = async(e)=>{
    e.preventDefault();
    try{ 
        const response = await axios.post('http://localhost:8000/registration', userData);
        const{success,message} = response.data;
    
        if(success){
            console.log(message);
            console.log(success);
        }
        else{
            console.log(message);
        }
    }
    catch(error){
        console.error('Registration Error',error); 
    }

    setUserData({
      username:'',
      password:''
    })
  }

  return (
    <div>
      <h1>Registraton Page</h1>

      <form onSubmit={handleregistrationSubmit}>
        
        <input
        type='text'
        name='username'
        placeholder='Username'
        value={userData.username}
        onChange={handlefieldChange}
        required
        />

        <input
        type='password' 
        name='password'
        placeholder='Password'
        value={userData.password}
        onChange={handlefieldChange}
        required
        />

        <button type='submit'>Register</button>

        <p>Already Registered ? <Link to = '/login'>Login Here</Link> </p>

      </form>

    </div>
  )
}

export default RegistrationPage
