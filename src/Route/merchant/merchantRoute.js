const express = require('express');
const router = express.Router();

const controller = require('../../Controllers/merchant/merchantController');

//const {authorization_restro,} = require('../../Middlewares/auth');


router.post('/merchantsignup',controller.merchantSignUp);

router.post('/merchantverify',controller.verifyOtp)

router.patch('/merchantupdateprofile',controller.updateMerchantProfile);

router.post('/merchantlogin',controller.merchantLogin);

router.put('/merchantchangepassword/:id',controller.merchantChangePassword);

router.get('getallmerchantlist',controller.getAllDetails);

router.post('/logout',controller.logOut);

module.exports = router;