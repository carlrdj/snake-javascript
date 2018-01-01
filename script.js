//Canvaz ID : area_de_dibujo
var canvas = document.getElementById("canvas");
var showSpeed = document.getElementById("speed");
var showPoint = document.getElementById("point");
var showLevel = document.getElementById("level");
var limit_area_x = canvas.width;
var limit_area_y = canvas.height;
var wornSquare = 16;
var area = canvas.getContext("2d");
var x_fin = 400;
var y_fin = 144;
var color = "#FF9800";
var border = 3;
var direction = { UP: 38, DOWN: 40, LEFT: 37, RIGHT: 39, SPACEBAR: 32};
var eat_easy = [];
var body = [];
var arrow;
var speedInitial = 500;
var speed = speedInitial;
var point = 0;
var level = 1;
showPoint.innerHTML = "----";
showLevel.innerHTML = level;
showSpeed.innerHTML = 510 - speed;
bodyReset();
drawWorn();
generateEatEasy();
startInterval();
function startInterval() {
    duration = speed;
    interval = setInterval(function () {   
    	wormSpeed(arrow);
      clearInterval(interval);
      startInterval();      
    }, duration);
}

function reset(){
	bodyReset();
	arrow = "";
	point = 0;
	showPoint.innerHTML = "----";
	speedForLevel(level);
	showSpeed.innerHTML = 510 - speed;
	drawWorn();
	eatEasyReset();
}

function increaseLevel(){
	if (point>0) {
		if (window.confirm("¿Deseas subir de nivel?\nSe perderan todos tus puntos acumulados.")) {
			point = 0;
			if (level < 21) {
				level++;
				speedForLevel(level);
				showLevel.innerHTML = level;
			}			
		}
	}else{
		if (level < 21) {
			level++;
			speedForLevel(level);
			showLevel.innerHTML = level;
		}
	}
}

function decreaseLevel(){
	if (point>0) {
		if (window.confirm("¿Deseas bajar de nivel?\nSe perderan todos tus puntos acumulados.")) {
			point = 0;
			reset();			
			if (level < 21) {
				level--;
				speedForLevel(level);
				showLevel.innerHTML = level;
			}		
		}
	}
	if (level > 1) {
		level--;
		speedForLevel(level);
		showLevel.innerHTML = level;
	}
}

function speedForLevel(level){	
	speed = speedInitial - ((level - 1) * 20);
	showSpeed.innerHTML = 510 - speed;
}

function moveSnake(arrow){	
	switch (arrow) {
    case direction.UP:
    	y_fin = y_fin - wornSquare;
    	verifyEatEasy();
    	verifyCannibal();
    	verifyLimits();
    	reBody(x_fin, y_fin);
      break;
    case direction.DOWN:
    	y_fin = y_fin + wornSquare;
    	verifyEatEasy();
    	verifyCannibal();
    	verifyLimits();
    	reBody(x_fin, y_fin);
      break;
    case direction.RIGHT:
    	x_fin = x_fin + wornSquare;
    	verifyEatEasy();
    	verifyCannibal();
    	verifyLimits();
    	reBody(x_fin, y_fin);
      break;
    case direction.LEFT:
    	x_fin = x_fin - wornSquare;
    	verifyEatEasy();
    	verifyCannibal();
    	verifyLimits();
    	reBody(x_fin, y_fin);
      break;
  }
}

function eatForWorn(){
	for (var i = 0; i < eat_easy.length; i++) {
		drawEatEasy(eat_easy[i][0], eat_easy[i][1]);
	}
}

function verifyEatEasy(){
	for (var i = 0; i < eat_easy.length; i++) {
		if((eat_easy[i][0] == x_fin) && (eat_easy[i][1] == y_fin)){
			body.push([body[body.length-1][0], body[body.length-1][1]]);
			console.log("TE LA COMISTE :D !!!");
			generateEatEasy();
			if (speed > 20) {
				speed = speed - 10;
			}
			point++;
			showPoint.innerHTML = point;
			showSpeed.innerHTML = 510 - speed;
		}		
	}
}

function generateEatEasy(){
	var div_x = limit_area_x / wornSquare;
	var div_y = limit_area_y / wornSquare;
	var earEasy_x = Math.floor(Math.random()*(div_x-0)+ 0);
	var earEasy_y = Math.floor(Math.random()*(div_y-0)+ 0);
	var go = true;
	for (var i = 0; i < body.length; i++) {
		if(body[i][0] == earEasy_x * wornSquare){
			go = false;
		}
		if(body[i][1] == earEasy_y * wornSquare){
			go = false;
		}
	}
	if (go) {
		eat_easy = [];
		eat_easy.push([earEasy_x * wornSquare, earEasy_y * wornSquare]);
		eatForWorn();
	}else{
		generateEatEasy();
	}
}

function verifyCannibal(){
	for (var i = 0; i < body.length; i++) {
		if((body[i][0] == x_fin) && (body[i][1] == y_fin)){
			console.log("PERDISTE :( POR CANIBAL !!!!");
			alert("PERDISTE :( POR CANIBAL !!!!");
			reset();
		}		
	}
}

function verifyLimits(){
	if (x_fin < 0) {
		x_fin = limit_area_x - wornSquare;
	}else if(y_fin < 0){
		y_fin = limit_area_y - wornSquare;
	}
	if (x_fin == limit_area_x) {
		x_fin = 0;
	}else if(y_fin == limit_area_y){
		y_fin = 0;
	}
}

function reBody(x, y){
	for (var i = body.length - 1; i >= 0 ; i--) {
		if (i > 0) {
			body[i][0] = body[i - 1][0];	//x
			body[i][1] = body[i - 1][1];	//y
		}
	}
	body[0][0] = x;	//x
	body[0][1] = y;	//y
	drawWorn();
}

function drawWorn(){
	for (var i = 0; i < body.length; i++) {
		drawSquare(body[i][0], body[i][1]);
	}
}

document.addEventListener("keydown", eventKeyboard);

function eventKeyboard(e) {
	switch (e.keyCode) {
    case direction.UP:
    	if (direction.UP != arrow && direction.DOWN != arrow) {
		  	arrow = e.keyCode;
			}
    	break;
    case direction.DOWN:
    	if (direction.UP != arrow && direction.DOWN != arrow) {
		  	arrow = e.keyCode;
			}
      break;
    case direction.RIGHT:
    	if (direction.RIGHT != arrow && direction.LEFT != arrow) {
		  	arrow = e.keyCode;
			}
      break;
    case direction.LEFT:
    	if (direction.RIGHT != arrow && direction.LEFT != arrow) {
		  	arrow = e.keyCode;
			}
     	break;
    case direction.SPACEBAR:
    	console.log("DESPACITO :D !!!");
     	break;
  }
}

function wormSpeed(arrow){
	moveSnake(arrow);
}

function drawSquare(x, y)
{ 
	area.fillStyle="#9C27B0";
  area.fillRect(x, y, wornSquare, wornSquare);
  area.clearRect(x + border, y + border, wornSquare - border * 2, wornSquare - border * 2);
	area.clearRect(body[body.length-1][0], body[body.length-1][1], wornSquare, wornSquare);
}

function drawEatEasy(x, y)
{ 
	area.fillStyle="#FF9800";
  area.fillRect(x, y, wornSquare, wornSquare);
}

function bodyReset(){
	for (var i = 0; i < body.length; i++) {		
		area.clearRect(body[i][0], body[i][1], wornSquare, wornSquare);
	}
	body = [];
	x_fin = 400;
	y_fin = 144;
	for (var i = 0; i < 4; i++) {
		body.push([(x_fin - (i * wornSquare)), y_fin]);
	}		
}

function eatEasyReset(){
	for (var i = 0; i < eat_easy.length; i++) {
		area.clearRect(eat_easy[i][0], eat_easy[i][1], wornSquare, wornSquare);
	}
	eat_easy = [];
	generateEatEasy();
}