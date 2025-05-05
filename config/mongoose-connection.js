const mongoose=require('mongoose');
const config=require("config");

const dbgr=require("debug")("developments:mongoose");


mongoose.connect(`${config.get("MONGODB_URI")}/scatch`)

.then(function(){
    dbgr("conneted");
})
.catch(function(err){
   dbgr(err);
});

module.exports=mongoose.connection;


// terminal
// set DEBUG=development:*

// npm i config