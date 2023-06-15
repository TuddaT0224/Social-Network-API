// Require Users Model
const { Users } = require('../models');

// Set up Users Controller
const userController = {

    
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
        updateUsers({params, body}, res) {
            Users.findOneAndUpdate({_id: params.id}, body, {runValidators: true, new: true})
            .then(dbUsersData => {
                if(!dbUsersData) {
                    res.status(404).json({ message: 'No User with this Id!'});
                    return;
                }
                res.json(dbUsersData);
            })
            .catch((err) => res.status(500).json(err));
        },
        
        // Delete a User by ID
        deleteUsers({params}, res) {
            Users.findOneAndDelete({_id: params.id})
            .then(dbUsersData => {
                if(!dbUsersData) {
                    res.status(404).json({ message: 'No such User exists'});
                    return;
                }
                res.json(dbUsersData);
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
        },
        // Add a friend
        addFriend({params}, res) {
            Users.findOneAndUpdate({_id: params.id}, {$push: { friends: params.friendId}}, {new: true})
            .populate({path: 'friends', select: ('-__v')})
            .select('-__v')
            .then(dbUsersData => {
                if (!dbUsersData) {
                    res.status(404).json({message: 'No User with this Id!'});
                    return;
                }
                res.json(dbUsersData);
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
        },  
        
        // Delete a current friend
        deleteFriend({ params }, res) {
            Users.findOneAndRemove({_id: params.id}, {$pull: { friends: params.friendId}}, {new: true})
            .populate({path: 'friends', select: '-__v'})
            .select('-__v')
            .then(dbUsersData => {
                if(!dbUsersData) {
                    res.status(404).json({ message: 'No User with this Id!'});
                    return;
                }
                res.json(dbUsersData);
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
        }
};
    // Export module users controller
    module.exports = userController;
    

