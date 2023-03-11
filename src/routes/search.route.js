const interface = require('../interface/interface');
const router = require('./route');
const { searchHandler } = require('../controllers/search.controller');

/** 搜索 */
router.get(interface.SEARCH, searchHandler)

