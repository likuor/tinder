const router = require('express').Router();
const {
  CreateUser,
  LoginUser,
  AllSet,
  GetUser,
  cookieCheck,
} = require('../controllers/auth');
router.post('/signup', CreateUser);
router.post('/login', LoginUser);
router.post('/all', AllSet);
router.get('/getuserinfo', GetUser);
router.get('/cookie', cookieCheck);
module.exports = router;
