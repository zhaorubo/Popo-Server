const router = require('./route');
const interface = require('../interface/interface');
const { getCategory, createCategory, getCategoryToArticle, deleteCategory, changeCategory } = require('../controllers/category.controller');

/** 获取类目 */
router.get(interface.GET_CATEGORY, getCategory);
/** 创建类目 */
router.post(interface.CREATE_CATEGORY, createCategory);
/** 删除类目 */
router.delete(interface.DELETE_CATEGORY, deleteCategory);
/** 修改类目 */
router.put(interface.CHANGE_CATEGORY, changeCategory);
/** 根据类目获取对应文章 */
router.get(interface.GET_CATEGORYTOARTICLE, getCategoryToArticle);
