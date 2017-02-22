// JavaScript Document

;(function($){
	$.extend({
		
		//位置在中间弹出框不可滚动
	    popupEle:function(popEleId){
			$.popui({
				popupEle : popEleId,
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
		},
		
		//位置在中间弹出框不可滚动无遮罩
	    popupEleNoMask:function(popEleId){
			$.popui({
				popupEle : popEleId,
				overlay : false,
				popRoll : false,
				popCss : {
					background : 'none'
				}
		    });
		},
		
		//位置在中间弹出框可滚动
	    popupEleRoll:function(popEleId){
			$.popui({
				popupEle : popEleId,
				overlay : true,
				popRoll : true,
			    overlayCss : {
				    background : '#000',
					opacity : 0.6
				},
				popCss : {
					background : 'none'
				}
		    });
		},
		
		//能指定位置弹出框： 可传递位置：topleft, topright, bottomleft, bottomright ; 下面参数与上边对应：left, right, top, bottom
		popupPos:function(options){
			var defaults = {
				eleId : 'eleId',
				postion : 'topleft',
			    left : '10px',
				right : '10px',
				top : '10px',
				bottom : '10px',
				height : '80px',
				width : '200px'
			};
			var opts = $.extend(defaults, options); 
		    $.popui({
				popupEle : opts.eleId,
				popupPos : opts.postion,
				overlay : false,
				popRoll : false,
				popCss : {
					left : opts.left,
					right : opts.right,
					top : opts.top,
					bottom : opts.bottom,
					background : 'none',
					height : opts.height,
					width : opts.width
				}
		    });
			var popId = $('#'+opts.eleId);
			var pt = parseInt(popId.css('padding-top')),
				pb = parseInt(popId.css('padding-bottom')),
				pl = parseInt(popId.css('padding-left')),
				pr = parseInt(popId.css('padding-right')),
				bt = popId.css('border-top-width') == 'medium' ? 0 : parseInt(popId.css('border-top-width')),
				bb = popId.css('border-bottom-width') == 'medium' ? 0 : parseInt(popId.css('border-bottom-width')),
				bl = popId.css('border-left-width') == 'medium' ? 0 : parseInt(popId.css('border-left-width')),
				br = popId.css('border-right-width') == 'medium' ? 0 : parseInt(popId.css('border-right-width'));
			popId.css({
			    height : opts.height - bt - pt - pb - bb,
				width : opts.width - bl - pl - pr - br
			});
		},
		
		//右下角弹出框
		popupBottomRight:function(popEleId, eleH, eleW){
		    $.popui({
				popupEle : popEleId,
				popupPos : 'bottomright',
				overlay : false,
				popRoll : false,
				popCss : {
					background : 'none',
					height : eleH,
					width : eleW
				}
		    });
			var popId = $('#'+popEleId);
			var pt = parseInt(popId.css('padding-top')),
				pb = parseInt(popId.css('padding-bottom')),
				pl = parseInt(popId.css('padding-left')),
				pr = parseInt(popId.css('padding-right')),
				bt = popId.css('border-top-width') == 'medium' ? 0 : parseInt(popId.css('border-top-width')),
				bb = popId.css('border-bottom-width') == 'medium' ? 0 : parseInt(popId.css('border-bottom-width')),
				bl = popId.css('border-left-width') == 'medium' ? 0 : parseInt(popId.css('border-left-width')),
				br = popId.css('border-right-width') == 'medium' ? 0 : parseInt(popId.css('border-right-width'));
			popId.css({
			    height : eleH - bt - pt - pb - bb,
				width : eleW - bl - pl - pr - br
			});
		},
		
		//关闭弹出框
		closePop:function(ele){
		    $.closepop({popupEle : ele});
		},
		
		//跟随元素弹出
		followEle:function(eventEleId, popupEleId){
		    $.popui({
				popupEle : popupEleId,
		        eventEle : eventEleId,
				popRoll : true,
				overlay : false,
				follow : true,
				popCss : {
					background : 'none'
				}
		    });
		},
			
		//滚动到顶部
		scrollTop:function(){
		    $('body,html').animate({scrollTop:0},1000);
		},
		
		//滚动到底部
		scrollBottom:function(){
		   $('body,html').animate({scrollTop:$(document).height()},1000); 
		},
		
		//滚动到固定位置
		scrollPos:function(eleId){
		    $("html,body").stop(true);
			$("html,body").animate({scrollTop: $("#" + eleId).offset().top}, 600);
		},
		
		
				
		//获取焦点
		inputFocus:function(ele){
			ele.focus(function(){
				if($(this).val() ==this.defaultValue){$(this).val("");}
			}).blur(function(){
				if ($(this).val()==''){$(this).val(this.defaultValue);}
			});
		},
		
		//点击滚动到顶部
		clickToTop:function(eleId){
			var backtop = $('#' + eleId),
			    bt = backtop.css('border-top-width') == 'medium' ? 0 : parseInt(backtop.css('border-top-width')),
				bb = backtop.css('border-bottom-width') == 'medium' ? 0 : parseInt(backtop.css('border-bottom-width')),
			    bth = parseInt(backtop.height()) + bt + parseInt(backtop.css('padding-top')) + parseInt(backtop.css('padding-bottom')) + bb;
			backtop.hide();
			$(window).scroll(function(){
				var bm = $(window).height()-backtop.height()-10;
				if($(window).scrollTop()<100){
					backtop.fadeOut(1000);
				}else{
					topAndBottom.fadeIn(1000);
					var st = $(document).scrollTop();
					backtop.css('top',bm+st);
				};
			});
			backtop.click(function(){
				$.scrollTop();
			});
		},
		
		//tab切换
		tabs:function(btnWrapId, focusClass, tabIdStr, tabClass){
			var btn = $('#'+btnWrapId).children(),
			    ele = $('.'+tabClass);
		    btn.each(function(i){
				$(this).click(function(){
					$this = $(this);
				    var focusNum = $this.attr('focus-str');
					btn.removeClass(focusClass);
					$this.addClass(focusClass);
					ele.hide();
					$('#'+tabIdStr+focusNum).show();
				});
			});
		},
		
		//图片切换
		//$.imgswitch({
		//    imgClass : 'ob_pic',
		//    imgId : 'obPic',
		//    wrapid : 'obCon',
		//    fadeTime : 3000,
		//    btnEle : $('#obBtn').children('span'),
		//    btnId : 'obPicBtn',
		//    focusClass : 'focus',
		//    event : 'click'
		//});
		//<div class="ob_con" id="obCon">
		//    <div class="ob_pic_wrap">
		//        <a class="ob_pic" id="obPic0" href="url"></a>
		//        <a class="ob_pic" id="obPic1" href="url"></a>
		//        <a class="ob_pic" id="obPic2" href="url"></a>
		//        <a class="ob_pic" id="obPic3" href="url"></a>
		//    </div>
		//    <div class="ob_btn" id="obBtn">
		//        <span class="focus" id="obPicBtn0" imgswitch="0">1</span>
		//        <span id="obPicBtn1" imgswitch="1">2</span>
		//        <span id="obPicBtn2" imgswitch="2">3</span>
		//        <span id="obPicBtn3" imgswitch="3">4</span>
		//    </div>
		//</div>
		imgswitch:function(options){
		    var defaults = {
				imgClass : '',
				imgId : '',
				wrapid : '',
				fadeTime : 3000,
				btnEle : '',
				btnId : '',
				focusClass : '',
				event : ''
			};
			var opts = $.extend(defaults, options);
			
			var imgClass = opts.imgClass,
			    imgId = opts.imgId,
				wrapid = opts.wrapid,
				fadeTime = opts.fadeTime,
				btnEle = opts.btnEle,
				btnId = opts.btnId,
				focusClass = opts.focusClass,
				event = opts.event;
			
			var num = 0,
			    imc = $('.' + imgClass),
				imcL = imc.length;
			
			var timer = setInterval(imgTab, fadeTime);
			function imgTab(){
				num ++;
			    if(num == imcL){
				    num = 0;
				}
				imc.hide();
				$('#' + imgId + num).show();
				btnEle.removeClass(focusClass);
				$('#' + btnId + num).addClass(focusClass);
			}
			
			$('#' + wrapid).hover(function(){
			    clearInterval(timer);
			}, function(){
			    timer = setInterval(imgTab, fadeTime);
			});
			
			btnEle.on(event, function(){
			    var $this = $(this),
				    iw = $this.attr('imgswitch');
				num = iw;
				imc.hide();
				$('#' + imgId + iw).show();
				btnEle.removeClass(focusClass);
				$this.addClass(focusClass);
			});
		}
		
	});
})(jQuery);