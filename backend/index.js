const express = require("express");
const app = express();

app.use(express.json());

app.get("/",async(req,res)=>{
    try{
        return res.status(200).json({status:"success",message:"server testing"})
    }catch(error){
        return res.status(500).json({status:"failure",message:"server error"})
    }
})

app.listen(3000,()=>{
    console.log("running on port 3000!");
})