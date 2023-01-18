const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const User = require("../models/usermodel");

//@desc  Authenticate a user
//@route  Post  /api/users/ login
//@access  Poblic
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if ((!name || !email || !password)) {
    res.status(400);
    throw new Error(" please add a fields");
  }

  // CHECK IF THE USER EXIST
  const userExist = await User.findOne({ email });

  if (userExist) {
    res.status(400);
    throw new Error("user already exists");
  }

  // HASH PASSWORD
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)

  // creat a user 
  const user = await User.create({
    name,
    email, 
    password: hashedPassword,
  })

  if(user){
    res.status(201).json({
        _id: user.id,
    name: user.name,
    email: user.email,
    token: generateToken(user._id),
    })
  }else{
    res.status(400)
    throw new Error ('invalid user data')
  }
});

//@desc  Authenticate a user
//@route  Post  /api/users/ login
//@access  Poblic
const logInUser = asyncHandler(async (req, res) => {
  const {email, password} = req.body

const user = await User.findOne({email})
if(user && (await bcrypt.compare(password, user.password))){
  res.json({
    _id: user.id,
    name: user.name,
    email: user.email,
    token: generateToken(user._id),
  })
}else{
  res.status(400)
  throw new Error("invalid credentails")
}
});

//@desc  get user data
//@route  Get  /api/users/me
//@access  Poblic
const getMe = asyncHandler(async (req, res) => {
  res.json({ message: "User data display" });
});


// Generate jwt
const generateToken = (id)=>{
  return jwt.sign({id}, process.env.JWT_SECRET,{
    expiresIn: "30d",
  }) 
}

module.exports = {
  registerUser,
  logInUser,
  getMe,
};
