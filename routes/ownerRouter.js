const express = require("express");
const router = express.Router();
const ownermodel = require("../models/owner-model");
const dotenv = require('dotenv').config();

if (process.env.NODE_ENV === "development") { // in production environment this route will not get executed
    router.post("/create", async function (req, res) {
        let owner = await ownermodel.find();
        if (owner.length > 0) {
            return res.status(503).send("you don't have permission to create a new owner.");
        }
        let { fullname, email, password } = req.body;
        let createdowner = await ownermodel.create({
            fullname,
            email,
            password,
        });
        res.status(201).send(createdowner);
    });
}

router.get("/", function (req, res) {
    res.send("hey its working");
});

router.get("/admin",function (req,res){
    let success=req.flash("success");
    res.render("createproducts",{success});
})

module.exports = router;

// set NODE_ENV=development
