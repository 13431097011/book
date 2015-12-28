define(function(require){
	var I ={
		init:function(){
			
			$("a.lDisabled").click(function(){
				var id = $(this).attr('data-id');
				$.post("/borrow",{id:id},function(d){
					if(d.err!=''){
						M.tips(d.err);
					}else{
						M.tips('恭喜你，借书成功！记得还书哦',{close:function(){
							window.location.reload();	
						}});
					}
				},'json');
			});
			$("a.lEnable").click(function(){
				var id = $(this).attr('data-id');
				$.post("/reback",{id:id},function(d){
					if(d.err!=''){
						M.tips(d.err);
					}else{
						M.tips('恭喜你，还书成功',{close:function(){
							window.location.reload();		
						}});
					}
				},'json');
			});
			$("#check_alls").click(function(){
				if($(this).parent().hasClass('ed')){
					$(this).parent().removeClass('ed');
					$(this).removeAttr('checked');
					$("input[name='checkid[]']").each(function(){
						 $(this).removeAttr('checked');
						 $(this).parent().removeClass('ed');
					 });
				}else{
					$(this).parent().addClass('ed');
					$(this).attr('checked','checked');
					
					$("input[name='checkid[]']").each(function(){
						 var cancheck = $(this).attr('cancheck');
						 if(cancheck){
							$(this).attr('checked','checked');
							$(this).parent().addClass('ed');
						}
					 });
				};
			});
			$(".ldelete").click(function(){
				var id = $(this).attr('data-id');
				M.confirm('确定要删除这条信息吗？',function(){
					$.post('/del',{id:id},function(d){
						if(d.err){
							M.tips(d.err,{close:function(){
								window.location.reload();		
							}});

						}else{
							M.tips('删除成功！',{close:function(){
								window.location.reload();	
							}});

						}
					},'json');
				});
			});
			$("#addrole").click(function(){
				window.location = "/newbook";
			});
		}
	};
	return I;
	
});
