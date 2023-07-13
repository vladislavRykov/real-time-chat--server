const { Router } = require('express');
const UserModel = require('../models/User');
const { registerValidator, loginValidator } = require('../validation/user-validator');
const { User } = require('../controllers/user-controller');
const { Dialog } = require('../controllers/dialog.controller');
const checkAuth = require('../middleware/checkAuth');
const Message = require('../controllers/message-controller');
const updateLastSeen = require('../middleware/updateLastSee');
const { Upload } = require('../controllers/upload-controller');
const upload = require('../middleware/multer');

const router = new Router();
// router.use(checkAuth);
// router.use(updateLastSeen);
//auth
router.post('/register', registerValidator, User.register);
router.post('/login', loginValidator, User.login);
router.post('/refresh', User.refresh);
router.get('/user/all', checkAuth, User.getAll);
router.get('/user/:id', checkAuth, User.getById);

//Dialogs
router.get('/dialog/all', checkAuth, Dialog.getAll);
router.post('/dialog/create', checkAuth, Dialog.create);

//Messages
router.get('/messages/dialog/:id', checkAuth, Message.getByDialogId);
router.post('/message/create', checkAuth, Message.create);
router.post('/message/delete', checkAuth, Message.delete);

//Upload
router.post('/upload', checkAuth, upload.array('images'), Upload.images);
module.exports = router;
