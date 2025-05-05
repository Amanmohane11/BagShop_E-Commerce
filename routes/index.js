const express = require("express");
const router = express.Router();
const productmodel=require("../models/product");
const usermodel=require("../models/user")


const isLoggedin=require("../middlewares/isLoggedin");




router.get('/shop',isLoggedin,async function (req, res)  {
  
  let product = await productmodel.find();
  let success=req.flash("success");
  res.render("shop", { product,success});
});
router.get('/cart', isLoggedin, async function (req, res) {
  try {
      let user = await usermodel
          .findOne({ email: req.user.email })
          .populate("cart");

          

      // if (!user) {
      //     req.flash("error", "User not found");
      //     return res.redirect("/shop");
      // }

      // if (!user.cart || user.cart.length === 0) {
      //     req.flash("error", "Your cart is empty");
      //     return res.render("shop", { user, bill: 0 });
      // }
      const bill=(Number(user.cart[0].price)+ 20)-Number(user.cart[0].discount)
      res.render("cart", { user, bill });
    } catch (err) {
        req.flash("error", "Something went wrong");
        res.redirect("/shop");
    }
});

router.get("/addtocart/:productid", isLoggedin, async function (req, res) {
  try {
      let user = await usermodel.findOne({ email: req.user.email });

      if (!user) {
          req.flash("error", "User not found");
          return res.redirect("/shop");
      }

      user.cart.push(req.params.productid);
      await user.save();
      req.flash("success", "Added to cart");
      res.redirect("/shop");
  } catch (err) {
      req.flash("error", "Something went wrong");
      res.redirect("/shop");
  }
});


router.get("/", function (req, res) {
  let error=req.flash("error");// Initialize an empty error array or any other default value
  res.render("index", { error,loggedin:false });

});
router.get("/logout", isLoggedin, async function (req, res) {
  try {
    let user = await usermodel.findOne({ email: req.user.email });
    if (user) {
      res.redirect("/");
    } else {
      res.send("User not found.");
    }
  } catch (err) {
    res.send(err.message);
  }



});




module.exports = router;
