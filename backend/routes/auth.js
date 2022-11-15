const router = require('express').Router();
const {
  CreateUser,
  LoginUser,
  Logout,
  GetUser,
  cookieCheck,
} = require('../controllers/auth');
router.post('/signup', CreateUser);
router.post('/login', LoginUser);
router.get("/logout", Logout);
router.get('/getuserinfo', GetUser);
router.get('/cookie', cookieCheck);
module.exports = router;
