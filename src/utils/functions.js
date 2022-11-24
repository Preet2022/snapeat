const mongoose = require("mongoose");
const User = require("../Models/user/userModel");

//find query function
exports.findData = async (contactNo, status) => {
  let obj = await User.find({ contactNo: contactNo, status: status });
  //console.log("hello", obj);
  return obj;
};

//fineOne query function
exports.findOneData = async (email, id, mobileOtp) => {
  let obj = await User.findOne({ email: email, _id: id, mobileOtp: mobileOtp });
  //console.log(obj, "jjjjjjjj");
  return obj;
};

// exports.findByIdUpdateData = async (
//   id,
//   name,
//   email,
//   contactNo,
//   password,
//   instaName,
//   foodBlogger,
//   imageName,
//   addressBook,
//   address,
//   flatAddress,
//   postCode,
//   mobileNo,
//   instruction,
//   prefrences
// ) => {
//   const updateUserDetails = await User.findByIdAndUpdate(
//     {_id:id},
//     {
//       name:name,
//       email:email,
//       contactNo:contactNo,
//       password:password,
//       instaName:instaName,
//       foodBlogger:foodBlogger,
//       imageName:imageName,
//       addressBook: { address, flatAddress, postCode, mobileNo, instruction },
//       prefrences:prefrences,
//     },

//     { new: true }
//   );
//   //console.log("update-----",email)
//   return updateUserDetails
// };


// exports.findByIdAndUpdateData =async(_id,hashedPassword)=>{

//     const results = await User.findByIdAndUpdate(
//         { _id: id ,password: hashedPassword }
//       );
//         console.log("iiiiiiiiii=======",results);
//         return results
// }


// exports.findondata = async(email,id) =>{
//     let obj = await User.find({
//        if((email==email || _id == id))
//     })
//     return obj
// }