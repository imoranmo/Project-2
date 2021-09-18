//Main feed page
const router = require('express').Router();
const { Rhythms, Posts } = require('../../models');

router.get('/',async (req, res) => {
    try {
      const rhythmData = await Rhythms.findAll();
      const rhythms = rhythmData.map((rhythm) => rhythm.get({ plain: true }));
      res.json('feed', {rhythms, 
        
        logged_in: req.session.logged_in });

        
    } catch (err) {
      res.status(500).json(err);
    }
  });

module.exports = router;