//this is your timer, does nothing right now
Timer = function() {}

//randomly returns a +1 or -1
randfunc = function(){
	if(Math.random()<0.5) 
		return 1; 
	else 
		return -1;
}

//update x and y coordinate with randfunc value
Timer.update = function() {
	if(isclicked){
		x = mousex;
		y = mousey;
	}

	x += randfunc();
	y += randfunc();
}

function updatemouseloc(e) {
	mousex = e.pageX;
	mousey = e.pageY;
}

var isclicked = false;

function setclicked(e) {
	if(isclicked)
		isclicked = false;
	else
		isclicked = true;
}

//when the page loads init your vars and get the canvas and context
window.onload = function() {
	x = 100;
	y = 100;
	mousex = 0;
	mousey = 0;
	c = document.getElementById("myCanvas");
	ctx = c.getContext("2d");
}

//function to run on the timer!!
Timer.run = function() {
	document.onmousemove = updatemouseloc;
	document.onmousedown = setclicked;
	Timer.update();
	ctx.fillStyle="#1589FF";
	ctx.fillRect(0,0,500,500);
	ctx.drawImage(document.getElementById("flag"),x,y);
};

//timer interval is 10ms
Timer._intervalId = setInterval(Timer.run, 10);