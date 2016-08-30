var express = require('express');
var router = express.Router();//路由
var fs = require('fs');
var spawn = require('child_process').spawn;

var urls = [];
var count = 0;
var max = urls.length;
var randomPicName;
router.get('/', function (req, res) {
    res.render('index', {});
});

router.get('/url', function (req, res) {
    var url = req.query.url;
    if (url != undefined) {
        randomPicName = 'test' + createRandomName(Math.random() * 8);
        console.log("获取的随机名称=" + randomPicName);

        var process = spawn('phantomjs', ['phantom.js', url, randomPicName, count, max], {cwd: './routes/'});
        process.stdout.setEncoding('utf8');
        process.stderr.on('data', function (data) {
            console.log("stderr" + data);
        });
        process.on('close', function (code) {
            if (code == 1) {
                console.log('child process异常结束。目标：' + url);
            }
        });
        process.on('exit', function (code) {
            res.json({
                success: 1,
                data: [{
                    title: url,
                    src: randomPicName
                }]
            })
        });
    } else {
        res.render('index', {});
    }
});

//生成随机字符串作为图片名称;
function createRandomName(len) {
    len = len || 32;
    /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
    var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
    var maxPos = $chars.length;
    var pwd = '';
    for (var i = 0; i < len; i++) {
        pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return pwd;
}

module.exports = router;