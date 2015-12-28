<!doctype html>
<html>
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
		<title>
            博雅OA系统
        </title>
        <link rel="stylesheet" type="text/css" href="/stylesheets/pb.css" />
		
        <link rel="stylesheet" type="text/css" href="/javascripts/jqui/jquery-ui.min.css" />
		<script src="/javascripts/jquery-1.11.2.min.js"></script>
		<script src="/javascripts/seajs.3.0.js"></script>
    </head>
    <body>
        <div class="wrapper">
			<div class="header">
				<div class="wrap cl">
					<div class="logo">
						<a href="#"></a>
					</div>
					<ul class="nav">
						<li>
							<a key="pe" class="on" href="#">
								人事基础系统
							</a>
						</li>
						<li>
							<a key="hr" href="#">
								考勤系统
							</a>
						</li>
						<li>
							<a key="pe" href="#">
								绩效与调配系统
							</a>
						</li>
						<li>
							<a key="fi" href="http://fi.oa.com/" target="_blank">
								财务系统
							</a>
						</li>
						<li>
							<a key="mb" href="http://meet.oa.com/" target="_blank">
								会议室预定
							</a>
						</li>
						<li class="set_menu">
							<a href="javascript:;" class="sel">
											<span>
												更多系统
											</span>
								<i class="arrow">
								</i>
							</a>
							<div class="sel_box">
								<div class="wrap">
									<p class="cl edit_box">
										<a href="javascript:;" class="icon btn_edit">
											编辑
										</a>
									</p>
									<ul class="sel_nav cl " id="view_nav">
										<li>
											<a key="tr" href="http://u.oa.com/train/" target="_blank" class="ico_nav tr"
											   title="博雅大讲堂">
											</a>
										</li>
										<li>
											<a key="ls" href="http://law.oa.com/" target="_blank" class="ico_nav ls"
											   title="法务系统">
											</a>
										</li>
										<li>
											<a key="it" href="http://it.oa.com/" target="_blank" class="ico_nav it"
											   title="IT需求">
											</a>
										</li>
										<li>
											<a key="as" href="http://assets.oa.com/" target="_blank" class="ico_nav as"
											   title="资产管理">
											</a>
										</li>
										<li class="last">
											<a key="ks" href="http://kms.oa.com" target="_blank" class="ico_nav ks" title="知识分享"></a>
										</li>
									</ul>
									<ul class="sel_nav edit_nav cl" id="edit_nav">
										<li class="ico_nav hr on">
											<a id="hr" value="1" href="#" class="ico_nav hr on">
												考勤系统
											</a>
											<i>
											</i>
										</li>
										<li class="ico_nav pe on">
											<a id="pe" value="1" href="#" class="ico_nav pe on">
												绩效与调配系统
											</a>
											<i>
											</i>
										</li>
										<li class="ico_nav fi on">
											<a id="fi" value="1" href="http://fi.oa.com/" target="_blank" class="ico_nav fi on">
												财务系统
											</a>
											<i>
											</i>
										</li>
										<li class="ico_nav mb on">
											<a id="mb" value="1" href="http://meet.oa.com/" target="_blank" class="ico_nav mb on">
												会议室预定
											</a>
											<i>
											</i>
										</li>
										<li class="ico_nav ks on">
											<a id="ks" value="1" href="http://kms.oa.com" target="_blank" class="ico_nav ks on">
												知识分享
											</a>
											<i>
											</i>
										</li>
										<li class="ico_nav tr">
											<a id="tr" value="0" href="http://u.oa.com/train/" target="_blank" class="ico_nav tr">
												博雅大讲堂
											</a>
											<i>
											</i>
										</li>
										<li class="ico_nav ls">
											<a id="ls" value="0" href="http://law.oa.com/" target="_blank" class="ico_nav ls">
												法务系统
											</a>
											<i>
											</i>
										</li>
										<li class="ico_nav it">
											<a id="it" value="0" href="http://it.oa.com/" target="_blank" class="ico_nav it">
												IT需求
											</a>
											<i>
											</i>
										</li>
										<li class="ico_nav as">
											<a id="as" value="0" href="http://assets.oa.com/" target="_blank" class="ico_nav as">
												资产管理
											</a>
											<i>
											</i>
										</li>
									</ul>
									<p class="tips">
										操作提示：1.
										<b>
											绿色
										</b>
										表示当前在导航栏显示 2.最多选择5个在导航栏显示 3.鼠标拖拽自定义排列顺序
									</p>
								</div>
							</div>
						</li>
					</ul>
					{{#if user}}
					<div class="user_info" >
						<a href="javascript:;" class="face">
							<span class="g">
								<em class="b">
								</em>
								<img width="30" src="http://by.oa.com/data/headpic/{{user.mid}}.jpg" onerror="this.onerror=null;this.src='images/sex_F.jpg'"
									 alt="" />
							</span>
							<i class="icon"></i>
						</a>
						<ul>
							<li>
								<a href="/logout">退出<span class="icon exit">	</span></a>
							</li>
						</ul>
					</div>
					{{else}}
					<div class="user_info" >
						<a href="/login" class="face">
							登录
						</a>
						
					</div>
					{{/if}}
				</div>
			</div>
			<!-- header end -->
			<!--center content start-->
			<div class="mains cl">
				<div class="leftment">
					<div>
						<dl>
							<dt class="f1"><a>图书管理：</a></dt>
							<dd>
								<a class="app" href="/" target="_self">
									<i class="ico b1"></i>
									书籍库
								</a>
							</dd>
							<dd>
								<a class="app" href="/mybook" target="_self">
									<i class="ico b1"></i>
									我的图书
								</a>
							</dd>
							<dd>
								<a class="app" href="/newbook" target="_self">
									<i class="ico b1"></i>
									新增图书
								</a>
							</dd>
							<dt><a>借书管理：</a></dt>
							<dd> 
								<a class="app" href="" target="_self">
									<i class="ico b5"></i>
									借书记录
								</a>
<!--
								<a class="app" href="" target="_self">
									<i class="ico b6"></i>
									职员信息报表
								</a>
								<a class="app" href="" target="_self">
									<i class="ico b7"></i>
									月入职员工统计
								</a>
								<a class="app" href="">
									<i class="ico b9"></i>
									花名册月报表
								</a>-->
							</dd>
						</dl>
					</div>
				</div>
					<div class="right">
						{{{body}}}
					</div>
			</div>
			<!--center content end-->
			
            <!-- footer end -->
        </div>
        <div class="footer">
                Copyright © 2015-2025 博雅互动 (Boyaa Interactive)
            </div>
        
       
    </body>
</html>
<script>
version = 20151221;
var __cdn__ = '/javascripts/';
seajs.config({
	base: __cdn__ + 'app/',
	map: [[/^(.*\jsdev\/.*\.(?:css|js))(?:.*)$/i, '$1?' + version]],
	alias: {
		Msg: __cdn__ + 'comm/Msg.js',
		M: __cdn__ + 'comm/app.dialog.js',
		Tpl: __cdn__ + 'comm/app.Tpl.js',
		replaceVars: __cdn__ + 'comm/fn.replaceVars.js',
		D: __cdn__ + 'app.Calendar.js',
		$D: __cdn__ + 'app.Date.js',
	}
});
seajs.use('common');
</script>