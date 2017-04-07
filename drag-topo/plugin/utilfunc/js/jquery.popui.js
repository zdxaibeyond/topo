// JavaScript Document

;(function($){
	
	/*全局变量*/
	var zIndex = 9900,
	    $document = $(document),
		$window = $(window),
		ie6 = /MSIE 6.0/.test(navigator.userAgent) && ! /MSIE 8.0/.test(navigator.userAgent);
	
	
	/*插件功能，调用*/
	$.extend({
	    popui:function(options){//弹出层展示
		
			options = options == undefined ? $.popui.defaults : options;
            var str = $.extend({}, $.popui.defaults, options);
			str.overlayCss = $.extend({}, $.popui.defaults.overlayCss, options.overlayCss);
			str.popCss = $.extend({}, $.popui.defaults.popCss, options.popCss);
			
			var popLy = $('div.popui_overlay'),
			    popWp = $('div.popui_wrap'),
			    poLength = popLy.length,
				powlength = popWp.length,
				elePcStr = str.popupEle,//弹出层ID
				elePc = $('#'+elePcStr),
				elePcParent = elePc.parent(),
				popPos = str.popupPos,//弹出位置
				popLay = str.overlay,//是否有遮罩层
				autoH = str.autoHide,//自动隐藏
				pch = str.popCss.height,//弹出层样式
				pcw = str.popCss.width,
				popr = str.popRoll,//是否可滚动
				fow = str.follow,//跟随元素
				ete = str.eventEle,//follow,事件元素ID
				elet = $('#'+ete),
				popLt = str.popCss.left,
				popBm = str.popCss.bottom,
				popRt = str.popCss.right,
				popTp = str.popCss.top,
				timeH = isNaN(parseInt(str.timeout)) == true ? 3000 : parseInt(str.timeout),//隐藏时间
				aiTime = isNaN(parseInt(str.animateIn)) == true ? 300 : parseInt(str.animateIn),//动画进入时间
				oZdx,
				elePo,
				elePw;
			
			if(powlength != 0){
				var ifHave = 0;
			    popWp.each(function(i) {
			    	var popWpI = popWp.eq(i),
						idStr = popWpI.children().attr('id');
					if(idStr == elePcStr){
						ifHave = 1;
						var poth = popWpI.attr('popui-wrap-num');
						oZdx = parseInt(popWpI.css('z-index'));
						elePo = $('div.popui_overlay[popui-overlay-num='+poth+']');
						elePw = $('div.popui_wrap[popui-wrap-num='+poth+']');
						return false;
					};
				});
				if(ifHave == 0){
				   createPop(); 
				};
			}else{
			    createPop();
			}
			
			function createPop(){
			    oZdx = poLength == 0 ? zIndex : parseInt(popLy.last().css('z-index'))+2;
				var poStr = '<div class="popui_overlay" popui-overlay-num="'+poLength+'" popup-overlay-popid="'+elePcStr+'"></div>',
					pwStr = '<div class="popui_wrap" popui-wrap-num="'+poLength+'" popup-overlay-popid="'+elePcStr+'"></div>';
				$(poStr).appendTo($('body')).hide();
				$(pwStr).appendTo($('body')).hide();
				$('<input id="popuiOrigin-'+elePcStr+'" type="hidden" />').appendTo(elePcParent);	
				elePo = $('div.popui_overlay[popui-overlay-num='+poLength+']');
				elePw = $('div.popui_wrap[popui-wrap-num='+poLength+']'); 
			}
			
			if(popr == true){
				popupPostion = 'absolute';
			}else if(popr == false){
			    popupPostion = 'fixed';	
			}else{
			    popupPostion = 'fixed';	
			};
			var posin = ie6 == true ? 'absolute' : popupPostion;						

			var winh = parseInt($window.height()),
			    winw = parseInt($window.width()),
				doth = parseInt($document.height()),
				dotw = parseInt($document.width()),
				solt = parseInt($window.scrollTop());
			
			if(elePcStr == 'popupEleId' || elePc.length == 0){//未传入弹出ID提示
				strError('请传入需要弹出的元素ID名称,$.popui({popupEle : "popupEleId"})', 500);
			}else if(fow != true && fow != false){
			    strError('follow为布尔值，请传入true或者false', 300);
			}else if(ete != 'eventEleId' && elet.length == 0){
			    strError('请传入正确的跟随元素，$.popui({eventEle : "eventEleId"})ID，', 450);
			}else{//已传入弹出ID并弹出
				eleBlw = elePc.css('border-left-width') == 'medium' ? 0 : elePc.css('border-left-width');
				eleBrw = elePc.css('border-right-width') == 'medium' ? 0 : elePc.css('border-right-width');
				eleBtw = elePc.css('border-top-width') == 'medium' ? 0 : elePc.css('border-top-width');
				eleBbw = elePc.css('border-bottom-width') == 'medium' ? 0 : elePc.css('border-bottom-width');
				
				if(pch == 'popupWrapHeight'){
					pch = parseInt(elePc.height())+parseInt(elePc.css('padding-top'))+parseInt(elePc.css('padding-bottom'))+parseInt(eleBtw)+parseInt(eleBbw);
				};
				if(pcw == 'popupWrapWidth'){
				    pcw = parseInt(elePc.width())+parseInt(elePc.css('padding-left'))+parseInt(elePc.css('padding-right'))+parseInt(eleBlw)+parseInt(eleBrw);
				};
			    elePc.appendTo(elePw);
				elePc.show();
				//具体展现形式
				popShowWay();
			};
			
			if(popLay == false){//是否展示遮罩层
			   elePo.css({
				   height : 0,
				   width : 0
			   });
			};
			
			if(autoH == true){//是否自动隐藏
				setTimeout(function() { 
				    $.closepop({popupEle : elePcStr});
				}, timeH); 
			};
			
			function popShowWay(){//位置窗口center
			    pch = parseInt(pch);//弹出层样式
				pcw = parseInt(pcw);
				pwStyle(elePw, posin, str.popCss.background, pch, pcw, oZdx+1);
            	poStyle(elePo, doth, dotw, str.overlayCss.background, str.overlayCss.opacity, oZdx);

				if(posin == 'fixed'){//其它浏览器不可滚动
				    if(popPos == 'topleft'){
						posTopleft();
					}else if(popPos == 'bottomleft'){
					    posBottomleft();
					}else if(popPos == 'topright'){
					    posTopright();
					}else if(popPos == 'bottomright'){
					    posBottomright();
					}else{
					    fixedPosCenter(winh, winw, elePw, pch, pcw); 
					};
				}else if(popr != true && posin == 'absolute' && ie6 == true){//ie6不可滚动
				    if(popPos == 'topleft'){
						posTopleft();
					}else if(popPos == 'bottomleft'){
					    posBottomleft();
					}else if(popPos == 'topright'){
					    posTopright();
					}else{
					    absolutePosCenter(winh, winw, solt, elePw, pch, pcw);
						scrollAbsolute(winh, winw, elePw, pch, pcw);
					};
				}else{//可滚动
				    if(fow == true){//跟随元素
					    elePw.attr({
						  'popui-wrap-follow' : 'true',
						  'popui-wrap-follow-btn' : ete
						});
					    followEle(elet, pcw, elePw);
					}else{
					    absolutePosCenter(winh, winw, solt, elePw, pch, pcw);
					};
				};
				
				elePo.fadeIn(aiTime);
				elePw.fadeIn(aiTime);	
			}
			
			function posTopleft(){
				elePw.attr('popui-popupPos-topleft', 'true');
			    elePw.show();
				fixedPosTopleft(elePw, pcw, aiTime, popTp, popLt); 
			}
			
			function posBottomleft(){
				elePw.attr('popui-popupPos-bottomleft', 'true');
			    elePw.show();
				fixedPosBottomleft(elePw, pcw, aiTime, popBm, popLt); 
			}
			
			function posTopright(){
			    elePw.attr('popui-popupPos-topright', 'true');
			    elePw.show();
				fixedPosTopright(elePw, pcw, aiTime, popTp, popRt); 
			}
			
		    function posBottomright(){
			    elePw.attr('popui-popupPos-bottomright', 'true');
			    elePw.show();
				fixedPosBottomright(elePw, pcw, aiTime, popBm, popRt); 
			}
			
			function strError(str, pcew){//没有传入正确数值
			    var noEleTipsStr = '<p id="'+elePcStr+'" style="padding:0 20px;color:#FFF;font-size:14px;line-height:80px;text-align:center;">'+str+'</p>';
				pch = 80;
				pcw = pcew;
			    $(noEleTipsStr).appendTo(elePw);
				//具体展现形式
				popShowWay();
				setTimeout(function() { 
				    elePo.remove();
					elePw.remove();
				}, timeH);
			}
		},
		closepop:function(options){//关闭弹出层

		    options = options == undefined ? $.closepop.defaults : options;
			var str = $.extend({}, $.closepop.defaults, options),
				elePcStr = str.popupEle,//弹出层ID
				elePc = $('#'+elePcStr),
				elePo = $('div.popui_overlay[popup-overlay-popid='+elePcStr+']'),
			    elePw = $('div.popui_wrap[popup-overlay-popid='+elePcStr+']'),
				popuiOrigin = $('#popuiOrigin-'+elePcStr);
			if(elePcStr == 'popupElementId' || elePc.length == 0){
			    alert('请传入需要关闭的元素ID名称$.closepop({popupEle : "popupElementId"})');
			}else{
			    elePc.insertAfter(popuiOrigin).hide();
				popuiOrigin.remove();
				elePw.remove();
				elePo.remove();
			};
		}
	});
	
	$.fn.extend({
	    showpop:function(options){//事件弹出
			var str = $.extend({}, $.fn.showpop.defaults, options);	
			return this.each(function(){
				$this = $(this);
			});
		}
	});
	
	$.popui.defaults = {//默认设置
        popupEle : 'popupEleId',//弹出层ID
		eventEle : 'eventEleId',//跟随元素ID
		popupPos : 'center',    //弹出层位置(topleft, topright, bottomleft, bottomright, center)默认center或其它字符串如popupPos : 'abc'都为center；当popRoll为false时有效
		popRoll : true,         //是否支持滚动，仅位置在中间
		overlay : true,         //是否支持遮罩层
		autoHide : false,       //自动隐藏
		follow : false,         //是否跟随元素，仅popRoll为true时有效
		timeout : 3000,         //自动隐藏时间
		animateIn : 300,        //进入时间
		overlayCss : {          //遮罩层样式
		    background : '#000',
		    opacity : 0.4
		},
		popCss : {              //包围弹出层样式
		    left : '10px',
			bottom : '10px',
			right : '10px',
			top : '10px',
		    background : '#FFF',
		    height : 'popupWrapHeight',
			width : 'popupWrapWidth'
		}
	};
	$.fn.showpop.defaults = $.popui.defaults;
	$.closepop.defaults = {
	    popupEle : 'popupElementId'
	};
	
	
	$window.resize(function(){//窗口改变时，计算位置
		var winh = parseInt($window.height()),
			winw = parseInt($window.width()),
			doth = parseInt($document.height()),
			dotw = parseInt($document.width()),
			solt = parseInt($window.scrollTop()),
			elePo = $('div.popui_overlay'),
			elePw = $('div.popui_wrap');
		elePo.each(function(i) {//遮罩层位置计算
            var elePoI = elePo.eq(i),
			    elePoIH = elePoI.height(),
			    elePoIW = elePoI.width();
			if(elePoIH != 0 || elePoIW != 0){
			    elePoI.css({
					height : doth,
					width : dotw
				}); 	
			};
        });
		
		elePw.each(function(i){//弹出层位置计算
            var elePwI = elePw.eq(i),
			    elePwIH = elePwI.height(),
			    elePwIW = elePwI.width(),
				elePwIPos = elePwI.css('position'),
				elePwFw = elePw.attr('popui-wrap-follow'),
				posLeft = elePw.attr('popui-popuppos-topleft'),
				posLeftB = elePw.attr('popui-popuppos-bottomleft'),
				posRight = elePw.attr('popui-popuppos-topright'),
				posRightB = elePw.attr('popui-popuppos-bottomright');
			if(elePwIPos == 'fixed'){
				if(posLeft == 'true'){
				    elePwI.css({
					    left : '10px',
						top : '10px'  
				    }); 	
				}else if(posLeftB == 'true'){
				    elePwI.css({
					    left : '10px',
						bottom : '10px'  
				    });
				}else if(posRight == 'true'){
				    elePwI.css({
					    right : '10px',
						top : '10px'  
				    });
				}else if(posRightB == 'true'){
				    elePwI.css({
					    right : '10px',
						bottom : '10px'  
				    });
				}else{
				    fixedPosCenter(winh, winw, elePwI, elePwIH, elePwIW);
				};
			}else if(elePwIPos == 'absolute'){
				if(elePwFw == 'true'){
					var elePwFwBtn = $('#' + elePwI.attr('popui-wrap-follow-btn'));
				    followEle(elePwFwBtn, elePwIW, elePwI);
				}else{
				    absolutePosCenter(winh, winw, solt, elePwI, elePwIH, elePwIW);
				};
			};
        });
		
	});
	
	/*私有函数，具体方法*/
	function followEle(elet, pcw, elePw){
		var ww = $(window).width();
		    ot = parseInt(elet.offset().top),
			ol = parseInt(elet.offset().left),
			tw = parseInt(elet.width()),
			th = parseInt(elet.height()),
			pt = parseInt(elet.css('padding-top')),
			pb = parseInt(elet.css('padding-bottom')),
			pl = parseInt(elet.css('padding-left')),
			pr = parseInt(elet.css('padding-right')),
			bt = elet.css('border-top-width') == 'medium' ? 0 : parseInt(elet.css('border-top-width')),
			bb = elet.css('border-bottom-width') == 'medium' ? 0 : parseInt(elet.css('border-bottom-width')),
			bl = elet.css('border-left-width') == 'medium' ? 0 : parseInt(elet.css('border-left-width')),
			br = elet.css('border-right-width') == 'medium' ? 0 : parseInt(elet.css('border-right-width'));
		
		allW = bl + pl + tw + pr + br;
		if(ww - ol - allW >= pcw - allW ){
		    elePw.css({
			  left : ol,
			  top : ot + bt + pt + th + pb + bb
		    });
		}else{
		    elePw.css({
			  left : ol + allW - pcw,
			  top : ot + bt + pt + th + pb + bb
		    });
		}
	}
	
	
	function fixedPosBottomright(elePw, pcw, aiTime, popBm, popRt){
	    eRight = -pcw;
		elePw.css({
			left : '',
			top : '',
		    bottom : popBm,
			right : eRight
		});
	    elePw.animate({
			right : popRt	
		}, aiTime);
	}
	
	
	function fixedPosTopright(elePw, pcw, aiTime, popTp, popRt){
	    eright = -pcw;
		elePw.css({
			bottom : '',
			left : '',
		    top : popTp,
			right : eright
		});
	    elePw.animate({
			right : popRt	
		}, aiTime);
	}
	
	function fixedPosBottomleft(elePw, pcw, aiTime, popBm, popLt){
	    eLeft = -pcw;
		elePw.css({
			right : '',
			top : '',
		    bottom : popBm,
			left : eLeft
		});
	    elePw.animate({
			left : popLt	
		}, aiTime);
	}
	
	function fixedPosTopleft(elePw, pcw, aiTime, popTp, popLt){
	    eLeft = -pcw;
		elePw.css({
			bottom : '',
			right : '',
		    top : popTp,
			left : eLeft
		});
	    elePw.animate({
			left : popLt	
		}, aiTime);
	}
	
	function fixedPosCenter(winh, winw, elePw, pch, pcw){//position:fixed位置计算
	    eLeft = (winw - pcw) / 2;
		eTop = pch >= winh ? 40 : (winh - pch) / 2;
	    elePw.css({
		    left : eLeft,
			top : eTop	
		});
	}
			
	function scrollAbsolute(winh, winw, elePw, pch, pcw){//不可滚动处理
        $window.scroll(function(){
			solt = $window.scrollTop();
			absolutePosCenter(winh, winw, solt, elePw, pch, pcw);
		});
	}
	
	function absolutePosCenter(winh, winw, solt, elePw, pch, pcw){//position:absolute位置计算
	    eLeft = (winw - pcw) / 2;
	    eTop = pch >= winh ? solt+40 : solt + (winh - pch) / 2;
		elePw.css({
		    left : eLeft,
			top : eTop	
		});
	}
	
	function poStyle(ele, dh ,dw, bgor, opty , zdx){//遮罩层样式
	    ele.css({
			position : 'absolute',
			left : 0,
			top : 0,
			background : bgor,
			height : dh,
			opacity : opty,
			overflow : 'hidden',
			width : dw,
			zIndex : zdx
		});
	}	
	
	function pwStyle(ele, posn, bgor, puh, puw, zdex){//弹出层，包裹div样式
	    ele.css({
	        position : posn,
			background : bgor,
			height : puh,
			width : puw,
			overflow : 'hidden',
			zIndex : zdex
		});
	}
	/*$.popui = function(options){
		var str = $.extend({}, $.popui.defaults, options);	
		return this.each(function(){
			$this = $(this);
		});
	};
	$.fn.popui = function(){};
	$.fn.closepop = function(){};*/
	
})(jQuery);
