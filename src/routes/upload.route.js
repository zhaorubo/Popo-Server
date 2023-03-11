const router = require('./route');
const interface = require('../interface/interface');
const { articleUpload, userUpload } = require('../controllers/upload.controller');
const upload = require('../middleware/upload');

router.post(interface.ARTICLE_UPLOAD, upload.any(), articleUpload);
router.post(interface.USER_UPLOAD, upload.any(), userUpload);
