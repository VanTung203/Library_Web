const express = require('express');
const router = express.Router();

const ControllerAdmin = require('../Controller/ControllerAdmin');

// User
router.get('/api/getalluser', ControllerAdmin.GetUser);
router.post('/api/edituser', ControllerAdmin.EditUser);
router.post('/api/deleteuser', ControllerAdmin.DeleteUser);
router.post('/api/editcart', ControllerAdmin.EditCart);
router.get('/api/datacart', ControllerAdmin.GetAllCart);
router.post('/api/editdatacart', ControllerAdmin.EditGetAllCart);
router.post('/api/thuthe', ControllerAdmin.ThuThe);
// router.post('/api/confirm-return', ControllerAdmin.ConfirmReturnedBook);

module.exports = router;
