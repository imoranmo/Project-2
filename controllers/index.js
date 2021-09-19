const router = require('express').Router();

const apiRoutes = require('./api');
const feedRoutes = require('./feedRoutes');
const sessionRoutes = require('./sessionRoutes');
const profileRoutes = require('./profileRoutes');

router.use('/', feedRoutes);
router.use('/api', apiRoutes);
router.use('/session', sessionRoutes);
router.use('/profile', profileRoutes);

module.exports = router;
