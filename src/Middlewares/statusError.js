const Errorhandler = require('../utils/errorhandler')


module.exports = (err,req,res,next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "internal server errror";
}