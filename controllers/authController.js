const usermodel=require("../models/user");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
require("dotenv").config();
// const {generateToken}=require("../utils/generateToken"); 


module.exports.registerUser= async function (req,res){
    try{
        let {email,password,fullname}=req.body;

        let user=await usermodel.findOne({email:email});
          if(user) return res.status(401).send("you already have an account please login.");

        bcrypt.genSalt(10, function (err,salt){
            bcrypt.hash(password,salt,async  function (err,hash){
                if(err) return res.send(err.message);
                else {
             let user= await usermodel.create({
                   email,
                 password:hash,
                  fullname,
               });
            
            // let token =generateToken(user);
              let token= jwt.sign({email:user.email,id:user._id},"aaaaaaaaa");
        
              res.cookie("token",token);
              res.redirect("/index");
                }
            })
        })

     
    }
    catch(err){
        res.send(err.message);
    }
};

module.exports.loginUser=async function(req,res){
    let {email,password}=req.body;

    let user =await usermodel.findOne({email:email});
    if(!user) return res.send("Email or password incorrect");

    bcrypt.compare(password, user.password, function(err,result){
        if(result)
        {
            let token= jwt.sign({email:user.email,id:user._id},"aaaaaaaaa");
            res.cookie("token",token);
            res.redirect("/shop");

        }else{
            return  res.send("Email or password incorrect");
        }
    })
};
module.exports.logout=function(req,res){
    res.cookie("token","");
    res.redirect("/index");
}