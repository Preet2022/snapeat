const mongoose = require('mongoose');
const Merchant = require("../../Models/merchant/merchantModels");
// const catchAsyncError= require("../../Middlewares/catchAsyncError");
 const auth = require("../../Middlewares/auth");
 const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken")
//const otpGenerator =require('otp-generator')
//const crypto = require('crypto');



exports.merchantSignUp = async(req,res,next)=>{
    //const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const singupRecords = new Merchant({
       
        contactNo: req.body.contactNo,
        //password: hashedPassword,
        otp:req.body.otp,
        status: true,
        is_registered: true,
        type: 'merchant',
    
      });
    
      //sendToken(User,res.status(200));
    
      //const check = await Merchant.findOne({ $or: [{ contact_no: req.body.contact_no }, { email: req.body.email }] });
      
      const check = await Merchant.findOne( { contact_no: req.body.contact_no }  );
      if (check !== null) {
        res.status(400).json({
          status: false,
          message: 'Already exist',
    
        });
      } else {
        await singupRecords.save();
        //console.log(singupRecords,"hello");
        res.status(200).json({
          status: true,
          message: 'Successfully Signed up',
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


//update user profile
exports.updateMerchantProfile =async (req, res) => {
  const id = req.user.id;

  const hashedPassword = await bcrypt.hash(req.body.password, 10);

  const updateUserDetails = await User.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      email: req.body.email,
      contactNo: req.body.contactNo,
      password: hashedPassword,
      
    },

    { new: true }

  );


  res.status(200).json({
    status: true,
    message: 'Successfully userdetails details',
    results: updateUserDetails,
  });

  //res.status(400).json("profile not updated");

}

//logIn user
exports.merchantLogin = async (req, res) => {
    try {
      const check = await Merchant.findOne({ email: req.body.email });
  
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


//changepassword
exports.merchantChangePassword = async (req, res) => {
    const id = mongoose.Types.ObjectId(req.params.id)
    //console.log(req.params.id)
    if (req.body.current_Password) {
      try {
        const databasePassword = await Merchant.findOne({ _id: id });
  
        // const hashedPassword = await bcrypt.hash(req.body.new_Password, 10)
        const validPassword = bcrypt.compare(req.body.current_Password, databasePassword.password);
        //console.log(validPassword, "validPassword")
        if (validPassword) {
          const hashedPassword = await bcrypt.hash(req.body.new_Password, 10);
          const results = await Merchant.findByIdAndUpdate({ _id: id }, { password: hashedPassword });
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
        const results = await Merchant.findByIdAndUpdate({ _id: id }, { password: hashedPassword });
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


  //all  details
exports.getAllDetails = async (req, res, next) => {

  const merchant = await Merchant.find();

  res.status(200).json({
    status: true,
    success: true,
    result: merchant
  })
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