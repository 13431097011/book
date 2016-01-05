<div class="clock">
		    <div class="oneTab cl">
		    	<h3>{{title}}</h3>
		    </div>
		    <div class="set_time form_normal_audited">
		        <div class="base">
		            <span class="find_box">
						<form id='searchfrom' method='get'>
		                 <input id="search_cname" class="txt_ipt ic ico_find ui-autocomplete-input" type="text" name="search[keyword]" placeholder="书名"/>
						 <button type="button" class="btn_search"></button>
						 <input type='hidden' name='search[_id]' value=''>
						</from>
		            </span>
		        </div>
		        <div class="set_pages">
		             <div class="tc pages">
						 {{#if page.prev}}
						<a href="?p={{page.prev}}" class="prev nopage"><</a>
						{{/if}}
						{{#each page.pages}}
							{{#if this.on}}
							<a href="javascript:void()" class="on">{{this.p}}</a>
							{{else}}
							<a href="?p={{this.p}}">{{this.p}}</a>
							{{/if}}
						{{/each}}
						
						{{#if page.next}}
						<a href="?p={{page.next}}" class="next">></a>
						{{/if}}
		             </div>
		        </div>

		    </div>
			<div class="tpl">
				<div class="personnel cl">
					<div class="fl">
					<label class="check_alls"><input id="check_alls" type="checkbox" value="">全选</label>
					<span class="person_btn">
						<a href="javascript:;" class="btnn gray h24" id="batchdel">批量删除</a>
					</span>
					</div>
				    <div class="fr">
				         <a href="javascript:;" class="btnn gray h24" id="addrole">新增</a> 
				    </div>
				</div>
			</div>			
		</div>

		<div class=" wpn resizable">
			<div>
				<div class="clock_list tc boxscroll-x">                                   
				<table>
					<thead>
						<tr>
							<td width="80">选择</td>
							<td width="160"><a  name="" href="javascript:;">书名</a></td>
							<td width="160"><a class="" name="" href="javascript:;">作者</a></td>
							<td width="100"><a class="" name="" href="javascript:;">拥有人</a></td>
							<td width="250"><a class="" name="sort####edate" href="javascript:;">状态</a></td>
							<td width="250"><a class="" name="sort####edate" href="javascript:;">借出次数</a></td>
							<td width="100"><a class="" name="" href="javascript:;">创建时间</a></td>
							{{#if cando}}
							<td width=""><a class="" name="" href="javascript:;">操作</a></td>
							{{/if}}
						</tr>
					</thead>
					<tbody id="udata">
						{{#each lists}}
						<tr >
							<td><label class="check"><input type="checkbox" name="checkid[]" value="{{this._id}}" {{#eq this.mid ../user.mid}} cancheck='1'  {{/eq}}></label></td>
							<td><a href="/content/{{this._id}}">{{this.title}}</a></td>				
							<td>{{this.autor}}</td>
							<td id="isdel"><font color="blue">{{this.cname}}</font></td>
							<td>{{{this.statustxt}}}</td>
							<td>{{this.bollowcount}}</td>
							<td>{{this.createTime.minute}} {{cando}}</td>
							{{#if ../cando}}
							<td>
								{{#if canborrow}}
								<a href="javascript:;"  class="btnn gray h24 lDisabled" data-id='{{this._id}}'>借书</a>
								{{/if}}
								{{#if canreback}}
								<a href="javascript:;"   class="btnn gray h24 lEnable" data-id='{{this._id}}'>对方归还</a>
								{{/if}}
								{{#if canedit}}
								<a href="/newbook?id={{this._id}}"   class="btnn gray h24 lEdit" data-id='{{this._id}}'>编辑</a>
								<a href="javascript:;"   class="btnn gray h24 ldelete" data-id='{{this._id}}'>删除</a>
								{{/if}}
							</td>
							{{/if}}
						</tr>
						{{/each}}
					</tbody>
				</table>
				</div>
			</div>
		</div>
<script>
$(function(){
    seajs.use('index',function(I){
		I.init();
	});
});
</script>   
