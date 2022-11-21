const mongoose = require('mongoose');

const merchantSchema = new mongoose.Schema({

    userName: {
        type: Number
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    contactNo:{
        type: Number
    },
    mobileOtp:{
        type: Number, default:"1234"
    },
    accessPin:{
        type: Number
    }

})
module.exports = mongoose.model("Merchant", merchantSchema)