// Set Express Router
const router = require('express').Router();
// Set routes
const userRoutes = require('./userRoutes');
const thoughtRoutes = require('./thoughtRoutes');

// Add `/users` and `/thoughts` to created routes
router.use('/users', userRoutes);
router.use('/thoughts', thoughtRoutes);

// Export Module Router
module.exports = router;