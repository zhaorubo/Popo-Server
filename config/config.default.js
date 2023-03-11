const config = {
    APP_PORT: 8080,
    mode: {
        development: {
            SERVER_URL: 'localhost:8080',
            IP: '127.0.0.1'
        },
        production: {
            SERVER_URL: 'http://43.143.40.210',
            IP: '43.143.40.210',
            PORT: '8080'
        }
    },
    BASE_ROOT: '/popo',
    dataBaseConfig: {
        USER: 'root',
        PASSWORD: '200083',
        HOST: '127.0.0.1',
        DATABASE: 'blog_database'
    }
};

module.exports = config;
