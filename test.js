//this is your timer, does nothing right now
Timer = function() {
	this.stability = 10;
}

//randomly returns a +1 or -1
randfunc = function(){
	if(Math.random()<0.5) 
		return 1; 
	else 
		return -1;
}

moveby = function(){
	this.xi = 0;
	this.yi = 0;
}

mb = new moveby();

//update x and y coordinate with randfunc value
Timer.update = function() {
	if(isclicked){
		x = mousex;
		y = mousey;
	}

	x += (randfunc()+(mb.xi));
	y += (randfunc()+(mb.yi));
}

function updatemouseloc(e) {
	mousex = e.pageX;
	mousey = e.pageY;
}

var isclicked = false;

function setclicked(e) {
	if(e.pageX>500 || e.pageY>500)
		return;

	if(isclicked)
		isclicked = false;
	else
		isclicked = true;
}

InitGui = function(gui){
	newTimer = new Timer();
	var controlstability = gui.add(newTimer,'stability',0,50);

	// newMoveBy = new moveby();
	var controlMoveByX = gui.add(mb,'xi',-5,5);
	var controlMoveByY = gui.add(mb,'yi',-5,5);

	controlstability.onChange(function(value){
	clearInterval(Timer._intervalId);
	Timer._intervalId = setInterval(Timer.run, value);
	});

	controlMoveByX.onChange(function(value){
		mb.xi = value;
	});

	controlMoveByY.onChange(function(value){
		mb.yi = value;
	});

}

//when the page loads init your vars and get the canvas and context
window.onload = function() {
	x = 400;
	y = 200;
	mousex = 0;
	mousey = 0;
	
	c = document.getElementById("myCanvas");
	ctx = c.getContext("2d");

	gui = new dat.GUI();

	//initialize the gui
	InitGui(gui);

	Timer._intervalId = setInterval(Timer.run, Timer.stability);
}

updateGuiControls = function(gui) {
	for (var i in gui.__controllers) {
 		gui.__controllers[i].updateDisplay();
	}
}

window.onkeypress = function(e){
	var evtobj=window.event? event : e;
	var unicode=evtobj.charCode? evtobj.charCode : evtobj.keyCode;
	var actualkey=String.fromCharCode(unicode);
	
	switch(actualkey) {
		case "w":
			if(mb.yi<5)
				mb.yi++;
			break;
		case "s":
			if(mb.yi>-5)
				mb.yi--;
			break;
		case "a":
			if(mb.xi<5)
				mb.xi++;
			break;
		case "d":
			if(mb.xi>-5)
				mb.xi--;
			break;
		default:
			return;
	}
	
	updateGuiControls(gui);
}

//function to run on the timer!!
Timer.run = function() {
	ctx.fillStyle="#FFFFFF";
	ctx.fillRect(x,y,50,50);
	document.onmousemove = updatemouseloc;
	document.onmousedown = setclicked;
	Timer.update();
	ctx.drawImage(document.getElementById("flag"),x,y);
};

//timer interval is 10ms