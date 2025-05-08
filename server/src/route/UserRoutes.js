const express = require('express');
const router = express.Router();

const ControllerUser = require('../Controller/ControllerUser');

router.post('/api/register', ControllerUser.Register);
router.post('/api/login', ControllerUser.Login);
router.post('/api/handleCart', ControllerUser.handleCart);
router.get('/api/getcart', ControllerUser.GetCart);
router.post('/api/requestbookuser', ControllerUser.HandleBook);
router.get('/api/datareqbook', ControllerUser.GetBooks);
router.post('/api/logout', ControllerUser.Logout);
router.post('/api/changepass', ControllerUser.ChangePass);
router.post('/api/changeemail', ControllerUser.EditProfile);
router.get('/api/searchuser', ControllerUser.SearchUser);
router.get('/api/searchuser2', ControllerUser.SearchUser2);

// User

module.exports = router;
