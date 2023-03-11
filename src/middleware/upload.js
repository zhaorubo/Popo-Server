const multer = require('@koa/multer');
const path = require('path');
const jwt = require('jsonwebtoken');
const { mkdirs } = require('../utils/utils');
//配置
let storage = multer.diskStorage({
    //文件保存路径
    destination: async function (req, file, cb) {
        const white = ['/popo/login', '/popo/registered'].includes(req.url);
        let filePath;
        white ? (filePath = req.url.split('/')[2]) : (filePath = req.url.split('/')[2].split('_')[0]);
        // 检查文件是否存在于当前目录中。没有则创建，随后再保存
        let result = await mkdirs(filePath);
        if (!result) {
            cb(null, `public/uploads/${filePath}`); //注意路径必须存在
        }
    },
    //修改文件名称
    filename: function (req, file, cb) {
        const {
            user: { account, user_name }
        } = jwt.verify(req.headers.authorization.split('Bearer ')[1], 'screct');
        let fileFormat = file.originalname.split('.');
        let fileName = fileFormat[0] + '.' + `${file.fieldname}.${account}.${user_name}.` + fileFormat[fileFormat.length - 1];
        cb(null, fileName);
    }
});
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 10 //设置文件大小
    }
});
module.exports = upload;
