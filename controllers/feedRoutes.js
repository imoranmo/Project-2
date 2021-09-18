//Main feed page
const router = require('express').Router();
const { Rhythms, Posts, Users } = require('../models');

router.get('/',async (req, res) => {
    try {
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