const jwt=require("jsonwebtoken");
const usermodel=require("../models/user");


module.exports=async function(req,res,next){
    if(!req.cookies.token){
        req.flash("error","you need to login first");
        return res.redirect("/shop");
    }

    try{
        let decoded=jwt.verify(req.cookies.token,"aaaaaaaaa");
        let user =await usermodel.findOne({email:decoded.email})
        
        .select("-password");
        req.user=user;
        next();
    }catch(err){
        console.log("something went wrong");
          res.redirect("/");
    }
}