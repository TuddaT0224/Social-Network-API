// Require express router
const router = require('express').Router();

// Set the requirements for the user routes
const {
    getAllUsers,
    getSingleuser,
    createUsers,
    updateUsers,
    deleteUsers,
    addFriend,
    deleteFriend
} = require('../../controllers/userController');

