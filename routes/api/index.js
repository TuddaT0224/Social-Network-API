// Set Express Router
const router = require('express').Router();
// Set routes
const userRoutes = require('./user-Routes');
const thoughtRoutes = require('./thought-Routes');

// Add `/users` and `/thoughts` to created routes
router.use('/users', userRoutes);
router.use('/thoughts', thoughtRoutes);

// Export Module Router
module.exports = router;