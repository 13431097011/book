var User = require('../model/user.js');
var Book = require('../model/book.js');
var Borrow = require('../model/borrow.js');
module.exports = function(app){
	app.get('/', function(req, res) {
		var p = 1;
			if(req.query.p){
				p = req.query.p;
		}
		Book.get(function(err,rows,total,cando){
			if(err){
				rows = [];
			}
			createPage(p,5,total,function(P){
				
				res.render('index', {user:req.session.user,lists:rows,page:P,cando:cando});	
			});
			
		},p,req.session.user);
	});
	app.get('/mybook',checkLogin);
	app.get('/mybook',function(req,res){
		var p = 1;
			if(req.query.p){
				p = req.query.p;
		}
		Book.get(function(err,rows,total,cando){
			if(err){
				rows = [];
			}
			createPage(p,5,total,function(P){
				
				res.render('mybook', {user:req.session.user,lists:rows,page:P,cando:cando});	
			});
			
		},p,req.session.user,{mid:req.session.user.mid});
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
			console.log(book);
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
		res.redirect('/');
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
		
	});
	
	
	
	function checkLogin(req,res,next){
		if(!req.session.user){
			req.flash('error','未登录！');
			return res.redirect('/login');
		}
		next();
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
