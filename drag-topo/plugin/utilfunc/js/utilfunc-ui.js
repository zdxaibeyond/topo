// JavaScript Document


//通用全局方法
;(function($){
    $.extend({
		
		//确认提示框
		confirmInfo:function(options){
			
			var opts = $.extend({
				   title : '确认信息',
				   text : '确认要删除吗？',
				   sure : function(){},
				   cancel : function(){}
				}, options);
			//alert('a');
			var str = '<div class="confirmpop" id="confirmPop"><div class="confirm_title clearfix"><h3>'+opts.title+'</h3><a id="confirmPopClose">×</a></div><div class="confirm_con"><p>'+opts.text+'</p><div class="confirmbtn_Wrap"><a id="confirmSureBtn">确认</a><a id="confirmCancelBtn">取消</a></div></div></div>';
			 
			$(str).appendTo('body');
			var cp = $('#confirmPop'),
				cpc = $('#confirmPopClose'),
				cpsb = $('#confirmSureBtn'),
				spcb = $('#confirmCancelBtn');
			cpc.click(function(){
			   confirmPopDel();
			});
			cpsb.click(function(){
			    confirmPopDel();
				opts.sure();
			});
			spcb.click(function(){
			    confirmPopDel();
				opts.cancel();
			});
			function confirmPopDel(){
				$.closePop('confirmPop');
				cp.remove();
			};
			
			$.popupEle('confirmPop');
			cp.show();
		},
		
		//弹出提示信息
		popupTips:function(words){
			var tipsClass = $('div.popup_tips_div');
			if(tipsClass.length != 0){
			    tipsClass.remove();
			};
			$('<div class="popup_tips_div" id="popupTipsDiv">'+words+'</div>').appendTo('body');
			var tipsId = $('#popupTipsDiv');
			tipsId.css({
				padding : '20px 40px',
				//background : 'url(images/opacity-bg.png) repeat',
				borderRadius : '5px',
				color : '#FFF',
				display : 'none',
				font : '16px "微软雅黑"',
				lineHeight : '24px'
			});
			tipsHeight = parseInt(tipsId.height()) + 40;
			tipsWidth = parseInt(tipsId.width()) + 80;
			$.popui({
				popupEle : 'popupTipsDiv',
				popRoll : false,
				overlay : false,
				autoHide : true,
				timeout : 2000,
				popCss : {
					 background : 'none',
					 height : tipsHeight,
					 width : tipsWidth
				}
			});
			var timer = setTimeout(function(){
				tipsId.remove();
			},2050);
		},
		
		
		//iframe弹出
	    iframePop:function(url, iheight, iwidth){
			var iframeStr ='<div class="iframe_wrap" id="iframeWrap"><a class="iframe_wrap_close" id="iframeWrapClose"></a><div class="iframe_wrap_con"><iframe src="'+url+'" id="iframeCon" frameborder="0" scrolling="auto"></iframe></div></div>'
			$(iframeStr).appendTo($('body'));
			$('#iframeWrap').css({
			    height : iheight + 10,
				width : iwidth + 10
			});
			$('#iframeCon').attr({
			    height : iheight,
				width : iwidth
			});
			$.popui({
				popupEle : 'iframeWrap',
				overlay : true,
				popRoll : false,
				overlayCss : {
					background : '#000',
					opacity : 0.6
				},
				popCss : {
					background : 'none'
				}
			});
			$('#iframeWrapClose').click(function(){
			    $.closepop({popupEle : 'iframeWrap'});
				$('#iframeWrap').remove();
			});
		}
	});
})(jQuery);

//input输入inputval
//<div class="input_wrap">
//	<input type="text" />
//	<span>请输入</span> 
//</div>
//$('element').inputval({
//	height: 45,    
//	width: 599
//});
(function($) {    
	$.fn.inputval = function(options) {    
		var opts = $.extend({}, $.fn.inputval.defaults, options);    
		return this.each(function() {    
			var $this = $(this),
			    span = $this.children('span'),
		        input = $this.children('input');
			
			$this.css({
			    height : opts.height,
				width : opts.width
			});
			iscss(span);
			iscss(input);
			function iscss(ele){
			    ele.css({
					height : opts.height,
					width : opts.width - 10,
					lineHeight : opts.height + 'px'
				});
			}
			inputfunc(span, input);
		});    
	};
	
	$.fn.inputval.defaults = {    
		height: 24,    
		width: 300
	};
	
})(jQuery); 


//textarea_wrap输入框
//<div class="textarea_wrap">
//	<textarea></textarea>
//	<span>请输入</span>
//</div>
//$('element').textareaval({
//	height: 100,    
//	width: 400
//});
(function($) {    
	$.fn.textareaval = function(options) {    
		var opts = $.extend({}, $.fn.textareaval.defaults, options);    
		return this.each(function() {    
			var $this = $(this),
			    span = $this.children('span'),
		        textarea = $this.children('textarea');
			
			$this.css({
			    height : opts.height,
				width : opts.width
			});
			textarea.css({
				height : opts.height - 10,
				width : opts.width - 10,
				maxHeight : opts.height - 10,
				maxWidth : opts.width - 10
			});
			span.css({
				width : opts.width - 10
			});
			inputfunc(span, textarea);
		});    
	};
	$.fn.textareaval.defaults = {
		height: 24,    
		width: 300
	};
})(jQuery); 


function inputfunc(span, ele){
	var eleVal = ele.val();
	if(eleVal != ''){
	    ele.show();
		span.hide();
	};
	ele.focus(function(){
		span.hide();
	});
	ele.blur(function(){
		var thisVal = $(this).val();
		if(thisVal == ''){
			span.show();
		}else{
			span.hide();
		}
	});
	span.click(function(){
		span.hide();
		ele.focus();
	});  
}


//下拉选择dropdown
//<div class="dropdown">
//	<input readonly type="text" value="请选择" />
//	<div class="dropdowncon"></div>
//</div>
//$('element').pulldown({
//	height: 45,    
//	width: 288
//});
(function($) {    
	$.fn.pulldown = function(options) {    
		var opts = $.extend({}, $.fn.pulldown.defaults, options);    
		return this.each(function() {    
			var $this = $(this),
			    input = $this.children('input'),
		        dropdowncon = $this.children('div.dropdowncon');
			
			$this.css({
			    height : opts.height,
				width : opts.width
			});
			input.css({
				height : opts.height,
				width : opts.width - 25,
				lineHeight : opts.height + 'px'
			});
			dropdowncon.css({
				top : opts.height,
				width : opts.width - 10
			});
			pulldownfunc(input, dropdowncon);
		});    
	};
	
	$.fn.pulldown.defaults = {    
		height: 24,    
		width: 300    
	};
	
	
})(jQuery); 

function pulldownfunc(input, dropdowncon){
    input.focus(function(){
		$('div.dropdowncon').each(function(i){
			var $this = $(this);
		    if($this.css('display') == 'block'){
			    $this.slideUp(200);
			}
		});
		dropdowncon.slideDown(200);
		
	});
	input.click(function(){
	    return false;
	});
	dropdowncon.click(function(){
	    return false;
	});
}

//点击任何地方收起
$(function(){
    $('body').click(function(){
		$('div.dropdowncon').slideUp(200);
	});
});