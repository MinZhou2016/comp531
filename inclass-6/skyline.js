'use strict'

var createApp = function(canvas) { 
	var c = canvas.getContext("2d");

	// Create the ground
	var floor = canvas.height/2
	var grad = c.createLinearGradient(0,floor,0,canvas.height)
	grad.addColorStop(0, "green")
	grad.addColorStop(1, "black")
	c.fillStyle=grad
	c.fillRect(0, floor, canvas.width, canvas.height)

	//the x and y for the sun
	var sunx = 0;
	var suny = canvas.height/2;

	// common size for windows
	var windowSpacing = 2, floorSpacing = 3
	var windowHeight = 5, windowWidth = 3

	// colors of buildings
	var blgColors = [ 'red', 'blue', 'gray', 'orange'] 

	//store all builds;
	var blgs = [];

	// x of the car
	var carX = 0;

	//build a building
	var build = function() { 
		var x0 = Math.random()*canvas.width
		var blgWidth = (windowWidth+windowSpacing) * Math.floor(Math.random()*10)
		var blgHeight = Math.random()*canvas.height/2
		var blgColor = blgColors[ Math.floor(Math.random()*blgColors.length)]
		blgs.push([x0,blgWidth,blgHeight,blgColor])
		update();

	}
	
	//make a sun
	var makeSun = function(){
		sunx = (sunx + 2)%canvas.width
		suny = (70 + Math.sin(sunx *0.02)*60);
		c.beginPath();
		c.arc(sunx,suny,10,0,Math.PI*2);
		c.closePath();
		c.fillStyle = 'red';
		c.fill();
	}

	//update according to time
	var update = function(){

		//since we need to eliminate the old sun,old car,make new sun and make building with different color
		// we have to clear the canvas first 
		c.clearRect(0,0,canvas.width,canvas.height);
		c.fillStyle=grad;
	    c.fillRect(0, floor, canvas.width, canvas.height);
	    
	    //make new things
	    makeSun();
	    blgUpdate();
	    creatCar();

	}
	
	// update building
	var blgUpdate = function(){
		//repaint all building
		blgs.forEach(function(element){

			c.fillStyle = element[3];
			c.fillRect(element[0], floor - element[2], element[1], element[2])

            //choose if the window is yellow or black
			for (var y = floor - floorSpacing; y > floor - element[2]+ windowHeight; y -= floorSpacing + windowHeight) {
				for (var x = windowSpacing; x < element[1] - windowWidth; x += windowSpacing + windowWidth) {
                    if(Math.random() > 0.5){
                    	c.fillStyle = 'yellow';
                    }else {
                    	c.fillStyle = 'black';
                    }
					c.fillRect(element[0] + x, y - windowHeight, windowWidth, windowHeight)
				}
			}
		})

	}
	
	//Click the canvas, find the point and then we can make the building taller
    var makeTall = (function(){
    	
    	canvas.addEventListener('click',function(e){
    		//
    		var BB=canvas.getBoundingClientRect();
			var offsetX=BB.left;
			var offsetY=BB.top;

    		//find the click postion
    		var ex = e.pageX - offsetX;
    		var ey = e.pageY - offsetY;
    		console.log(offsetY);
             
            //make the building taller
            blgs.forEach(function(element){
            	if(element[0] < ex && (element[0] + element[1]) > ex && ey > (floor - element[2]) && ey < floor){
            		if(element[2] <= floor){
            			element[2] += 24;
            		}
            	}
            })

    	},false)
    })();

    //creat a car
    var creatCar = function(){
    	carX = (carX + 3) %canvas.width ;
    	c.beginPath();
    	c.arc(carX + 20,floor - 10,10,0,Math.PI*2);
    	c.stroke();
    	c.fillStyle = 'blue';
    	c.fill();
    	c.beginPath();
    	c.arc(carX + 50,floor - 10,10,0,Math.PI*2);
    	c.stroke();
    	c.fillStyle = 'blue';
    	c.fill();
    	c.fillStyle = 'red';
    	c.fillRect(carX,floor - 30,70,20);
    	c.fillRect(carX + 20,floor - 50,30,20)

    }

	return {
		build: build,
		update: update
	}
}

window.onload = function() {
	var app = createApp(document.querySelector("canvas"))
	document.getElementById("build").onclick = app.build
	setInterval(app.update,50);
}

