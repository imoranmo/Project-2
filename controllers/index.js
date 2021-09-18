const router = require('express').Router();

const apiRoutes = require('./api');
const feedRoutes = require('./feedRoutes');

router.use('/', feedRoutes);
router.use('/api', apiRoutes);

module.exports = router;
