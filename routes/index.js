var User = require('../model/user.js');
var Book = require('../model/book.js');
var Borrow = require('../model/borrow.js');
var request = require('request');

module.exports = function(app){
	
	app.get('/',checkLogin);
	app.get('/', function(req, res) {
		var p = 1;
			if(req.query.p){
			p = req.query.p;
		}
		var searchData = req.query.search;
		var query = null;
		if(typeof searchData !='undefined'&&searchData['_id']&&searchData['keyword']){
			query = {_id:searchData['_id']};
		}
		Book.get(function(err,rows,total,cando){
			if(err){
				rows = [];
			}
			createPage(p,5,total,function(P){
				
				res.render('index', {title:'书籍库',user:req.session.user,lists:rows,page:P,cando:cando});	
			});
			
		},p,req.session.user,query);
	});
	app.get('/mybook',checkLogin);
	app.get('/mybook',function(req,res){
		var p = 1;
		if(req.query.p){
			p = req.query.p;
		}
		var query = {mid:req.session.user.mid};
		
		var searchData = req.query.search;
		if(typeof searchData !='undefined'&&searchData['_id']&&searchData['keyword']){
			query['_id'] =searchData['_id'];
			delete query['mid'];
		}
		Book.get(function(err,rows,total,cando){
			if(err){
				rows = [];
			}
			createPage(p,5,total,function(P){
				
				res.render('index', {title:'我的图书',user:req.session.user,lists:rows,page:P,cando:cando});	
			});
			
		},p,req.session.user,query);
	});
	app.get("/borrow",checkLogin);
	app.get("/borrow",function(req, res){
		var p = 1;
		if(req.query.p){
			p = req.query.p;
		}
		var query = {mid:req.session.user.mid};
		
		var searchData = req.query.search;
		if(typeof searchData !='undefined'&&searchData['_id']&&searchData['keyword']){
			query['bid'] =searchData['_id'];
			delete query['mid'];
		}
		Borrow.get(query,p,function(err,rows,total){
			if(err){
				rows = [];
			}
			createPage(p,5,total,function(P){
				res.render('borrow', {title:'我的借书记录',user:req.session.user,lists:rows,page:P});	
			});
			
		});
	});
	app.post("/borrow",checkLogin);
	app.post("/borrow",function(req,res){
		var rs = {err:''};
		var bid = req.body.id;
		Book.id(bid,function(err,book){
			if(err||!book){
				rs.err('操作失败');
			}
			var mid = req.session.user.mid;
			var bookmid = book.mid;
			var borrow = new Borrow(mid,bid,bookmid);
			borrow.save(function(err,borrow){
				if(err){
					rs.err = "操作失败！";
					res.send(rs);
				}else{
					Book.up({_id:bid},{$set:{status:1,borrowmid:mid},$inc:{bollowcount:1}},function(err,book){
						if(err){
							rs.err = "操作失败！";
							res.send(rs);
						}else{
							res.send(rs);	
						}
					});
				}
			});
		});
	});
	app.post("/reback",checkLogin);
	app.post("/reback",function(req,res){
		var rs = {err:''};
		var bid = req.body.id;
		Borrow.returnbook(bid,req.session.user,function(err,borrow){
			if(err){
				rs.err = "还书失败！";
				res.send(rs);
			}else{
				Book.up({_id:bid},{$set:{status:0,borrowmid:0}},function(err,book){
					if(err){
						rs.err = "还书失败！";
						res.send(rs);
					}else{
						res.send(rs);	
					}
				});
			}
		});
	});
	app.get('/content/:id',function(req,res){
		Book.id(req.params.id,function(err,book){
			if(err){
				book = {};
			}
			res.render('content', {user:req.session.user,book:book});	
		});
	});
	app.get('/newbook',checkLogin);
	app.get('/newbook',function(req,res){
		var id = req.query.id;
		if(id){
			Book.id(id,function(err,book){
				if(err){
					book = {};
				}
				res.render('newbook', {
					user:req.session.user,
					book:book,
					
				});
			});
		}else{
			res.render('newbook', {
				user:req.session.user,
				book:{},
			});
		}
	});
	
	app.post('/newbook',checkLogin);
	app.post('/newbook',function(req,res){
		var currentUser = req.session.user;
		var id = req.body._id;
		var newbook = {
			mid:currentUser.mid,
			title:req.body.title,
			autor:req.body.autor,
			reads:req.body.reads,
			status:req.body.status,
			id:req.body._id
		};
		if(id){
			Book.edit(newbook,function(err,book){
				if(err){
					req.flash('error',err);
					return res.redirect('/');
				}
				req.flash('success','修改成功!');
				res.redirect('/');
			});
		}else{
			var book = new Book(newbook);
			book.save(function(err){
				if(err){
					req.flash('error',err);
					return res.redirect('/');
				}
				req.flash('success','发布成功!');
				res.redirect('/');
			});
		}
	});
	app.post('/del',checkLogin);
	app.post('/del',function(req,res){
		var rs = {err:''};
		var id = req.body.id;
		Book.del(id,function(err,book){
			if(err){
				rs.err = '删除失败';
			}
			res.send(rs);
		});
		
	});
	
	
	app.get('/login',checkNotLogin);
	app.get('/login',function(req,res){
		res.render('login', {layout:false});	
	});
	app.get('/logout',function(req,res){
		req.session.user = null;
		
		 //res.clearcookie('admin_uid');
		 //res.clearcookie('admin_name');
		 //res.clearcookie('admin_cname');
		// res.clearcookie('admin_key');
		res.cookie('admin_uid',"null",{maxAge:0, httpOnly:true, path:'/',domain:'.oa.com'});
		res.cookie('admin_name',"null",{maxAge:0, httpOnly:true, path:'/',domain:'.oa.com'});
		res.cookie('admin_cname',"null",{maxAge:0, httpOnly:true, path:'/',domain:'.oa.com'});
		res.cookie('admin_key',"null",{maxAge:0, httpOnly:true, path:'/',domain:'.oa.com'});
		//req.cookie('admin_uid','');
		//res.cookie('admin_uid', '', {maxAge:-1, httpOnly:true, path:'/'});
		//res.cookie('admin_key', '', {maxAge:-1, httpOnly:true, path:'/'});
		return res.redirect('http://sso.oa.com/Index/login/appid/1058');
		//return res.redirect('http://www.baidu.com');
	});
	app.post('/login',checkNotLogin);
	app.post('/login',function(req,res){
		User.get(req.body.name,function(err,user){
			var pwd = req.body.pwd;
			if(err){
				req.flash('error',err);
				return res.redirect('/login');
			}
			if(!user){
				req.flash('error','用户不存在！');
				return res.redirect('/login');
			}
			if(user.pwd!=pwd){
				req.flash('error','密码错误!');
				return res.redirect('/login');
			}
			req.session.user = user;
			
			req.flash('success','登录成功！');
			return res.redirect('/');
		});
	});
	
	app.get('/search',function(req,res){
		var title = req.query.key;
		var query = {
			title:{$regex:new RegExp(title)},
		};
		Book.getbysearch(query,function(err,books){
			if(err){
				books = [];
			}
			Book.getbysearch({autor:{$regex:new RegExp(title)}},function(err,data){
				if(err){
					data = [];
				}
				res.send(data);
				
			},1,books);
			
		});
	});
	
	
	
	function checkLogin(req,res,next){
		var user = null;
		if(!req.session.user){
			var admin_uid = req.query.admin_uid;
			var admin_key = req.query.admin_key;
			if(admin_uid&&admin_key){
				var ssourl ='http://sso.oa.com:8871/api?do=getInfo&uid='+admin_uid+'&key='+admin_key+'&appid=1058';
				request.get({
					url:ssourl,
				},function(error, response, body){
					var json = JSON.parse(body);
					user = {};
					user.name = json.cname;
					user.mid = parseInt(json.code);
					req.session.user = user;
					if(!user){
						req.flash('error','未登录！');
						return res.redirect('http://sso.oa.com/Index/login/appid/1058');
					}
					User.Mid(user.mid,function(err,rs){
							if(!err&&!rs){
								var newuser = {
									name:user.name,
									mid:user.mid
								};
								var o = new User(newuser);
								o.save(function(err,newuser){});
							}
							next();
					});
					
					
				});
			}else{
				req.flash('error','未登录！');
				return res.redirect('http://sso.oa.com/Index/login/appid/1058');
			}
		}else{
			var diyuid = req.query.diyuid;
			if(diyuid&&diyuid!=req.session.user.mid){
				var admin_uid = req.cookies['admin_uid'];
				var admin_key = req.cookies['admin_key'];
				
				var ssourl ='http://sso.oa.com:8871/api?do=getInfo&uid='+admin_uid+'&key='+admin_key+'&appid=1058';
			
				request.get({
					url:ssourl,
				},function(error, response, body){
					var json = JSON.parse(body);
					user = {};
					user.name = json.cname;
					user.mid = parseInt(json.code);
					req.session.user = user;
				});
			}
			next();
		}
		
		
		
		
	}
	function checkNotLogin(req,res,next){
		
		if(req.session.user){
			req.flash('error','已登录!');
			return res.redirect('/');
		}
		next();
	}
	
	
	function createPage(p,pagesize,total,callback){
		var P = {
			pages:[],
			prev:0,
			next:0,
			
		};
		if(total==0){
			return callback(P);
		}
		var pages = Math.ceil(total/pagesize);
		
		
		if(pages<=5){
			P['pages'] = [];
			for(var i = 1; i<=pages;i++){
				var curr = { p:i,on:false};
				if(p==i){
					curr.on = true; 
				}
				P['pages'].push(curr);
			}
			if(p!=1){
				P.prev = (p-1);
			}
			if(p!=pages){
				P.next = (p+1);
			}
		}
		if(pages>5){
			var qujian = Math.ceil(p/5);
			var st =(qujian-1)*5+1;
			var en = st+4>pages? pages:st+4;
			for(var i =st; i<= en;i++){
				var curr = { p:i,on:false};
				if(p==i){
					curr.on = true; 
				}
				P['pages'].push(curr);
			}
			if(p!=1){
				P.prev = (p-1);
			}
			if(p!=pages){
				P.next = (p+1);
			}
			
		}
		callback(P);
	}
	
	
	
	
	
	
};
