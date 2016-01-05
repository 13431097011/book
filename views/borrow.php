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
				
			</div>			
		</div>

		<div class=" wpn resizable">
			<div>
				<div class="clock_list tc boxscroll-x">                                   
				<table>
					<thead>
						<tr>
							
							<td width="160"><a  name="" href="javascript:;">书名</a></td>
							<td width="160"><a class="" name="" href="javascript:;">拥有人</a></td>
							<td width="250"><a class="" name="sort####edate" href="javascript:;">借书状态</a></td>
							<td width="250"><a class="" name="sort####edate" href="javascript:;">借书时间</a></td>
							<td width="100"><a class="" name="" href="javascript:;">还书时间</a></td>
						</tr>
					</thead>
					<tbody id="udata">
						{{#each lists}}
						<tr >
							<td><a href="/content/{{this.bid}}">{{this.booktitle}}</a></td>				
							<td>{{this.bookmidCname}}</td>
							<td id="isdel"><font color="blue">{{this.statusTXT}}</font></td>
							<td>{{this.createTime.minute}}</td>
							<td>{{this.returnTime.minute}}</td>
							
						</tr>
						{{/each}}
					</tbody>
				</table>
				</div>
			</div>
		</div>
<script>
$(function(){
    seajs.use('borrow',function(I){
		I.init();
	});
});
</script> 
