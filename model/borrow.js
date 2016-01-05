var mongoose = require("./db");
var User = require("./user");
var Book = require("./book");
var borrowSchema = new mongoose.Schema({
	mid:Number,
	bid:mongoose.Schema.Types.ObjectId,
	bookmid:Number,
	status:{type:Number,default:0},//0正在借，1 已归还
	createTime:{}//借书时间
	
},{
	collection:"borrow"
});
function Borrow(mid,bid,bookmid){
	this.mid = mid;
	this.bid = bid;
	this.bookmid = bookmid;
}
var borrowModel = mongoose.model('Borrow',borrowSchema);
var pagesize = 5;
Borrow.prototype.save = function(callback){
	var date = new Date();
	var time = {
		date:date,
		year:date.getFullYear(),
		month:date.getFullYear()+"-"+(date.getMonth()+1),
		day:date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate(),
		minute:date.getFullYear()+"-"+ (date.getMonth()+1)+"-"+date.getDate()+" "+date.getHours()+":"+(date.getMinutes()<10?'0'+date.getMinutes():date.getMinutes())
	};
	var newborrow = {
		mid :this.mid,
		bid :this.bid,
		bookmid:this.bookmid,
		createTime:time
	};
	borrowModel.findOne({bid:this.bid},function(err,borrow){
		if(err){
			return callback(true);
		}
		if(borrow){
			return callback(true);
		}
		if(borrow&&borrow.status!=1){
			return callback(true);
		}
		
		var o = new borrowModel(newborrow);
		o.save(function(err,data){
			if(err){
				return callback(err);
			}
			callback(null,data);
		});
		
		
	});
	
};
Borrow.getBybIds = function(bids,callback){
	borrowModel.find({bid:{$in:bids}},function(err,borrow){
		if(err){
			return callback(err);
		}
		callback(null,borrow);
	});
};
Borrow.returnbook = function(id,curruser,callback){
	borrowModel.findOne({bid:id},function(err,borrow){
		if(err){
			return callback(err);
		}
		if(borrow.bookmid!=curruser.mid){
			return callback('您的书不需要归还操作');
		}
		var date = new Date();
		var time = {
			date:date,
			year:date.getFullYear(),
			month:date.getFullYear()+"-"+(date.getMonth()+1),
			day:date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate(),
			minute:date.getFullYear()+"-"+ (date.getMonth()+1)+"-"+date.getDate()+" "+date.getHours()+":"+(date.getMinutes()<10?'0'+date.getMinutes():date.getMinutes())
		};
		var options  = {upsert : true};
		borrowModel.update({bid:id},{$set:{rebackTime:time,status:1}},options,function(err,borrow){
			if(err){
				return callback(err);
			}
			callback(null,borrow);
		});
		
	});
};
Borrow.get = function(query,p,callback){
	if(!p||p<=1){
		p = 1;
	}
	var skip  = (p-1)*pagesize;
	if(!query){
		query = {};
	}
	borrowModel.count(query,function(err,total){
		if(err){
			return callback(err);
		}
	
		borrowModel.find(query).limit(pagesize).skip(skip).sort({createTime:-1}).exec(function(err,borrows){
			if(err){
				return callback(err);
			}
		
			var bookmids = [];
			var bookids = []; 
			borrows.forEach(function(u){
				bookmids.push(u.bookmid);
				bookids.push(u.bid);
				if(u.status == 1){
					u.statusTXT = '已归还';
				}else{
					u.statusTXT = '还没还';
				}
			});
			
			if(bookmids.length>0){
				User.findInMid({mid:bookmids,borrowmid:[]},function(err,users){
					if(err){
						return callback(err);
					}
					borrows.forEach(function(b){
						b.bookmidCname = users.mids[b.bookmid];
					});
					if(bookids.length>0){
						Book.ids(bookids,function(err,books){
							if(!err){
								borrows.forEach(function(b){
									b.booktitle = books[b.bid]['title'];
								});
							}
							callback(null,borrows,total);
						});
					}else{
						callback(null,borrows,total);
					}
				});
			}else{
				callback(null,borrows,total);
			}
		});
		
	});
}


module.exports = Borrow;