const jwt=require("jsonwebtoken");
const generateToken=(user)=>{
    return jwt.sign({email:user.email,id:user._id},process.env.JWT_KEY);
};
module.exports.generateToken = generateToken;

// const Jwt = require('jsonwebtoken');

// const generateToken = (user) => {
//     return Jwt.sign({email:user.email,id:user._id}, process.env.JWT_SECRET, { expiresIn: '30d' });
// };

// module.exports = generateToken;
