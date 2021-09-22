//Main feed page
const router = require('express').Router();
const { Rhythms, Posts, Users, Comments } = require('../models');
const withAuth = require('../utils/auth');
var Sequelize = require('sequelize');
const Op = Sequelize.Op;

router.get('/', withAuth, async (req, res) => {
    try {

      if (!req.session.logged_in) {
        res.redirect(req.baseUrl + '/session/login');
        return;
      }

      console.log(req.query);

      let postData = [];
      const { rhythms } = req.query
       if (rhythms) {
         rhythmArr = rhythms.split(",");
         rhythmInt = rhythmArr.map((ele)=>parseInt(ele));
         postData = await Posts.findAll({  
          where: {
          rhythm_id: {
              [Op.in]: rhythmInt
            }
          },
          include: [{model: Users}, {model:Rhythms} ]});
       } else {
          postData = await Posts.findAll({  
          include: [{model: Users}, {model:Rhythms} ]});
       }

      const rhythmData = await Rhythms.findAll();
      const rhythmSet = rhythmData.map((rhy) => rhy.get({ plain: true }));
      
      const posts = postData.map((post) => post.get({ plain: true }));
      console.log(posts);
      

      res.render('feed', {rhythmSet, posts,
        logged_in: req.session.logged_in }
      );
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });

  router.get('/newPost/', withAuth, async (req, res) => {
    try {

      if (!req.session.logged_in) {
        res.redirect(req.baseUrl + '/session/login');
        return;
      }
      const rhythmData = await Rhythms.findAll();
      const rhythms = rhythmData.map((rhythm) => rhythm.get({ plain: true }));
      res.render('newPost', {rhythms, logged_in: req.session.logged_in})

    } catch (err) {
      res.status(500).json(err);
    }
});


module.exports = router;