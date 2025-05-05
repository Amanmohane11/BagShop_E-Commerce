const express=require("express");
const router=express.Router();
const {registerUser,loginUser,logout}=require("../controllers/authController.js");
 

router.get("/", function(req,res){
    res.send("hey its working");
});

router.post("/register",registerUser);

router.post("/login",loginUser);

router.get("/logout",loginUser);



module.exports=router;

// npm i jsonwebtoken bcrypt cookie-parser