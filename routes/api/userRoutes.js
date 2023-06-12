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

// Targets to `/api/users 
router.route('/').get(getAllUsers).post(createUsers);
// Targets to `/api/users/:userId
router.route('/:userId').get(getSingleUser).put(updateUsers).delete(deleteUser);
// Targets to `/api/users/:userId/friends
router.route('/:userId/friends').post(addFriends);
// Targets to `/api/users/:userId/friends/:friendsId
router.route('/:userId/friends/:friendId').post(addFriend).delete(deleteFriend)

// Module export router
module.exports = router;