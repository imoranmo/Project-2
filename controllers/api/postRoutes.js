const router = require('express').Router();
const {Users, Comments } = require('../../models');
const withAuth = require('../../utils/auth');

// Shows posts, post by id, and comments for post by id
router.get('/comments/:id', withAuth, async (req, res) => {
    try {
  
      if (!req.session.logged_in) {
        res.redirect('/login');
        return;
      }
  
      const commentData = await Comments.findAll({where: {post_id:req.params.id}, include: {
        model: Users
        }});

        const comments = commentData.map((comment) => comment.get({ plain: true }));
        console.log(comments[0]);

    res.json(comments)
    } catch {
        res.status(404).end();
    }

});

    module.exports = router;