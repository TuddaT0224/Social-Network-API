// Require Users Model
const { Users, Thoughts } = require('../models');

// Set up Users Controller
module.exports = {
    // Create a New User
    createUsers({body}, res){
        Users.create(body)
        .then(dbUsersData => res.json(dbUsersData))
        .catch(err => res.status(400).json(err));
    }
}


