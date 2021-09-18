const router = require('express').Router();

const apiRoutes = require('./api');
const feedRoutes = require('./feedRoutes');
const sessionRoutes = require('./sessionRoutes');

router.use('/', feedRoutes);
router.use('/api', apiRoutes);
router.use('/session', sessionRoutes);

module.exports = router;
