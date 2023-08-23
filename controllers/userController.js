const userModel = require('../models/userModel')

//login callback
const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email, password });
        if (!user) {
            res.status(400).send('User not found');
        }
        res.status(200).json({
            success: true,
                user,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
                error,
        });
    }
};

//register callback
const registerController = async (req,res) => {
    try {
        // console.log(req.body)
        // const {name, email, password} = req.body;
        // const newUser = new userModel({
        //     name, email, password
        // });
        const newUser = new userModel(req.body)
        // console.log(newUser)
        // res.json(newUser)
        await newUser.save();
        res.json({
            success:true,
            newUser
        });
    } catch (error) {
        console.log(error)
        res.status(400).json({
            success: false,
                error,
        });
    }
};
module.exports = { loginController, registerController };