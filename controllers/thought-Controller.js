// require Thoughts and Users Models
const {Thoughts, Users} = require('../models');

// Set up Thoughts controller
const thoughtController = {
    // Creating thoughts
    createThoughts({params, body}, res) {
        Thoughts.create(body)
        .then(({_id}) => {
            return Users.findOneAndUpdate({ _id: params.userId}, {$push: {thoughts: _id}}, {new: true});
        })
        .then(dbThoughtsData => {
            if(!dbThoughtsData) {
                res.status(404).json({message: 'No Thoughts linked to this ID!'});
                return;
            }
            res.json(dbThoughtsData)
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });

    },
    // get all thoughts
    getAllThoughts(req,res) {
        Thoughts.find({})
        .populate({path: 'reactions', select: '-__v'})
        .select('-__v')
        .then(dbThoughtsData => res.json(dbThoughtsData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
    },

    // Get thoughts by ID
    getThoughtsById({params}, res) {
        Thoughts.findOne({ _id: params.id })
        .populate({path: 'reactions', select: '-__v'})
        .select('-__v')
        .then(dbThoughtsData => {
            if(!dbThoughtsData) {
                res.status(404).json({ message: 'No Thoughts linked to this ID!'});
                return;
            }
            res.json(dbThoughtsData)
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
    },
    // Update a current thought by ID
    updateThoughts({params, body}, res) {
        Thoughts.findOneAndUpdate({_id: params.id}, body, {new: true, runValidators: true})
        .populate({path: 'reactions', select: '-__v'})
        .select('-__v')
        .then(dbThoughtsData => {
            if (!dbThoughtsData) {
                res.status(404).json({ message: 'No Thoughts linked to this ID!'});
                return;
            }
            res.json(dbThoughtsData);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });

    },

    // Delete a current thought by ID
    deleteThoughts({params}, res) {
        Thoughts.findOneAndDelete({_id: params.id})
        .then(dbThoughtsData => {
            if (!dbThoughtsData) {
                res.status(404).json({message: 'No Thoughts found!'});
                return;
            }
            res.json(dbThoughtsData);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
    },
    
    // Add a Reaction
    addReaction({params, body}, res) {
        Thoughts.findOneAndUpdate({ _id: params.thoughtId}, {$push: {reactions: body}}, {new: true, runValidators: true})
        .populate({path: 'reactions', select: '-__v'})
        .select('-__v')
        .then(dbThoughtsData => {
            if (!dbThoughtsData) {
                res.status(404).json({message: 'No Thoughts linked to this ID'});
                return;
            }
            res.json(dbThoughtsData);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
    },
    // Delete a reaction by ID
    deleteReaction({params}, res) {
        Thoughts.findOneAndUpdate({_id: params.thoughtId}, {$pull: {reactions: {reactionId: params.reactionId}}}, {new: true})
        .then(dbThoughtsData => {
            if (!dbThoughtsData) {
                res.status(404).json({message:'No Thoughts linked to this ID' });
                return;
            }
            res.json(dbThoughtsData);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
    }

};

// Export module thought controller
module.exports = thoughtController;