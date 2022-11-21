const mongoose = require('mongoose');
const User = require("../../Models/user/userModel");
//const catchAsync = require("../../Middlewares/catchAsyncError");
const auth = require("../../Middlewares/auth");
//const sendToken = require("../../utils/jwtToken")
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken")


//signup user
exports.registerUsers = async (req, res, next) => {

  const singupRecords = new User({
    
    contactNo: req.body.contactNo,
    mobileOtp:req.body.mobileOtp,
    status: true,
    is_registered: true,
    type: 'user',

  });
  const check = await User.findOne({ contactNo: req.body.contactNo });
  if (check !== null) {
    res.status(400).json({
      status: false,
      message: 'contactNo already exist',
  });
  }else{
  await singupRecords.save();
  //console.log(singupRecords,"hello");
  res.status(200).json({
    status: true,
    message: 'success ',
    results: singupRecords,
  });
  }

}


exports.verifyOtp = async(req, res) => {
  let mobileOtp = req.body.mobileOtp;
  User.findOne({ _id: req.params.id, mobileOtp: mobileOtp}, (err, rows) => {
    if (rows == null) {
      return res.status(200).json({
        status: false,
        message: 'Enter a valid OTP',
      });
    } else {
      let myquery = { _id: req.params.id };
      //console.log(myquery)
      let newdatas = { $set: { profileVerification: true } };
      User.findOneAndUpdate(myquery, newdatas, { new: true }, (err, newData) => {
        if (err) throw err;
        return res.status(200).json({
          status: true,
          message: 'OTP verified successfully',
          // token: token,
          userData: rows,
        });
      });
    }
  });
},

//logIn user
exports.logIn = async (req, res) => {
  try {
    const check = await User.findOne({ email: req.body.email });

    if (check === null) {
      res.status(400).json({
        status: false,
        message: 'Email is wrong',
      });
    } else {
      const validPassword = bcrypt.compare(req.body.password, check.password);
      if (validPassword) {
        const payload = {
          email: req.body.email,
          id: check.id,
        };

        let envsecret = auth.getSecretToken();
        let token = jwt.sign(payload, envsecret);


        //console.log("token---",token)
        //   res.cookie('access_token', token, {
        //     httpOnly: true,
        //   }
        //  );


        res.status(200).json({
          status: true,
          message: 'Successfully Signed in',
          //user_type: check.user_type,
          token: token,
          result: check,
        });
      } else {
        res.status(400).json({
          status: false,
          message: 'password is wrong',
        });
      }
    }
  }
  catch (err) {
    res.status(400).json(err.message);
  }
};


//all user details
exports.getAllUser = async (req, res, next) => {

  const users = await User.find();

  res.status(200).json({
    status: true,
    success: true,
    result: users
  })
}


//user details
exports.getUserDetails = async (req, res, next) => {
  const id = req.user.id;
  //console.log(id,"hello");
  //console.log(req.body,"test");
  const user = await User.findById(req.user.id);
  //console.log("id--",req.user)
  res.status(200).json({
    'statusCode': '200',
    status: true,
    success: true,
    result: user
  })
};

//update user profile
exports.updateUserProfile = async (req, res) => {
  const id = req.user.id;
  //console.log(req.file.originalname);

  // let prefrences =[]
  // let splitlevel = ({dietaryAndOthers,favIngredient,dislikeIngredient}).split(',');

  // //let splitlevel = pre_object.split(',')
  // prefrences.push(splitlevel);

  // console.log(splitlevel,".....dietary")
  const prefrences = [];
  let dietary = req.body.dietaryAndOthers;
  console.log(dietary, ".....dietary")
  let dietary_id = dietary.split(',')
  prefrences.push(dietary_id);

  let ingrediant = req.body.favIngredient;
  let ingrediant_id = ingrediant.split(',')
  prefrences.push(ingrediant_id);

  let dislikeIngredient = req.body.dislikeIngredient;
  let dislikeIngredient_id = dislikeIngredient.split(',')
  //const splitlevel=split(dietary,ingrediant,dislikeIngredient,',')
  prefrences.push(dislikeIngredient_id);
  //console.log(splitlevel)

  console.log(prefrences);
  //prefrences.save();

  
  let address = req.body.address
  let flatAddress = req.body.flatAddress
  let postCode = req.body.postCode
  let  mobileNo = req.body.mobileNo
  let instruction = req.body.instruction
  const hashedPassword = await bcrypt.hash(req.body.password, 10);

  const updateUserDetails = await User.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      email: req.body.email,
      contact_no: req.body.contact_no,
      password: hashedPassword,
      instaName: req.body.instaName,
      foodBlogger: req.body.foodBlogger,
      imageName: req.file.originalname,
      // house_address: req.body.house_address,
      // street_address: req.body.street_address,
      // postCode: req.body.postCode,
      // mobile_no: req.body.mobile_no,
      address_book: { address, flatAddress, postCode, mobileNo, instruction },
      // address:req.body.address
      prefrences
    },

    { new: true }

  );


  res.status(200).json({
    status: true,
    message: 'Successfully userdetails details',
    results: updateUserDetails,
  });

  //res.status(400).json("profile not updated");

};


exports.changePassword = async (req, res) => {
  const id = mongoose.Types.ObjectId(req.params.id)
  console.log(req.params.id)
  if (req.body.current_Password) {
    try {
      const databasePassword = await User.findOne({ _id: id });

      // const hashedPassword = await bcrypt.hash(req.body.new_Password, 10)
      const validPassword = bcrypt.compare(req.body.current_Password, databasePassword.password);
      console.log(validPassword, "validPassword")
      if (validPassword) {
        const hashedPassword = await bcrypt.hash(req.body.new_Password, 10);
        const results = await User.findByIdAndUpdate({ _id: id }, { password: hashedPassword });
        res.status(200).json({
          status: true,
          message: 'Successfully Updated Password',
          results: results,
        });
      } else {
        res.status(400).json({
          status: false,
          message: 'Entered Current Password is wrong',
        });
      }
    } catch (error) {
      res.status(400).json({
        status: false,
        message: 'Password update failed',
        error: error,
      });
    }

  } else {
    if (req.body.new_Password == req.body.confirm_password) {
      const hashedPassword = await bcrypt.hash(req.body.new_Password, 10);
      const results = await User.findByIdAndUpdate({ _id: id }, { password: hashedPassword });
      if (results) {
        res.status(200).json({
          status: true,
          message: 'Successfully revived Password',
          results: results,
        });
      }
      else {
        res.status(400).json({
          status: false,
          message: 'Something went  wrong',
        });
      }
    } else {
      res.status(400).json({
        status: false,
        message: 'Password does not match',
      });
    }
  }
};


//Logout user
exports.logOut = async (req, res, next) => {
  res.clearCookie("token", null, {
    //expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    status: true,
    success: true,
    message: "logged out",
  });
};



