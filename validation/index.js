exports.createPostValidator = (req, res, next) => {
  // title
  req.check('title', 'Write a titiel').notEmpty();
  req.check('title', 'Title must be between 4 to 150 characters').isLength({
    min: 4,
    max: 150
  });
   // body
  req.check('body', 'Write a body').notEmpty();
  req.check('body', 'Title must be between 4 to 150 characters').isLength({
    min: 4,
    max: 2000
  });
  // check for errors
  const errors = req.validationErrors();
  if(errors){
    const firstError = errors.map((error) => error.msg)[0];
    return res.status(400).json({error: firstError})
  }
  // proceed to next middleware
  next();
}


exports.userSignupValidation = (req, res, next) =>{
  //name
  req.check("name", "name is required").notEmpty();
  //mail
  req.check("email" , "email must be between 3 to 32 characters")
    .matches(/.+\@.+\..+/)
    .withMessage("email must cintain @")
    .isLength({
      win: 4,
      max: 2000
    })
    //pass
  req.check("password", "Password is required").notEmpty()
  req.check("password")
    .isLength({min:6})
    .withMessage("Password must be at least 6 charackters")
    .matches(/\d/)
    .withMessage("Passwoed must be contain a number")
  // check for errors
  const errors = req.validationErrors();
  if(errors){
    const firstError = errors.map((error) => error.msg)[0];
    return res.status(400).json({error: firstError})
  }
  // proceed to next middleware
  next();
}