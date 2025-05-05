const express=require("express");
const app=express();
const cookieParser=require("cookie-parser");
const path=require("path");
const expressSession=require("express-session");
const flash=require("connect-flash");


const indexRouter=require("./routes/index")
const ownerRouter=require("./routes/ownerRouter")
const productRouter=require("./routes/productRouter")
const userRouter=require("./routes/userRouter")

const db=require("./config/mongoose-connection");
require("dotenv").config();

app.use(expressSession({
    resave:false,
    saveUninitialized:false,
    secret: "aaaaaaaaa",
})
);
app.use(flash());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname,"public")));
app.set("view engine","ejs");

app.use("/",indexRouter)
app.use("/owner",ownerRouter);
app.use("/user",userRouter);
app.use("/product",productRouter);

app.listen(3000);