// JavaScript Document
$(function(){
	
	//-------------------编辑(start)-------------------
	var topocontent = $('#topocontent'),
		lefticon = $('#lefticon div'),
		linewrap = $('#linewrap');

	//缩放	
     
	//连接样式
	var lineColorArr = ['#2f8e00'],
	    relationArr = [ '连接'],
	    instance = jsPlumb.getInstance({
			Endpoint : ["Dot", {radius:2}],
			ConnectionOverlays : [
				[ "Arrow", {location: 1, id:"arrow", length:10, foldback:0.8, width: 10} ],
				[ "Label", { label:"关系", id:"label", cssClass:"labelstyle" }]
			],
			DragOptions : { zIndex:2000 },
			Container:"topocontent"
		});
	window.jsp = instance;
	var labelTxt = relationArr[0],
	    lineColor = lineColorArr[0],
	    pstyle = {
			Endpoint: ["Dot", { radius: 2 }],
			paintStyle: {
				strokeStyle: lineColor,
				fillStyle: lineColor
			},
			connector: ["Flowchart", {stub: [0, 0], gap: 2, cornerRadius: 5, alwaysRespectStubs: true }],
			connectorStyle: {
				lineWidth: 1,
				strokeStyle: lineColor
			},
			maxConnections: 1
		},
		pstyle1 = {
			Endpoint: ["Dot green", { radius: 2 }],
			paintStyle: {
				strokeStyle: lineColor,
				fillStyle: lineColor
			},
			connector: ["Flowchart", {stub: [0, 0], gap: 2, cornerRadius: 5, alwaysRespectStubs: true }],
			connectorStyle: {
				lineWidth: 1,
				strokeStyle: lineColor
			},
			maxConnections: 6
		};
	
	//加载已有数据
	topocontent.load('json/connection.json', function(response, status){
	    if(status == "success"){
			$.closePop('loadingPop');
			editData(response);
		}else{
		    $.popupEle('loadingPop');
		}
	});
	function editData(response){
	    var list = eval(response.split('&')[0]),
			blocks = eval(response.split('&')[1]),
			htmlText = "",
			conn = "";
		//------------插入元素-------------
		for( var i in blocks){
			var viewstyle = 'left:'+blocks[i].BlockX+'px;top:'+blocks[i].BlockY+'px;',
				viewid = blocks[i].BlockId,
				viewClass = blocks[i].BlockClass,
				viewsrc = blocks[i].BlockImg,
				viewTxt = blocks[i].BlockText;
			htmlText = htmlText + '<div class="elebox '+viewClass+'" id='+viewid+' style='+viewstyle+'><img src='+viewsrc+'><span class="dragPoint">'+viewTxt+'</span></div>';
		};
		topocontent.html(htmlText);
		
		//------------默认连接-------------
		var windowsDrag = jsPlumb.getSelector("#topocontent .elebox");
		renderConnect(windowsDrag);
		//------------更改样式-------------
		for( var i in list){
			var conor = instance.connect({ source: list[i].PageSourceId, target:list[i].PageTargetId});
			conor.getOverlay("label").setLabel(list[i].connectionLabel);
			conor.setPaintStyle({fillStyle : list[i].lineColor, strokeStyle: list[i].lineColor});
			conor.bind('click',function(){
				detachLine(this);
			});
		};
		$("div.elebox").draggable({ containment: "parent" });
	}
	
	//自定义鼠标事件
	var rightkeyPop = $('#rightkeyPop'),
		relationWrap = $('#relationWrap'),
		relevanceBox = $('#relevanceBox'),
	    delEle = $('#delEle');
	

	linewrap.find('span').each(function(i) {//点解切换关系
		var $this = $(this);
		$this.click(function(){
			linewrap.find('span').removeClass('focus');
			$this.addClass('focus');
			labelTxt = relationArr[i];
			lineColor = lineColorArr[i];
		});
	});
	$(document).on("contextmenu", function() { return false; }); 
	$(document).on('mousedown', '#topocontent div.elebox', function(event){
        if(event.which == 3){
		    var $this = $(this),
			    event = event || window.event,
			    oLeft = parseInt(event.clientX),
				oTop = parseInt(event.clientY),
				span = $this.children('span'),
				idStr = $this.attr('id');
			rightkeyPop.css({left : oLeft, top : oTop, zIndex : 2999}).attr('rightkey_click_id', idStr).show();
		}
	});
	$(document).on('mouseout', '#topocontent div.elebox', function(){
		rightkeyPop.hide();
	});
	$(document).on('mouseover', '#topocontent div.elebox ', function(){
		 return false;
	});
   // tips
   /* $('#topocontent').on('mouseover', 'div.elebox',function(event){
    	  var spanText=$(this).children('span').html();
		  var that = this; 
              layer.tips(spanText, that,{
		      	tips:[2,"#000"],
		  	    time: 2000 
		     });
		  
	});
*/
    // menu 收缩
     $('#lefticon').on('click', 'h3',function(event){
            $(this).next("div").slideToggle(500);
    	    
	});
     
     function cloudSave(id,idtitel){
     	   var idx=idtitel.text();
     	   var input=$('.cloud-hosting').children("input");
     	   var textarea=$('.cloud-hosting').children("textarea"); 
     	   input.eq(0).val(idx);
           $(document).on('click','#cloudSave',function(){
           	 var exp=/^(254|252|248|240|224|192|128|0)\.0\.0\.0|255\.(254|252|248|240|224|192|128|0)\.0\.0|255\.255\.(254|252|248|240|224|192|128|0)\.0|255\.255\.255\.(254|252|248|240|224|192|128|0)$/;  
           	 var reg =  /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/ ;
           	 var ipReg=input.eq(1).val();
           	 var zReg=input.eq(2).val();
           	 var wReg=input.eq(3).val();
                  if (input.eq(0).val() ==="") {
                  	  layer.msg("名称不能为空！");
                  }else if(!reg.test(ipReg)){
                      layer.msg("IP不正确！");
                  }else if(!exp.test(zReg)) {
                  	  layer.msg("子网掩码不正确！")
                  }else if(!reg.test(wReg)){
                       layer.msg("网关地址不正确！")
                  }else{
                      var  cartInfo={id:id,name:input.eq(0).val(),IP:input.eq(1).val(),mask:input.eq(2).val(), gateway: input.eq(3).val(),host:textarea.val()};  
	                  localStorage.setItem("data",JSON.stringify(cartInfo));
	                  console.log(cartInfo);
	                 layer.closeAll(); 
                  }
                 
           });
     }
	$(document).on('click', '#topocontent div.elebox img', function(){
         var idtitel=$(this).next('span');
		 var id=$(this).parents().attr('id');
		 if (id.substring(0,8) === 'uiscreen') {
		 	 layer.open({
			  title:"云主机信息",
			  type: 1,
			  skin: 'layui-layer-demo', //样式类名
			  closeBtn: 1, //不显示关闭按钮
			  anim: 2,
			  shadeClose: false, //开启遮罩关闭
			  content: cloudHosting
			});
		 }else{
             layer.open({
			  title:"交换机信息",
			  type: 1,
			  skin: 'layui-layer-demo', //样式类名
			  closeBtn: 1, //不显示关闭按钮
			  anim: 2,
			  shadeClose: false, //开启遮罩关闭
			  content: toposwitch
			});
		 }
		 cloudSave(id,idtitel);
	});
	
	$(document).on('click', '#delEle', function(){
		idStr = rightkeyPop.attr('rightkey_click_id');
	    $.confirmInfo({
			title : '删除元素及链接',
			text : '确认删除此元素及其链接吗？',
			sure : function(){
				instance.removeAllEndpoints(idStr);
				instance.remove(idStr);
			}
		});
	});
	$(document).on('click', '#relationWrap a', function(){
	    var txt = $(this).text(),
		    idStr = rightkeyPop.attr('rightkey_click_id');
		$('#' + idStr).children('span').text(txt);
		relationWrap.hide();
		rightkeyPop.hide();
		instance.revalidate(idStr);
	});
	rightkeyPop.mouseover(function(){
		$(this).show();
		return false;
	});
	relevanceBox.hover(function(){
	    relationWrap.show();
	}, function(){
	    relationWrap.hide();
	});
	$('body').mouseover(function(){
	    rightkeyPop.hide();
	});
	
	//jsPlumb事件
	/*instance.bind("click", function(info) {//点解连接线删除连接（bug,点击endpoint也能删除，但是点击label能提示不能删除）
	    detachLine(info);
	});*/
	
	instance.bind("connection", function(info) {//更改label关系
		info.connection.getOverlay("label").setLabel(labelTxt);
	});
	instance.bind("connectionDrag", function(info) {//更改连接链颜色
		info.setPaintStyle({fillStyle : lineColor, strokeStyle: lineColor});
	});
	instance.bind("connectionDragStop", function(info) {//点击连接线、overlay、label提示删除连线 + 不能以自己作为目标元素
	
	      if (info.sourceId == info.targetId) {
          jsPlumb.detach(info);
          layer.msg("不能连接自己！");
        }else{
			info.unbind('click');
			info.bind('click',function(){
				detachLine(info);
			});
		};
        $.each(instance.getEndpoints(info.source), function(i, el) {
        	console.log(i);
          if (i>0) {
            jsPlumb.detach(info);
            layer.msg("连接错误！");
            return false;
          } 
         });
	
	});

	//交换机菜单
	function switchMenu(){
		  const smid= $(".switch-menu");
		  var pointX = event.pageX;
          var pointY = event.pageY;
          smid.css({'left':pointX,'top':pointY});
          smid.show(500);

	};

	function detachLine(info){//删除连接
	    $.confirmInfo({
			title : '删除连接',
			text : '确认删除此链接吗？',
			sure : function(){
			   instance.detach(info); 
			}
		});
	}
	function renderConnect(newid){//渲染
		instance.draggable(newid);
		instance.doWhileSuspended(function(){
			var isFilterSupported = instance.isDragFilterSupported();
			if(isFilterSupported){
				 	instance.makeSource(newid, {filter:".dragPoint",anchor:"Continuous"}, pstyle);
			}else{
				var eps = jsPlumb.getSelector(".dragPoint");
				for (var i = 0; i < eps.length; i++) {
					var e = eps[i], p = e.parentNode;
					instance.makeSource(e, {parent:p, anchor:"Continuous"}, pstyle);
				}
			}
		});
			instance.makeTarget(newid, {dropOptions:{hoverClass:"dragHover"},anchor:"Continuous"}, pstyle1);
		
	}
	
	//拖动创建元素
    lefticon.children('div.iconitems').draggable({
	    helper: 'clone',
		scope: 'topo'
	});
	topocontent.droppable({
	    scope: 'topo',
		drop: function(event, ui){
			//获取基本元素与参数
			var $this = $(this),
				dragui = ui.draggable,
				fatop = parseInt($this.offset().top),
				faleft = parseInt($this.offset().left),
				uitop = parseInt(ui.offset.top),
				uileft = parseInt(ui.offset.left),
				imgsrc = dragui.children('img').attr('src'),
				spantxt = dragui.children('span').text(),
				uid = dragui.attr('icontype'),
				alluid = topocontent.children('div.' + uid);
			
			//ID计算
			var allicon = alluid.length,
				idnum = 0,
				idArr  = new Array;
			alluid.each(function(i) {
				idArr.push(parseInt($(this).attr('id').split('_')[1]));
			});
			idArr.sort(function(a,b){return a>b?1:-1});
			for(i = 0; i < allicon; i++){
			   var idArrOne = parseInt(idArr[i]);
				if(i != idArrOne){
					idnum = idArrOne - 1;
					break;
				}else{
					idnum = allicon;
				} 
			}
			
			//插入元素组织
		    var newstyle = 'left:' + (uileft - faleft) + 'px;top:' + (uitop - fatop) + 'px',
				newid = uid + '_' + idnum,
				newsrc = imgsrc.replace('little-icon', 'big-icon'),
				str = '<div class="elebox '+uid+'" id='+newid+' style='+newstyle+'><img src='+newsrc+'><span class="dragPoint">'+spantxt+'</span></div>';
			
			$this.append(str);
			renderConnect(newid);
			instance.revalidate(newid);
			$("#" + newid).draggable({ containment: "parent" });
		}
	});
      

	  //页面放大缩小
         /*   var $section = $('#topocontent');
          var $panzoom = $section.panzoom();
  
           $panzoom.on('mousewheel', function( e ) {
            e.preventDefault();
            var delta = e.delta || e.originalEvent.wheelDelta;
            var zoomOut = delta ? delta < 0 : e.originalEvent.deltaY > 0;
            $panzoom.panzoom('zoom', zoomOut, {
              increment: 0.1,
              animate: false,
              focal: e
            });
          });*/
        

	//-------------------编辑(end)-------------------
	
	
	//-------------------保存(start)-------------------
	var saveTopoBtn = $('#saveTopoBtn'),
		serliza = '';
	saveTopoBtn.click(function(){
	    var connects = [];
		$.each(instance.getAllConnections(), function (idx, connection) {
			connects.push({
				lineColor: connection.getPaintStyle('label').fillStyle,
				connectionLabel : connection.getOverlay('label').label,
				PageSourceId: connection.sourceId,
				PageTargetId: connection.targetId
			});
		});
		var blocks = [];
		$("#topocontent .elebox").each(function (idx, elem) {
			var $elem = $(elem);
			blocks.push({
				BlockId: $elem.attr('id'),
				BlockClass: $elem.attr('class').split(' ')[1],
				BlockImg: $elem.children('img').attr('src'),
				BlockText: $elem.children('span').text(),
				BlockX: parseInt($elem.css("left")),
				BlockY: parseInt($elem.css("top"))
			});
		});
		serliza = JSON.stringify(connects) + "&" + JSON.stringify(blocks);
		
		if(topocontent.children('div.elebox').length == 0){
		    $.popupTips('请先创建元素或连接');
		}else{
		    $.popupTips('流程图已保存');
		}
		console.log(serliza);
		$('#num').text(serliza);

	});
	//-------------------保存(end)-------------------
	
	
	//-------------------预览(start)-------------------
	var topoView = $('#topoView'),
	    viewTopoBtn = $('#viewTopoBtn');
	viewTopoBtn.click(function(){
	    $.iframePop('topo-view.html', 640, 900);
	});
	topoView.load('json/connection.json', function(response, status){
	    if(status == "success"){
			$.closePop('loadingPop');
			viewPop(response);
		}else{
		    $.popupEle('loadingPop');
		}
	});
	
	function viewPop(response){
	    var list = eval(response.split('&')[0]),
			blocks = eval(response.split('&')[1]),
			htmlText = "",
			conn = "";
		//------------插入元素-------------
		for( var i in blocks){
			var viewstyle = 'left:'+blocks[i].BlockX+'px;top:'+blocks[i].BlockY+'px;',
				viewid = blocks[i].BlockId,
				viewClass = blocks[i].BlockClass,
				viewsrc = blocks[i].BlockImg,
				viewTxt = blocks[i].BlockText;
			htmlText = htmlText + '<div class="elebox cursor_default '+viewClass+'" id='+viewid+' style='+viewstyle+'><img src='+viewsrc+'><span class="dragPoint cursor_default">'+viewTxt+'</span></div>';
		};
		topoView.html(htmlText);
		
		//------------默认连接-------------
		var instanceView = jsPlumb.getInstance({
				Endpoint : ["Dot", {radius:2}],
				ConnectionOverlays : [
					[ "Arrow", {location: 1, id:"arrow", length:10, foldback:0.8, width: 10} ],
					[ "Label", { label:"关系", id:"label", cssClass:"labelstyle" }]
				],
				Container:"topoView"
			});
		window.jsp = instanceView;
		var windows = jsPlumb.getSelector("#topoView .elebox");
		instanceView.doWhileSuspended(function() {
			var isFilterSupported = instanceView.isDragFilterSupported();
			if (isFilterSupported) {
				instanceView.makeSource(windows, {filter:'none',anchor:"Continuous"}, pstyle);
			}else {
				var eps = jsPlumb.getSelector(".elebox");
				for (var i = 0; i < eps.length; i++) {
					var e = eps[i], p = e.parentNode;
					instanceView.makeSource(e, {parent:p,anchor:"Continuous"}, pstyle);
				}
			}
		});
		instanceView.makeTarget(windows, {anchor:"Continuous"}, pstyle);
		
		//------------更改样式-------------
		for( var i in list){
			var conor = instanceView.connect({ source: list[i].PageSourceId, target:list[i].PageTargetId});
			conor.getOverlay("label").setLabel(list[i].connectionLabel);
			conor.setPaintStyle({fillStyle : list[i].lineColor, strokeStyle: list[i].lineColor});
		};
	}
	//-------------------预览(end)-------------------

});


