//dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const usersModel = require("../Models/user/userModel");


exports.generateAccessToken = (userPayload) => {
    return jwt.sign(userPayload, process.env.TOKEN_SECRET);
  }


exports.authorization_user = (req, res, next) => {
    // const token = req.cookies.access_token;
    const token = req.header('Authorization');
    // console.log("token",token)
    // const token =
    // req.body.token || req.query.token || req.headers["x-access-token"];

    if (!token) {
        res.status(200).json({
            status: 401,
            message: "Please Login"
        });
        return;
    }
    else {
        try {
            const verified = jwt.verify(token, process.env.JWT_SECRET);
            req.user = verified;
            usersModel.find({ _id: req.user.id }, (err, rows) => {
              
                if (rows.length > 0) {
                    
                        //console.log(rows)
                        if (rows[0].status == true) {
                            req.user.email = rows[0].email;
                            next();
                        }
                        else {
                            res.status(401).json({
                                status: 401,
                                message: "You Are Blocked! Kindly contact your admin"
                            });
                            return;
                        }
                 
                }
                else {
                    res.status(401).json({
                        status: 401,
                        message: "Invalid Token"
                    });
                    return;
                }
            });
        }
        catch (err) {
            res.status(401).json({
                status: 401,
                message: "Invalid Token"
            });
            return;
        }
    }
}


 exports.authorization_merchant = (req, res, next) => {
  // const token = req.cookies.access_token
  const token = req.header('Authorization');


  if (!token) {
      res.status(200).json({
          status: 401,
          message: "Please Login"
      });
      return;
  }
  else {
      try {
          const verified = jwt.verify(token, 'AcdHz3LjemqvI872qrBpLY4B6SU3h56MexbzQpfWl1I1UgLzghtypLkUkl');
          req.user = verified;
          registerusersModel_user.find({ _id: req.user.id }, (err, rows) => {
            
              if (rows.length > 0) {
                  
                      // console.log(rows)
                      if (rows[0].status == true) {
                          req.user.email = rows[0].email;
                          next();
                      }
                      else {
                          res.status(401).json({
                              status: 401,
                              message: "You Are Blocked! Kindly contact your admin "
                          });
                          return;
                      }
               
              }
              else {
                  res.status(401).json({
                      status: 401,
                      message: "Invalid Token"
                  });
                  return;
              }
          });
      }
      catch (err) {
          res.status(401).json({
              status: 401,
              message: "Invalid Token"
          });
          return;
      }
  }
}
//console.log("JWT_SECRET",process.env.JWT_SECRET)

exports.getSecretToken = () => {

    return process.env.JWT_SECRET;
    
}
