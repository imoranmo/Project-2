const router = require('express').Router();

router.get('/login', (req, res) => {
  // If a session exists, redirect the request to the homepage
  if (req.session.logged_in) {
    res.redirect(req.baseUrl + '/');
    return;
  }
  res.render('login');
});

//SIGN UP ROUTE
router.get('/signup', (req, res) => {
  // If a session exists, redirect the request to the homepage
  if (req.session.logged_in) {
    res.redirect(req.baseUrl + '/');
    return;
  }
  res.render('signup');
});

module.exports = router;
