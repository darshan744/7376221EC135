import express from "express";
import axios from "axios";
import dotenv from 'dotenv'
dotenv.config();
const API_URL = process.env.API_URL
const port = process.env.PORT;
const ACCESS_TOKEN = process.env.ACCESS_TOKEN
const tokenStrig = `Bearer ${ACCESS_TOKEN}`
const app = express();
app.use(express.json())
app.use((req , res , next)=>{
    console.log(`${req.method} - TO - ${req.url}`)
    next();
})

app.get('/users' , async (req , res)=>{
    console.log(`Bearer ${ACCESS_TOKEN}`);
    const token = await getToken()
    try {
        const url = `${API_URL}/users`;
        console.log(url);
        const response = await axios.get(url , {
            headers:{
                Authorization:token,   
            }
        });
        console.log(response.status);
        res.json(response.data);
    } catch (error) {
        console.log(error);
        res.json(error.message);
    }
})

app.get('/users/:id/posts' , async (req , res)=> {
    const id = req.params.id;
    const token = await getToken()
    const url = `${API_URL}/users/${id}/posts`;
    try {
        const response = await axios.get(url , {
            headers:{
                Authorization : token
            }
        })
        res.json(response.data);
    } catch (error) {
        console.log(error.message);
        res.status(500).send('errror in server');
    }
    
})

app.get("/posts/:id/comments" , async (req , res)=>{
    try{
        const id = req.params.id;
        const url = `${API_URL}/posts/${id}/comments`;
        const token = await getToken()

        const response = await axios.get(url , {headers:{
            Authorization:token
        }})
        res.json(response.data)
    }
    catch(error){
        console.log(error.message);
        res.status(500).send('error in server')
    }
})

app.get('/check' , (req , res)=>res.send('hi'))
app.listen(port , ()=>console.log(`Listening in ${port}`));

async function getToken() {
    const object = {
            companyName: process.env.companyNmae,
            clientID: process.env.clientID,
            clientSecret: process.env.clientSecret,
            ownerName:process.env.ownerName,
            ownerEmail:process.env.ownerEmail,
            rollNo:process.env.rollNo
        }
        const authURL = process.env.AUTH_URL;
        const response = await axios.post("http://20.244.56.144/test/auth" , object)
        return response.data.access_token;
}