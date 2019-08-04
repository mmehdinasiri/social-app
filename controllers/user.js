const _ = require("lodash")
const User = require("../models/users");

exports.userById = (req, res, next, id ) => {
  User.findById(id).exec((err, user) =>{
    if(err || !user){
      return res.status(400).json({
        error : "User not found"
      })
    }
    req.profile = user;
    next();
  })
}

exports.hasAuthorization = (req, res, next) => {
  const authorized = req.profile && req.auth && req.profile._id === req.auth._id
  if(!authorized){
    return res.status(403).json({
      error: "User is not authorized to perform this action"
    })
  }
}

exports.allUsers = (req, res) => {
  User.find((err,users)=>{
    if(err){
      return res.status(400).json({
        error : err
      })
    }
    res.json({users})
  }).select("name email update created")
}

exports.getUser = (req, res) =>{
  req.profile.hashed_password = undefined;
  req.profile.salt = undefined;
  return res.json(req.profile);
}

exports.updateUser = (req, res) =>{
  const user = req.profile;
  newUser = _.extend(user , req.body);
  newUser.updated = Date.now()
  newUser.save((err)=>{
    if (err){
      return res.status(400).json({
        error : "You are not authorized to perform this action"
      })
    }
    newUser.hashed_password = undefined;
    newUser.salt = undefined;
    res.json({user});
  })
}


exports.deleteUser = (req, res) =>{
  const user = req.profile;
  user.remove((err)=>{
    if (err){
      return res.status(400).json({
        error : err
      })
    }
    res.json({message : "user deleted successfuly"});
  })
}