const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({

    
    userName: {
        type: String
    },
    contactNo: {
        type: Number
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    instaName: {
        type: Boolean
    },
    foodBlogger: {
        type: Boolean
    },
    imageName: {
        type: String
    },
    loc: {
        type: {
            type: String,
            default: 'Point',
            enum: ['Point'],
        },
        cordinates: [Number],
    },
    role: {
        type: String, default: "user"
    },
    mobileOtp:{
        type:Number, default:"1234"
    },

    status: {
        type: Boolean, default: true
    },

    dietaryAndOthers: [{
        type: String
    }],

    favIngredient: [{
        type: String
    }],

    dislikeIngredient: [{
        type: String
    }],
    // houseAddress: {
    //     type: String
    // },
    // streetAddress: {
    //     type: String
    // },
    // postCode: {
    //     type: String
    // },
    // mobile_no: {
    //     type: Number
    // },

    addressBook: [
        {
            address: {
                type: String
            },
            flatAddress: {
                type: String
            },
            postCode: {
                type: String
            },
            mobileNo: {
                type: Number
            },
            instruction: {
                type: String
            }
        }
    ]
})



module.exports = mongoose.model("User", userSchema)