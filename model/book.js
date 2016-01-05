var mongoose = require("./db");
var User = require("./user");

var bookSchema = new mongoose.Schema({
	title:{type:String},
	mid:{type:Number},
	bollowcount:{type:Number,default:0},
	status:{type:Number,default:0},
	autor:{type:String},
	reads:{type:String},
	borrowmid:{type:Number,default:0},
	createTime:{}
},{
	collection:"book"
});
var pagesize = 5;//分页长度
var bookModel = mongoose.model('Book',bookSchema);
function Book(book){
	this.title = book.title;
	this.mid = book.mid;
	this.autor = book.autor;
	this.reads = book.reads;
	this.status = book.status;
	
};
/**
 * 有时候是编辑
 * @param {type} callback
 * @returns {undefined}
 */
Book.prototype.save = function(callback){
	var date = new Date();
	var time = {
		date:date,
		year:date.getFullYear(),
		month:date.getFullYear()+"-"+(date.getMonth()+1),
		day:date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate(),
		minute:date.getFullYear()+"-"+ (date.getMonth()+1)+"-"+date.getDate()+" "+date.getHours()+":"+(date.getMinutes()<10?'0'+date.getMinutes():date.getMinutes())
	};
	var book = {
		title:this.title,
		mid :this.mid,
		autor :this.autor,
		reads :this.reads,
		status:this.status,
		createTime:time
	};
	var newBook = new bookModel(book);
	newBook.save(function(err,user){
		if(err){
			return callback(err);
		}
		callback(null,user);
	});
};
Book.edit = function(data,callback){
	var book = {
		title : data.title,
		autor : data.autor,
		reads : data.reads,
		status : data.status
	};
	var options  = {upsert : true};
	bookModel.update({_id:data.id},{$set:book},options,function(err,book){
		if(err){
			return callback(err);
		}
		callback(null,book);
	})
}


Book.get =function(callback,p,curruser,query){
	
	if(!p||p<=1){
		p = 1;
	}
	var skip  = (p-1)*pagesize;
	if(!query){
		query = {};
	}
	bookModel.count(query,function(err,total){
		if(err){
			return callback(err);
		}
		var cando = 0;
		bookModel.find(query).limit(pagesize).skip(skip).sort({createTime:-1}).exec(function(err,books){
			if(err){
				return callback(err);
			}
			var mids = [];
			var borrowmids = [];
			books.forEach(function(u){
				if(u.mid){
					mids.push(u.mid);
				}
				var statusMap = {
					0:'未借出',
					1:'已借出',
					2:'不让借'
				};
				if(curruser){
					if(u.status==0&&u.mid!=curruser.mid){
						u.canborrow = 1;
						cando = 1;
					}
					if(u.status==1&&u.mid==curruser.mid){
						cando = 1;
						u.canreback = 1;
					}
					if(curruser.mid ==u.mid){
						cando = 1;
						u.canedit = 1;
					}
				}
				if(u.status==1){
					borrowmids.push(u.borrowmid);
				}
				u.statustxt = statusMap[u.status];
			});
			if(mids||borrowmids){
				User.findInMid({mid:mids,borrowmid:borrowmids},function(err,users){
					if(err){
						return callback(err);
					}
					books.forEach(function(b){
						b.cname = users.mids[b.mid];
						b.borrowname = users.borrowmids[b.borrowmid];
						if(b.status==1){
							b.statustxt = "被<font color='red'>"+b.borrowname+"</font>借走了";
						}
					});
				  	callback(null,books,total,cando);
				});
			}else{
				callback(null,books,total,cando);
			}
		});
		
	});
	
};
Book.up = function(where,update,callback){
	var options  = {upsert : true};
	bookModel.update(where,update,options,function(err,book){
		if(err){
			return callback(err);
		}
		callback(null,book);
	})
}
Book.id = function(id,callback){
	bookModel.findOne({_id:id},function(err,book){
		if(err){
			return callback(err);
		}
		callback(null,book);
	});
}

Book.ids = function(ids,callback){
	bookModel.find({_id:{$in:ids}},function(err,books){
		var rs = {};
		if(err){
			return callback(err);
		}
		books.forEach(function(b){
			rs[b._id] = b;
		});
		
		callback(null,rs);
	})
}
Book.del = function(id,callback){
	bookModel.remove({_id:id},function(err,book){
		if(err){
			return callback(err);
		}
		callback(null,book);
	});
	 
}
Book.dels = function(ids,callback){
	bookModel.remove({_id:{$in:ids}},function(err,book){
		if(err){
			return callback(err);
		}
		callback(null,book);
	});
	 
}
/**
 * type 默认是查标题。如果有指 则是查作者
 * @param {type} query
 * @param {type} callback
 * @param {type} type
 * @returns {unresolved}
 */
Book.getbysearch = function(query,callback,type,data){
	if(!query){
		return callback(1);
	}
	bookModel.find(query,function(err,books){
		if(err){
			return callback(err);
		}
		var rs = [];
		if(data){
			rs = rs.concat(data);
		}
		books.forEach(function(o){
			var row = {};
			row.id = o._id;
			row.label = o.title;
			row.value = o.title;
			
			if(type){
				row.label = o.autor;
				row.value = o.autor;
			}
			rs.push(row);
			
		});
		callback(null,rs);
	});
}


module.exports = Book;
