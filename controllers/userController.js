// Require Users Model
const { Users, Thoughts } = require('../models');

// Set up Users Controller
module.exports = {
    // Create a New User
    createUsers({body}, res){
        Users.create(body)
        .then(dbUsersData => res.json(dbUsersData))
        .catch(err => res.status(400).json(err));
    },
    //Get All Users
    getAllUsers(req, res) {
        Users.find({})
        //populate users thoughts
        .populate({path: 'thoughts', select: '-__v'})
        // populate user friends
        .populate({path: 'friends', select: '-__v'})
        .select('-__v')
        // sort Id
        .then(dbUsersData => res.json(dbUsersData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
    },
    // Get single user by Id
    getUsersById({params}, res) {
        Users.findOne({ _id: params.id })
        .populate({path: 'thoughts', select: '-__v'})
        .populate({path: 'friends', select: '-__v'})
        .select('-__v')
        // return if no user is found
        .then(dbUsersData => {
            if(!dbUsersData) {
                res.status(404).json({message: 'No User found to match this Id!'});
                return;
            }
            res.json(dbUsersData)
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err)
        })
    },
    // Update a current User by Id
}


