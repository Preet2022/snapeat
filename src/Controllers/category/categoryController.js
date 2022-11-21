const mongoose = require('mongoose');
const Category = require("../../Models/category/categoryModels");

exports.addCategory = async(req,res,next) => {

    Category.init()

    const category = new Category({

     category_name: req.body.category_name

    });
    const check = await Category.findOne({ category_name:req.body.category_name });
    if (check) {
        res.status(400).json({
            status: false,
            message: 'category already exist',
          });
    } else {
        await category.save();
        res.status(200).json({
          status: true,
          message: 'Successfully Signed up',
          results: Category,
        }); 
    }

    // res.status(400).json({
    //   status: false,
    //   message: 'category already exist with this restaurant',
    // });
}