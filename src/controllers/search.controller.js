const { sql } = require('mysqls');
const { initParams, unique, changeStateAndReturnBody, whetherHave } = require('../utils/utils');

module.exports = {
    async searchHandler(ctx) {
        try {
            whetherHave({ ...ctx.query }, ['query']);
            let params = initParams(ctx.query, ['category', 'title', 'content', 'author_name']);
            let result = [];
            // 给每个字段各自请求添加到result
            for (let i = 0; i < params.length; i++) {
                let resultItem = await sql.table('article_table').where(params[i]).select(true).exec();
                if (resultItem.length) {
                    result.push(resultItem);
                }
            }
            // 给result做数据整理
            result = sortingResult(result);
            function sortingResult(data, result = []) {
                if (data.length === 0) return;
                let item = data.splice(0, 1);
                item[0].forEach(i => {
                    result.push(i);
                });
                sortingResult(data, result);
                return result;
            }
            // 给result做去重
            result = unique(result);

            if (result.length) {
                changeStateAndReturnBody.call(ctx, 200, {
                    tips: '查询到了',
                    result
                });
            } else {
                changeStateAndReturnBody.call(ctx, 301, {
                    tips: '没有查询到东西',
                    result
                });
            }
        } catch (error) {
            changeStateAndReturnBody.call(ctx, 400, {
                tips: '发生错误了',
                message: error.message
            });
        }
    }
};
