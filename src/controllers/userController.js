const {User} = require('../models');
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');
const fs = require('fs');

const getAllUsers = asyncHandler(async (req, res, next) => {

    const users = await User.findAll();

    res.status(200).json({
        success: true,
        message: "Users fetched successfully",
        users
    });
});

const getUserById = asyncHandler( async (req, res, next) => {

    const user = await User.findByPk(req.params.id);

    res.status(200).json({
        success: true,
        message: "User fetched successfully",
        user
    });

});

const updateUser = asyncHandler( async (req, res, next) => {

    const user = await User.findByPk(req.params.id);

    if(!user){
        return res.status(404).json({
            success: false,
            message: "User not found"
        });
    }

    if(req.body.password){
        let hashed = await bcrypt.hash(req.body.password, 10);
        req.body.password = hashed;
    }

    if(req.file){
        fs.existsSync(user.avatar) && fs.unlinkSync(user.avatar);
        req.body.avatar = req.file.path;
    }

    await user.update(req.body);

    res.status(200).json({
        success: true,
        message: "User updated successfully",
        user,
    });

});

const deleteUser = asyncHandler(async (req, res, next) => {

    const user = await User.findByPk(req.params.id);

    if(!user){
        return res.status(404).json({
            success: false,
            message: "User not found"
        });
    }

    fs.existsSync(user.avatar) && fs.unlinkSync(user.avatar);
    await user.destroy();

    res.status(200).json({
        success: true,
        message: "User deleted successfully",
    });

});



module.exports = {
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
}