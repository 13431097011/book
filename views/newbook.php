<script src="javascripts/kindeditor/kindeditor-min.js"></script>
<script src="javascripts/kindeditor/lang/zh_CN.js"></script>
<style>
    span.tag { color:#4c536a;border-radius:3px;-moz-border-radius: 2px;-webkit-border-radius: 2px;display: block;padding: 5px;text-decoration: none;background: #cde69c; margin-right: 5px;margin-bottom: 5px;font-size: 13px; line-height: 18px;}
    span.tag a{text-decoration: none;}

    .pbtab,.pbitab{border-collapse: collapse; width: 100%; font-size: 14px; color:#4c536a;}
    .pbtab th,.pbtab td{border:1px solid #C3CBE3; padding:10px 20px;}
    .pbtab th{background:#eceef5;}
    .pbtab td{background:#FFF;border-bottom-style:dashed;border-top-style:dashed;}
    .pbitab{border:1px solid #c3cbe3; background: #FFF; }
    .pbitab td{border-style:dashed; border-width: 0 1px 0 1px; border-color: #c3cbe3; padding:5px 20px;}
    .pbtab .ipt-group{height:34px;}
    .w200{width:300px;}
    
</style>

<div class="clock">
    <div class="oneTab cl">
        <h3>新增图书</h3>
    </div>
    <div>
        <form method="post" action="" id='newpersonForm'>
            <table class="pbtab entryform" >

                <tr>
                    <td>图书标题：<input class="ipt-group ui-autocomplete-input ic" style="width:300px" type="text" value="{{book.title}}" name='title'></td>
                    
                </tr>
                <tr>
                    <td>作者：<input class="ipt-group ui-autocomplete-input ic" type="text" value="{{book.autor}}" name='autor'></td>
                   
                </tr>
				<tr>
                    <td>摘要：
						<textarea id="reads" name="reads" style="width:909px;height: 400px">{{book.reads}}</textarea>
					
					</td>
                   
                </tr>
				<tr>
                    <td>让不让借：
						<label>让<input name="status" type="radio" value="0" {{#eq book.status 0}} checked="checked" {{/eq}}></label>
						<label>不让<input name="status" type="radio" value="2" {{#eq book.status 2}} checked="checked" {{/eq}}></label>
						<input type="hidden" name="_id" value="{{book._id}}">
					</td>
                   
                </tr>
				
               
            </table>
            <div class="handle operform tc p20">
                <a href="javascript:void(0);" class="btnn green h40 approving_submit submit">保存</a>&nbsp;&nbsp;&nbsp;&nbsp;<a href="javascript:void(0);" class="btnn gray h40 cancel">重置</a>
            </div>
        </form>
    </div>
    <!--弹层-->
    <div class="tc" style="display: none">
        <h3>添加成功！新员工张天师的工号为：<span>1189</span></h3>
        <p>邮箱：<span>alexWang@boyaa.com</span> 开通成功！
        <p>RTX账号：<span>alexWang</span> 开通成功！</p>
        <p>域账号：<span>alexWang</span> 开通成功！</p>
        <p>OA账号：<span>alexWang</span> 开通成功！</p>
    </div>
</div>
<script>
	
	
	var editor;
	KindEditor.ready(function(K){
		var option = {
			allowImageUpload :false,
			items:['fontname','fontsize','forecolor','hilitecolor','bold','italic','underline','removeformat','|','justifyleft','justifycenter','justifyright',
				'insertorderedlist','insertunorderedlist','|','emoticons','image','link'
			]
		};
		editor = K.create('#reads',option);
	});
	
	
	$("a.submit").click(function(){
		editor.sync('#reads');
		$("#newpersonForm").submit();
	});
</script>