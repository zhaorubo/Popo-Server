module.exports = {
    GET_CATEGORY: {
        // 获取所有类目
        method: 'get',
        path: '/category/get_all_category'
    },
    // 创建类目
    CREATE_CATEGORY: {
        method: 'post',
        path: '/category/create_category'
    },
    // 删除类目
    DELETE_CATEGORY: {
        method: 'delete',
        path: '/category/delete_category'
    },
    // 获取所有文章
    GET_ARTICLE: {
        method: 'get',
        path: '/article/get_article'
    },
    // 创建文章
    CREATE_ARTICLE: {
        method: 'post',
        path: '/article/create_article'
    },
    // 删除文章
    DELETE_ARTICLE: {
        method: 'delete',
        path: '/article/delete_article'
    },
    // 修改文章
    CHANGE_ARTICLE: {
        method: 'put',
        path: '/article/change_article'
    },
    // 获取所有导航栏
    GET_NAVIGATION: {
        method: 'get',
        path: '/navigation/get_navigation'
    },
    // 创建导航栏
    CREATE_NAVIGATION: {
        method: 'post',
        path: '/navigation/create_navigation'
    },
    // 删除导航栏
    CHANGE_NAVIGATION: {
        method: 'delete',
        path: '/navigation/change_navigation'
    },
    // 修改导航栏
    DELETE_NAVIGATION: {
        method: 'put',
        path: '/navigation/delete_navigation'
    },
    // 获取某个类目的文章
    GET_ARTICLEINCATEGORY: {
        method: 'get',
        path: '/article/get_articleincategory'
    },
    // 注册
    REGISTERED: {
        method: 'post',
        path: '/registered'
    },
    // 登陆
    LOGIN: {
        method: 'post',
        path: '/login'
    }
};
