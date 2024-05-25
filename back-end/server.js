const express = require('express');
const app= express();
const port = 8000;
const connectDB = require('./db/dbConnection');
const User = require('./db/user');
const cors = require('cors');

//middleware for parsing JSON
app.use(express.json());

//enable cors
app.use(cors());

//registeration
app.post('/registration',async(req,res)=>{
    try{
        const{username,password} = req.body;
        // console.log(req.body)
        const user = new User({username,password});
        await user.save();
        res.status(201).json({message:'registration successful'})
    }
    catch(error){
        res.status(500).json({error:'registration failed'})
    }
})

///login
app.post('/login',async(req,res)=>{
    try{
        const {username,password} = req.body;
        const user = await User.findOne({username});
        console.log(user);

        if(!user){
            return res.status(401).json({error:'Invalid Username or Password'});
        }

        if(user.password !== password){
            return res.status(401).json({error:'Invalid Username or Password'});
        }

        res.status(200).json({message:'Login Successfull'})
    }
    catch(error){
        res.status(500).json({error:'Login Failed'})
    }

})

app.listen(port,()=>{
    console.log('server is listening on port 8000')
    connectDB();
})
