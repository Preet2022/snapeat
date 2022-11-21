const express = require('express');
const router = express.Router();

const controller = require('../../Controllers/category/categoryController');

//const {authorization_restro,} = require('../../Middlewares/auth');


router.post('/category',controller.addCategory)


module.exports = router;