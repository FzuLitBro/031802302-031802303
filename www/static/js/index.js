var ROOT = {};

function analyse(){
	var text = document.getElementById("text").value;
	var root = text.split(/\n\n\n/);

	for(var i in root){
		var leader = root[i].split(/\n/);
		var teacher = leader[0].substring(3);
		ROOT[teacher] = {};
		var grades = [];
		var re1=/[0-9]+\u7ea7\u672c\u79d1\u751f/;
		var re2=/[0-9]+\u7ea7\u535a\u58eb\u751f/;
		var re3=/[0-9]+\u7ea7\u7855\u58eb\u751f/;
		var re4 = /\u5bfc\u5e08/;
		for(var k in leader){
			if(re1.exec(leader[k])){
				grades.push(re1.exec(leader[k]));
				ROOT[teacher][re1.exec(leader[k])] = {};
				for(var q in leader[k].substring(9).split(/\、/)){
					ROOT[teacher][re1.exec(leader[k])][leader[k].substring(9).split(/\、/)[q]] = "";
				}
			}
			if(re2.exec(leader[k])){
				grades.push(re2.exec(leader[k]));
				ROOT[teacher][re2.exec(leader[k])] = {};
				for(var q in leader[k].substring(9).split(/\、/)){
					ROOT[teacher][re2.exec(leader[k])][leader[k].substring(9).split(/\、/)[q]] = "";
				}
			}
			if(re3.exec(leader[k])){
				grades.push(re3.exec(leader[k]));
				ROOT[teacher][re3.exec(leader[k])] = {};
				for(var q in leader[k].substring(9).split(/\、/)){
					ROOT[teacher][re3.exec(leader[k])][leader[k].substring(9).split(/\、/)[q]] = "";
				}
			}
			if(!re1.exec(leader[k]) && !re2.exec(leader[k]) && !re3.exec(leader[k]) && !re4.exec(leader[k]) && leader[k]!=''){
				// console.log(leader[k].split(/\：/));
				for(var w in ROOT[teacher]){
					// console.log(ROOT[teacher][w]);
					for(var e in ROOT[teacher][w]){
						if(e == leader[k].split(/\：/)[0]){
							ROOT[teacher][w][e] = leader[k].split(/\：/)[1];
						}
					}
				}
			}
		}
	}
	// return ROOT;
	// console.log(ROOT);
	createTree();
}


function createTree(){
	document.write('<body></body>');
	var svg = d3.select('body').append('svg').attr('width',window.innerWidth).attr('height',window.innerHeight);
		
	var g = svg.append('g');
	var i = 1;
	for(var q in ROOT){
		var num1 = Object.keys(ROOT).length;
		var x1 = i*window.innerWidth/(num1+1);
		var y1 = window.innerHeight/2;

		var j = 0;
		var rand1 = randomNum(0,90);
		for(var w in ROOT[q]){
			var num2 = Object.keys(ROOT[q]).length;
			var angle = 360/(num2);
			var x2 = x1 + 180*Math.cos((angle*j+rand1)*Math.PI/180);
			var y2 = y1 + 180*Math.sin((angle*j+rand1)*Math.PI/180);
			//createline(x1,y1,x2,y2,'blue','3px',q+q);

			var k = 0;
			var rand2 = randomNum(0,90);
			for(var e in ROOT[q][w]){
				var num3 = Object.keys(ROOT[q][w]).length;
				// console.log(num3);
				var angle2 = 360/(num3);
				var x3 = x2 + 80*Math.cos((angle2*k+rand2)*Math.PI/180);
				var y3 = y2 + 80*Math.sin((angle2*k+rand2)*Math.PI/180);
				// console.log(80*Math.cos(angle2*k*Math.PI/180)+"  "+80*Math.sin(angle2*k*Math.PI/180)+"  "+k);
				createline(x2,y2,x3,y3,'red','1px',q+w,q);
				
				if(ROOT[q][w][e]!=''){
					createcircle(x3,y3,50,e+':'+ROOT[q][w][e],'SkyBlue','10px',q+w,q);
				}
				else{
					createcircle(x3,y3,50,e,'SkyBlue','15px',q+w,q);
				}
				k++;
			}
			createcircle(x2,y2,30,w,'Orchid','10px',q+q);
			j++;
		}
		createcircle(x1,y1,50,q,'Gold','30px','root');
		i++;
	}
	

	function createcircle(x,y,r,text,color,size,select,root){
		var circle = g.append('circle')
						.attr('cx',x)
						.attr('cy',y)
						.attr('r',r)
						.attr('fill',color)
						.attr('class',select)
						.attr('root',root)
						.attr('onclick',"change(\'"+q+"\',\'"+text+"\');");
		
		var text = g.append('text')
					.text(text)
					.attr('fill','white')
					.attr('x', x)
					.attr('y', y)
					.attr('text-anchor', 'middle')
					.style('font-size', size)
					.attr('dy', 8)
					.attr('root',root)
					.attr('class',select)
					.attr('onclick',"change(\'"+q+"\',\'"+text+"\');")
					.attr('view',text)
					.attr('xy',x+','+y);
	}

	function createrect(x,y,width,height,text,color,select,root,size){
		var rect = g.append('rect')
					.attr('x',x)
					.attr('y',y)
					.attr('width',width)
					.attr('height',height)
					.attr('fill',color)
					.attr('class',select);
		
		var text = g.append('text')
					.text(text)
					.attr('fill','white')
					.attr('x', x+width/2)
					.attr('y', y+height/2)
					.attr('text-anchor', 'middle')
					.style('font-size', size)
					.attr('dy', 8)
					.attr('class',select);
	}

	function createline(x1,y1,x2,y2,color,size,select,root){
		var line = g.append("line")
		            .attr("x1", x1)
		            .attr("x2", x2)
		            .attr("y1", y1)
		            .attr("y2", y2)
		            .attr("stroke", color)
		            .attr("stroke-width", size)
		            .attr("class",select)
		            .attr("root",root);
	}
	// active();
	linksame();
}
function change(q,text){
	$('.'+q+text).toggle();
	$("[root="+text+"]").toggle();
	// console.log($("[root="+text+"]").attr("style"));
	if($('.'+q+text).attr("style")=="display: none;"){
		$("[root="+text+"]").hide();
	}
	var paras = document.getElementsByClassName('link');

	while(paras[0]){
	    paras[0].parentNode.removeChild(paras[0]);
	}
	linksame();
	// save();
}


function linksame(){
	// console.log($("[root='张三']").text());

	var svg = d3.select("svg");
	var g = svg.append('g');
	for(var i in ROOT){
		// console.log(i);
		for(var j in ROOT[i]){
			// console.log(j);
			for(var k in ROOT[i][j]){

				// var x = document.getElementsByTagName("text")[0].view;
				// console.log(x);
				var point = $("[view='"+k+"']");
				// console.log(point.length);
				var result = [];
				for(var q=0;q<point.length;q++){
					classs = point.eq(q).attr("class");
					console.log(classs);
					$('.'+classs).toggle();
					$('.'+classs).toggle();
					console.log($('.'+classs).attr("style"));
					if($('.'+classs).attr("style")=="display: inline;"){
						console.log(point.eq(q).attr("style"));
						result.push(point.eq(q).attr("xy"));
					}
				}
				// console.log(result);
				point = result;
				for(var a=0;a<point.length;a++){
					for(var b=0;b<point.length;b++){
						// console.log(a+' '+b);
						var x1 = point[a].split(/\,/)[0];
						var y1 = point[a].split(/\,/)[1];
						var x2 = point[b].split(/\,/)[0];
						var y2 = point[b].split(/\,/)[1];
						// console.log(x1+':'+y1+','+x2+':'+y2);

						var colors = ['null','black','green','pink','puple','blue'];
						var c = randomNum(1,5);
						quxian(parseInt(x1),parseInt(y1),parseInt(x2),parseInt(y2));
						// g.append("line")
					}
				}
			}
		}
	}
}



function quxian(x1,y1,x2,y2){
	var curveData = [{ x: x1, y: y1 }, { x: x2, y: y2 }];
	var edge = d3.select('svg').append('g');
	var diagonal = d3.svg.diagonal()
	  .source(function (d) { return { x: d[0].y, y: d[0].x }; })            
	  .target(function (d) { return { x: d[1].y, y: d[1].x }; })
	  .projection(function (d) { return [d.y, d.x]; });
   
	d3.select('g')
	  .datum(curveData)
	  .append('path')
	  .attr('class', 'link')
	  .attr('d', diagonal)
	  .attr('stroke', 'Bisque')
	  .attr('stroke-width', 2)
	  .attr('fill', 'none');
}

function randomNum(minNum,maxNum){ 
    switch(arguments.length){ 
        case 1: 
            return parseInt(Math.random()*minNum+1,10); 
        break; 
        case 2: 
            return parseInt(Math.random()*(maxNum-minNum+1)+minNum,10); 
        break; 
            default: 
                return 0; 
            break; 
    } 
}

// 保存按钮
function save(){
    var serializer = new XMLSerializer();
    var svg1 = document.querySelector('svg');
    var toExport = svg1.cloneNode(true);
    var bb = svg1.getBBox();
    toExport.setAttribute('viewBox', bb.x + ' ' + bb.y + ' ' + bb.width + ' ' + bb.height);
    toExport.setAttribute('width', bb.width);
    toExport.setAttribute('height', bb.height);
    var source = '<?xml version="1.0" standalone="no"?>\r\n' + serializer.serializeToString(toExport);
    var image = new Image;
    image.src = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(source);
    var canvas = document.createElement("canvas");
    canvas.width = bb.width;
    canvas.height = bb.height;
    var context = canvas.getContext("2d");
    context.fillStyle = '#fff';//#fff设置保存后的PNG 是白色的  
    context.fillRect(0, 0, 10000, 10000);
    image.onload = function() {  
      context.drawImage(image, 0, 0);  
      var a = document.createElement("a");  
      a.download = "Atlas.png";  
      a.href = canvas.toDataURL("image/png");
      a.click();
    }
  }
