const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cookie = require('cookie-parser');
const session = require('express-session');

const app = express();

var localhost = 'http://localhost:81'
const mydb = mysql.createConnection(
{
	host:'localhost',
	 user: 'root',
	password: 'root',
	database: 'film',
	port: 3306
})
//跨域
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:8080');
    //Access-Control-Allow-Headers ,可根据浏览器的F12查看,把对应的粘贴在这里就行
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Methods', '*');
    // 支持cookie  必须指定具体的域名 
    res.header("Access-Control-Allow-Credentials", true);
    res.header('Content-Type', 'application/json;charset=utf-8');
    next();
});
mydb.connect()
//使用cookie-parser
let secret = 'app.film.com';
app.use(cookie(secret));
//启用session
app.use(session({
  secret: secret,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}))
app.get('/', (req, res) => {
    res.send('首页');
});
app.post('/login',(req,res)=>{
	let sql = 'SELECT * FROM admin WHERE name = ? LIMIT 1'
	mydb.query('sql',[req.body.name],(err,result)=>{
		console.log(result)
		if(err){
			console.log(err);
			res.json({r:'有错误'})
			return
		}
		 // 检查账号是否存在  []  {}  ==>  true
		if(res.length==0){
			res.json({r:'name-not-exist'});
			return
		}
		if(req.body.passwd!=result[0].passwd){
			res.json({r:'passwd-err'})
			return
		}
		//用户密码输入正确
		//记录cookie和session
		req.session.aid = result[0].aid;
		req.session.name = result[0].name;
		
		res.send({ r: 'ok' });
		
	})
})

app.listen(81,()=>{
	console.log('Server started on 81')
})