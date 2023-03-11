const router = require('./route');
const interface = require('../interface/interface');
const uploads = require('../middleware/upload');
const { deleteArticleHandler, createArticleHandler, getArticleHandler, changeArticleHandler } = require('../controllers/article.controller');

/** 获取文章 */
router.get(interface.GET_ARTICLE, getArticleHandler);
/** 创建文章 */
router.post(interface.CREATE_ARTICLE, uploads.any(), createArticleHandler);
/** 删除文章 */
router.delete(interface.DELETE_ARTICLE, deleteArticleHandler);
/** 修改文章 */
router.put(interface.CHANGE_ARTICLE, uploads.any(), changeArticleHandler);
