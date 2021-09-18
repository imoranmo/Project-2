//Main feed page
const router = require('express').Router();
const { Rhythms, Posts, Users } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, async (req, res) => {
    try {

      if (!req.session.logged_in) {
        res.redirect(req.baseUrl + '/session/login');
        return;
    }
      const rhythmData = await Rhythms.findAll();
      const rhythms = rhythmData.map((rhythm) => rhythm.get({ plain: true }));
      const postData = await Posts.findAll();
      const posts = postData.map((post) => post.get({ plain: true }));
      
      res.render('feed', {rhythms, posts,
        logged_in: req.session.logged_in },        
        
        // {include: {
        //   model: Users,
        // }}
      );
    } catch (err) {
      res.status(500).json(err);
    }
  });

module.exports = router;