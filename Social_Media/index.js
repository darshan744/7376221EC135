import express from "express";

import dotenv from 'dotenv'
dotenv.config();

const port = process.env.PORT;

const app = express();

app.get('/check' , (req , res)=>res.send('hi'))
app.listen(port , ()=>console.log(`Listening in ${port}`));