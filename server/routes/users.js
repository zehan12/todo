var express = require("express");
var router = express.Router();
var User = require("../models/User");
var auth = require("../middlewares/auth");
const { request } = require("http");

// Sign Up
router.post("/signup", async (req, res, next) => {
  try {
    var user = await User.create(req.body);
    let token = await user.signToken();
    console.log(token)
    res.json({ user: await user.userJSON(token) });
  } catch (error) {
    next(error);
  }
});

// Sign In
router.post("/signin", async (req, res, next) => {
  var { email, password } = req.body;
  console.log(email,password)
  if (!email || !password) {
    return res.status(400).json({ error: "Email/Password required!" });
  }
  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Email is not registered" });
    }
    let result = await user.verifyPassword(password);
    if (!result) {
      return res.status(400).json({ error: "Password is invalid" });
    }
    let token = await user.signToken();
    res.json({ user: await user.userJSON(token) });
  } catch (error) {
    next(error);
  }
});

router.get("/all", async(req,res) => {
  let users = await User.find()
  console.log(req.user)
  res.status(200).json({users})
}) 

router.put("/reset",async(req,res) => {
  console.log(req.body);
  let user = await User.findOne({email:req.body.email})
  
  let password = await user.createPassword(req.body.password)
  console.log(password)
  let newUser = await User.findOne({email:req.body.email})
  console.log(newUser,user)
  res.json({password})

}) 

// Protecting The Routes

router.use(auth.verifyToken);

// Get Proflie (Authenticated)
router.get("/", async (req, res, next) => {
  
  let id = req.user.userId;
 
  try {
    let user = await User.findById(id)
    console.log(user,"user")
    res.status(200).json({ user });
  } catch (error) {
    next(error);
  }
});

// Update Profile (Authenticated)
router.put("/", async (req, res, next) => {
  let id = req.user.userId;
  try {
    let user = await User.findByIdAndUpdate(id, req.body, { new: true });
    console.log(req.body)
    return res.status(201).json({ user });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
