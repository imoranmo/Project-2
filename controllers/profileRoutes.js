//Profile page routes
const router = require('express').Router();
const { Rhythms, Posts, Users, Instruments, userInstruments } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, async (req, res) => {
    try {

      if (!req.session.logged_in) {
        res.redirect(req.baseUrl + '/session/login');
        return;
    }
      const postData = await Posts.findAll({where: {user_id:req.session.user_id},
                                              include: [{model: Users}, {model:Rhythms}]
                                            });
      const posts = postData.map((post) => post.get({ plain: true }));
      console.log(posts);
      console.log(req.session.user_id)                                      
      const userData = await Users.findByPk(req.session.user_id, 
        {include: [{model: Instruments, through: userInstruments}]});
      const user = userData.get({ plain: true });
      console.log(user);
      res.render('profile', {posts, user,
        logged_in: req.session.logged_in }
      );
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });

module.exports = router;