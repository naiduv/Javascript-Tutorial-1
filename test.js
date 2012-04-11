Timer = function() {}

randfunc = function(){
	if(Math.random()<0.5) 
		return 1; 
	else 
		return -1;
}

Timer.update = function() {
	x += randfunc();
	y += randfunc();
}

window.onload = function() {
	x = 0;
	y = 0;
	c = document.getElementById("myCanvas");
	ctx = c.getContext("2d");
}

Timer.run = function() {
  Timer.update();
  ctx.fillStyle="#1589FF";
  ctx.fillRect(0,0,500,500);
  ctx.drawImage(document.getElementById("flag"),x,y);
};

Timer.fps = 100;
Timer._intervalId = setInterval(Timer.run, 1000 / Timer.fps);