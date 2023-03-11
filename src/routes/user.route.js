const router = require('./route');
const interface = require('../interface/interface');
const uploads = require('../middleware/upload');
const { loginHandler, registeredHandler } = require('../controllers/user.controller');

router.post(interface.LOGIN, loginHandler);
router.post(interface.REGISTERED, uploads.any(), registeredHandler);
