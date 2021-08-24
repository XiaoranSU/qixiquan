var express = require('express');
var router = express.Router();
const nodemailer = require('nodemailer');


function sendEmail (data){
    let transporter = nodemailer.createTransport({
        service: 'QQ', // 发送者的邮箱厂商，支持列表：https://nodemailer.com/smtp/well-known/
        port: 465, // SMTP 端口
        secureConnection: true, // SSL安全链接
        auth: {   //发送者的账户密码
            user: '3214624800@qq.com', //账户
            pass: 'ffutxshnxifodead', //smtp授权码，到邮箱设置下获取
        }
    });
    let mailOptions = {
        from: '"服务器" <3214624800@qq.com>', // 发送者昵称和地址
        to: data.email, // 接收者的邮箱地址
        subject: data.sub, // 邮件主题
        html: data.content
    };
    //发送邮件
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('邮件发送成功 ID：', info.messageId);
    }); 
}
// 这里是 nickName, createTime, link 通过 api 返回的参数进行动态填写的
let nickName, createTime, link;
createTime = '2021-01-26 15:20';
link = 'http://blog.lovemysoul.vip'

let data = {
  email: '1131295420@qq.com',
  sub:'',
  content: '',
    
}


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/quanlist', function(req, res, next) {
  {useUnifiedTopology:true}
  var MongoClient = require('mongodb').MongoClient;
            var url = "mongodb://localhost:27017/";
            
            MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
                if (err) throw err;
                var dbo = db.db("website");
                //console.log(dbo.collection("class").find({}, {name: 1, _id: 0 }));
                dbo.collection("quan"). find({}).toArray(function(err, result) { // 返回集合中所有数据
                    if (err) throw err;
                    // console.log(result);
                    res.json(result)
                    db.close();
                }); 
            });
});

router.post('/changelist', function (req, res, next) {
  
  //var req.body= JOSN.stringify(JOSN.parse(req.body))
  //console.log( typeof(req.body), '1')
  let ob = req.body
  console.log(ob["name"], ob["num"], ob["count"])
  data.sub=ob["name"] +'使用通知'
  data.content=`
        <p style="text-indent: 2em;">亲爱的 </p>
        <p style="text-indent: 2em;">您在小可爱使用了 ${ ob["name"] }第${ ob["num"] }+1张第${ ob["count"] }次 通知已经发送到邮件！请尽快实施 </p>
        <p style="text-indent: 2em;">祝您工作顺利，心想事成</p>
    `
  sendEmail(data) 
  
  
   var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb://localhost:27017/";
            
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("website");
    var whereStr = { "name": ob["name"] };  // 查询条件
    switch(ob["num"]) {
     case 0:
        var updateStr = {$set: {  "use.0": ob["count"] }};
        break;
     case 1:
        var updateStr = {$set: {  "use.1": ob["count"] }};
        break;
      case 2:
        var updateStr = {$set: {  "use.2": ob["count"] }};
        break;
      case 3:
        var updateStr = {$set: {  "use.3": ob["count"] }};
        break;
      case 4:
        var updateStr = {$set: {  "use.4": ob["count"] }};
        break;
     default:
        
} 
    
    dbo.collection("quan").updateOne(whereStr, updateStr, function(err, res) {
        if (err) throw err;
        console.log("文档更新成功");
        db.close();
    });
});
  
          
});

module.exports = router;
