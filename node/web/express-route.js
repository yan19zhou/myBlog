let url = require('url');

// 封装路由 暴露模块
let Server = function() {
    // 全局变量
    let G = this;
    this._get = {};
    this._post = {};
    let app = function(req, res) {
        // 处理路由
        changeRes(res); // 改变响应头
        let pathname = url.parse(req.url).pathname;
        if (!pathname.endsWith('/')) {
            pathname = pathname + '/';
        }
        let method = req.method.toLowerCase();

        if (G['_' + method][pathname]) {
            // 路由存在
            // 判断请求方法为get还是post
            if (method == 'post') {
                // 获取数据,并赋值给res。body
                let str = ''
                res.on('data', (err, data) => {
                    if (err) {
                        return false;
                    } else {
                        str += data
                    }
                });
                res.on('end', (err) => {
                    if (err) {

                        return false;
                    } else {
                        res.body = str;
                    }
                });
                G['_' + method][pathname](req, res);

            } else if (method == 'get') {
                G['_' + method][pathname](req, res);
            }
        } else {
            res.send('no router');
        }

    }
    app.get = function(str, callback) {
        if (!str.endsWith('/')) {
            str = str + '/';
        }
        if (!str.startsWith('/')) {
            str = '/' + str;
        }
        G._get[str] = callback;
    }
    app.post = function(str, callback) {
        if (!str.endsWith('/')) {
            str = str + '/';
        }
        if (!str.startsWith('/')) {
            str = '/' + str;
        }
        G._post[str] = callback;
    }

    return app;
}

function changeRes(res) {
    res.send = function(data) {
        res.writeHead(200, {
            "Content-Type": "text/html;charset='utf-8'"
        });

        res.end(data);
    }
}
// 暴露接口
module.exports = Server();