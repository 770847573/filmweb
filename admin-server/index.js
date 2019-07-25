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
//数据库连接
mydb.connect()
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
// 接受post过来的额数据
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//使用cookie-parser
let secret = 'app.film.com';
app.use(cookie(secret));
//启用session
app.use(session({
  secret: secret,
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 7*24*3600000 }
}))
app.get('/', (req, res) => {
    res.send('首页');
});
app.post('/login',(req,res)=>{

	 let sql = 'SELECT * FROM admin WHERE name = ? LIMIT 1';
	mydb.query(sql,[req.body.name],(err,result)=>{
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
//注册
app.post('/signup', (req, res)=>{
    let sql = 'select * from admin WHERE 1';
    if(req.body.username){
        sql+=" AND username='"+req.body.username+"'";
    }
    mydb.query(sql, (err, results)=>{
    	if(results.length > 0) {
    		res.json({
    			msg: "username_already_exist"
    		})
    	} else {
    		let newsql = `insert into admin(username,passw1) values ("${req.body.username}",${req.body.passwor1})`;
    		mydb.query(newsql, (err, results) => {
    			if(err) {
    				console.log(err);
    				return;
    			}
    			res.json({
    				msg: "reg_success"
    			})
    		})
    	}
    });
});

//提供session信息的路由

app.get('/check', (req, res) => {
    console.log(req.session);
    res.json({ aid: req.session.aid, name: req.session.name });
});

app.get('/logout', (req, res) => {
    req.session.aid = '';
	req.session.name = '';
    res.json({ aid: req.session.aid, name: req.session.name });
});
app.listen(81,()=>{
	console.log('Server started on 81')
})