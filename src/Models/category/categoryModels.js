const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({

    _id:{
        type: mongoose.Schema.Types.ObjectId
    },
    category_name:{
        type:String
    },
    status:{
        type:Boolean
    }

})


// const subCategorySchema = new mongoose.Schema({
//     name:{
//         type:String
//     },
   
//     category:{
//         type:mongoose.Types.ObjectId,
//         ref:"Category"
//     }
// })

module.exports = mongoose.model("Category",categorySchema);
//module.exports = mongoose.model("subCategory",subCategorySchema);