var crypto =require('crypto');
var mongoose = require('./db');

var userSchema = new mongoose.Schema({
	name:String,
	mid:Number
},{
	collection:"users"
});
var userModel = mongoose.model('User',userSchema);
function User(user){
	this.name = user.name;
	this.mid = user.mid;
};
User.prototype.save = function(callback){
	var user = {
		name:this.name,
		mid :this.mid
	};
	var newUser = new userModel(user);
	newUser.save(function(err,user){
		if(err){
			return callback(err);
		}
		callback(null,user);
	});
	 
};
User.get = function(name,callback){
	userModel.findOne({name:name},function(err,user){
		if(err){
			return callback(err);
		}
		callback(null,user);
	});
};

User.getId = function(mid,callback){
	userModel.findOne({mid:mid},function(err,user){
		if(err){
			return callback(err);
		}
		callback(null,user);
	});
	
}
function inArray(a,b){
	var bool = -1;
	for(var i = 0;i<b.length;i++){
		if(a==b[i]){
			return i;
		}
	}
	return bool;
}


User.findInMid = function(data,callback){
	var mids = data.mid;
	var borrowmids = data.borrowmid;
	var ids = mids.concat(borrowmids);
	userModel.find({mid:{$in:ids}},function(err,users){
		if(err){
			return callback(err);
		}
		var ret = {mids:{},borrowmids:{}};
		users.forEach(function(u){
			if(inArray(u.mid,mids)!=-1){
				ret.mids[u.mid] = u.name;
			}
			if(inArray(u.mid,borrowmids)!=-1){
				ret.borrowmids[u.mid] = u.name;
			}
		});
		callback(null,ret);
	});
};
User.Mid = function(mid,callback){
	userModel.findOne({mid:mid},function(err,user){
		if(err){
			return callback(err);
		}
		callback(null,user);
	});
}
//User.getMid = function(mid,callback){
//	userModel.findOne({mid:mid},function(err,user){
//		if(err){
//			return callback(err);
//		}
//		callback(null,user);
//	});
//};


module.exports = User;