const userModel = require('../model/user')
const Auth = require('../common/auth')


const login = async (req, res) => {
    try {
      let user = await userModel.findOne({ email: req.body.email });
      if (user) {
        let hashCompare = await Auth.hashCompare(
          req.body.Password,
          user.Password
        );
        if (hashCompare) {
          let token = await Auth.createToken({
            id:user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            role: user.role,
          });
          let userData = await userModel.findOne({ email: req.body.email },{_id:0,email:0,Password:0,status:0,createAt:0});
          res.status(200).send({
            message: "Login Successfully",
            token,
            userData
          });
        } else {
          res.status(400).send({
            message: "Invalid Password",
          });
        }
      } else {
        res.status(400).send({
          message: `User with ${req.body.email} does not exists`,
        });
      }
    } catch (error) {
      res.status(500).send({
        message: "Internal Server Error",
        error: error.message,
      });
    }
  };



  const createUser = async (req, res) => {
    try {
      let user = await userModel.findOne({ email: req.body.email });
      if (!user) {
        req.body.Password = await Auth.hashPassword(req.body.Password);
        await userModel.create(req.body);
        let token = await Auth.createToken({
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email,
        });
        let userData = await userModel.findOne({email: req.body.email},{_id:0,email:0,Password:0,status:0,createAt:0})
        res.status(201).send({
          message: "User Created Successfully",
          token,
          
        });
      } else {
        res.status(400).send({
          message: `User with ${req.body.email} Already Exists`,
        });
      }
    } catch (error) {
        console.log(error)
      res.status(500).send({
        message: "Fill all the form",
        error: error.message,
      });
    }
  };
  

module.exports = {
   
    createUser,
    login
   
}