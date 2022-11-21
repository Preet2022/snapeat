const express = require('express');
const router = express.Router();
const multer =require('multer');
const controller = require('../../Controllers/user/userController');

const {authorization_user} = require('../../Middlewares/auth');

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
       cb(null, 'image');
    },
    filename: function (req, file, cb) {
       cb(null, Date.now() + '-' + file.originalname);
    }
 });
 let upload = multer({ storage: storage });

router.route('/register').post(controller.registerUsers);

router.post('/verify/:id',controller.verifyOtp)

router.patch('/profileupdate/:id',upload.single('imageName'),authorization_user,controller.updateUserProfile);

router.get('/userdetail/:id',authorization_user,controller.getUserDetails);

router.route('/getalluser').get(controller.getAllUser);

router.route('/login').post(controller.logIn);

router.route('/logout').post(controller.logOut);

router.route('/changepassword/:id').put(controller.changePassword);

module.exports = router;
