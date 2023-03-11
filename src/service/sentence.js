const user = {
    selectByAccount: 'SELECT * FROM login_table WHERE account=?',
    selectAccountAndPass: 'SELECT * FROM login_table WHERE account=? AND `password`=?'
};

const article = {
    selectAllArticle: 'SELECT * FROM article_table',
    deleteArticle: 'DELETE FROM article_table WHERE id=?',
    updateArticle: 'UPDATE article_table SET ? WHERE id=?'
};

const upload = {
    updateUrl: 'UPDATE article_table SET article_image=? WHERE id=?',
    selectUrl: 'SELECT * FROM article_table WHERE id=?'
};

module.exports = {
    user,
    article,
    upload
};
