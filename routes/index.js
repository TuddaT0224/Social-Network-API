// Require express router
const router = require('express').Router();
// import all of the api routes
const apiRoutes = require('./api');
//add `/api` to all of the api routes
router.use('/api', apiRoutes);
//Status error message
router.use((req, res) => res.send('Error!'));
// Module exports router
module.exports = router;