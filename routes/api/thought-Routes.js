const router = require('express').Router();

// Set the requirments for thoughts
const {
    getAllThoughts,
    getThoughtsById,
    createThoughts,
    updateThoughts,
    deleteThoughts,
    addReaction,
    deleteReaction
} = require('../../controllers/thought-Controller');

//  Targets to `/api/thoughts`
router.route('/').get(getAllThoughts);

// Targets to `/api/thoughts/:thoughtId`
router.route('/:thoughtId').get(getThoughtsById).put(updateThoughts).delete(deleteThoughts);

// Targets to `/api/thoughts/:thoughtId/reactions
router.route('/:thoughtId/reactions').post(addReaction);

// Targets to `/api/thoughts/:thoughtId/reactionId
router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction);

// Targets to `/api/thoughts/:userId
router.route('/:userId').post(createThoughts);

// Export module router
module.exports = router;