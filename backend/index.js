import express from "express";
import fs from "fs";
import path from "path";
import sharp from "sharp";
import cors from "cors";


const app=express();
app.use(express.json());
app.use(cors());
const __dirname=path.resolve();

app.post("/post",async(req,res)=>{
    const{name}=req.body;
    
    const inputImagepath=path.join(__dirname,'Certificate.png');
    const outputImagepath=path.join(__dirname,'finaloutput.png')
     
   const textoverlay=Buffer.from(`
      <svg width="1200" height="600" >
      <text x="200" y="320" font-size="40" font-weight="bold" font-family="Arial, sans-serif" fill="black">${name}</text>
      </svg>
    `);


    await sharp(inputImagepath).composite([{input:textoverlay,blend:'over'}])
    .toFile(outputImagepath);
   
    res.sendFile(outputImagepath);
})

app.listen(5000,()=>{
    console.log("server is up and runnin")
})