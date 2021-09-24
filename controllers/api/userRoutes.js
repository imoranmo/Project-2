const router = require('express').Router();
const { Users } = require('../../models');

router.post('/login', async (req, res) => {
  try {
    // Find the user who matches the posted e-mail address
    
    const userData = await Users.findOne({ where: { email: req.body.email } });
    console.log(req.body.email);
    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    // Verify the posted password with the password store in the database
    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    // Create session variables based on the logged in user
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      
      res.json({ user: userData, message: 'You are now logged in!' });
    });

  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    // Remove the session variables
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

router.post('/signup', async (req, res) => {

  try {

   
   const newUser =  await Users.create(req.body);
    console.log(req.body)
    if (newUser.length != 0) {
      req.session.save(() => {
        req.session.user_id = newUser.dataValues.id;
        req.session.logged_in = true;
        res.status(200).json(newUser);
      })
      
    }
    console.log(req.session)
    } catch (err) {
      console.log(err)
      res.status(404).json(err);
    }

});

module.exports = router;
