const router = require('express').Router();
const {Users, Comments, Posts } = require('../../models');
const withAuth = require('../../utils/auth');

// Shows posts, post by id, and comments for post by id
router.get('/comments/:id', withAuth, async (req, res) => {
    try {
  
      if (!req.session.logged_in) {
        res.redirect('/login');
        return;
      }
  
      const commentData = await Comments.findAll({where: {post_id:req.params.id}, include: {
        model: Users,
        attributes: ['user_name']
        }});

        const comments = commentData.map((comment) => comment.get({ plain: true }));
        console.log(comments[0]);

    res.json(comments)
    } catch {
        res.status(404).end();
    }

});

router.post('/newPost', async (req, res) => {
 
  try {
      const user_id = req.session.user_id;
      const {title, content, date_created, rhythm_id} = req.body;
      const newBody = {title, content, date_created, user_id, rhythm_id}
      
      console.log(newBody);

      await Posts.create(newBody);

      res.status(200).end();
    } catch (err) {
      res.status(500).json(err);
    }
});
    module.exports = router;