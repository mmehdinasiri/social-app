const jwt = require("jsonwebtoken");
require('dotenv').config()
const User = require("../models/users");

exports.signup = async(req,res)=>{
  const userExist = await User.findOne({email: req.body.email})
  if(userExist) return res.status(403).json({
    error: "email is taked"
  })
  const user = await new User(req.body)
  await user.save()
  res.status(200).json({
    message: "signeup success! please login",
    body: user
  })
}

exports.signin = (req, res) => {
   //find the user based on email
  const {_id, name, email, password} = req.body
  User.findOne({email}, (err, user) =>{
    //if error or no user
    if(err || !user) {
      return res.status(401).json({
        error: "User with that email does not exist. Please signin."
      })
    }
    //if user is found sure the email and password mathc 
    //create authentication method in model and user here
    if(!user.authenticate(password)) {
      return res.status(401).json({
        error: "Email and password do not match"
      })
    }
    //generate a tiken with user id and secret
    const token = jwt.sign({_id: user._id} , process.env.JWT_SECRET)
    //persist the token as 't' in cookie with expiry date
    res.cookie("t", token, {expire: new Date() + 999});
    //return response with user and token to front end client
    const {_id, name, email} = user;
    return res.json({token, user: { _id, email, name}});
  })
}

exports.signout = (req, res) => {
  res.clearCookie("t");
  return res.json({message : "Signout success!"})
}