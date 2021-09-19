//Profile page routes
const router = require('express').Router();
const { Rhythms, Posts, Users } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, async (req, res) => {
    try {

      if (!req.session.logged_in) {
        res.redirect(req.baseUrl + '/session/login');
        return;
    }
      const postData = await Posts.findAll({where: {user_id:req.session.user_id}});
      const posts = postData.map((post) => post.get({ plain: true }));

      res.render('profile', {posts,
        logged_in: req.session.logged_in }
      );
    } catch (err) {
      res.status(500).json(err);
    }
  });

module.exports = router;