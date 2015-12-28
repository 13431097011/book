module.exports = function(app){
	var cfg = {
		development:{
			cookieSecret: 'myblog',
			db:'book',
			host:'192.168.56.104',
			port:27017
		},
		production:{
			cookieSecret: 'myblog',
			db:'book',
			host:'192.168.200.171',
			port:27017
		}
	}
	return cfg[app.get('env')];
}

