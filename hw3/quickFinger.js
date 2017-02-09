'use strict'
//start button
var button = document.getElementById("start");
//the speed to generate fruit
var generateRate;
//store all the fruit
var cards = [];
//the score user get
var scoreChange = 0;
//all the timer
var timer1,timer2,timer3;
//the time left to play
var timeSet = document.getElementById('time');
//the reStart button
var reStart = document.getElementById("gameRestart");

var end = document.getElementById("status");
// the images set
var images = ["image/watermelon.png","image/pear.png","image/bnana.png","image/bomb.png"];
// the picture size
var cardsWidth = 100;
var cardsHeight = 90;
//the record the start time
var startTime;
//record the number of click
var clickTime = 0;
//backGround picture
var music = document.getElementById('music');
var musicClick = document.getElementById("musicClick");
var app = creatApp(document.getElementById("canvas"))

window.onload = function(){
	button.addEventListener('click',start);
	reStart.addEventListener('click',restart);
	checkCookie();
}

//game start to play
function start() {
	music.play();
	button.style.display = "none";
	//time subtract one every second
	timer1 = setInterval(timeCheck, 1000);
	cards = [];
	scoreChange = 0;
	generateRate = 1000;
	startTime = new Date();
	clickTime = 0;

    //set time interval to generate fruit and move it
    timer2 = setInterval(app.generate,generateRate);
    timer3 = setInterval(app.update,30)

}

//reStart the game
function restart(){
	app.goToEnd()
	end.innerHTML = "";
    timeSet.innerHTML = 90;
    document.getElementById("score").innerHTML= 0;
    document.getElementById("clickTime").innerHTML = 0;
    start();
}

//check if the time ends
function timeCheck(){
	if(timeSet.innerHTML == 0){
	    app.goToEnd ();
	    return false; 
	}
	timeSet.innerHTML = timeSet.innerHTML * 1 - 1;
}

// draw things in the canvas,and move it 
function creatApp(canvas){
	
	var c = canvas.getContext("2d");
	
	//generate the fruit 
	var generate = function(){
		var row;
		var direction;
		var random = Math.random();
		if(random> 0.5){
			row = canvas.width - 50;
			direction = -1;
		}else {
			row = 0;
			direction = 1;
		}
		cards.push({x:row, y:canvas.height, picture: Math.floor(Math.random()*4),a: 8+2*random,dir: direction});
	}
	// move the fruit with specific speed and direction 
	var update = function(){
		
		c.clearRect(0,0,canvas.width,canvas.height);

		cards.forEach(function(value){
			if(value.y <= canvas.height){
				var img = new Image();
				img.src = images[value.picture]
				c.drawImage(img,value.x,value.y,cardsWidth,cardsHeight);
				value.x += 7*value.dir;
				value.y -= value.a*3;
				if(value.a < 1 && value.a > -1){
					value.a -= 0.1;
				}else {
					value.a -= 0.25;
				}
			}
		})
		checkScore();
	}
	//update the score 
	var checkScore = function(){
		var nowTime = new Date();
		if(nowTime.getTime() - startTime.getTime() >= 10000){
			clearInterval(timer2);
			timer2 = setInterval(generate,generateRate-=100);
			startTime = nowTime;
		}
	}
	// check if you get the score every time you click on the canvas
	var checkClick = (function(){
    	
    	canvas.addEventListener('click',function c(e){
    		//record the click time
    		clickTime++;
    		document.getElementById("clickTime").innerHTML = clickTime;
    		
    		var BB = canvas.getBoundingClientRect();
			var offsetX = BB.left;
			var offsetY = BB.top;

    		//find the click postion
    		var ex = e.pageX - offsetX;
    		var ey = e.pageY - offsetY;
            
            //find if the fruit is clicked 
            cards.some(function(value){
            	if(ex >= value.x && ex <= value.x + cardsWidth && ey >= value.y && ey <= value.y + cardsHeight){
            		musicClick.play();
            		if(value.picture == 3){
            			goToEnd();
            		}else{
            			scoreChange++;
            			document.getElementById("score").innerHTML= scoreChange;
            			value.y = canvas.height;
            			value.a = -1;
            			value.dir = 0;
            			return true;
            		}
            	}
            })

    	},false);
    })();
    //end the game
    function goToEnd(){
		music.pause();
		timeSet.innerHTML="Game Over";
		end.innerHTML = "Congraduation!" + '<br>' + " Score: " + scoreChange + '<br />' + "Click restart to play again";
		clearInterval(timer1);
		clearInterval(timer2);
		clearInterval(timer3);
		canvas.removeEventListener('click',c);
		checkCookie();	
	}

	return {
		generate: generate,
		update:update,
		goToEnd:goToEnd
	}
}
// Set Cookie to restore the score and click Number
function setCookie(cscore,cvalue,cclick,cnum,exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires=" + d.toGMTString();
    document.cookie = cscore + "=" + cvalue + "," + cclick + "=" + cnum+ ";" + expires + ";path=/";
}
//Check is the record of this game is higher than the highest record
// When the score is the same,then check the click time, the less the check time 
// the better you are
function checkCookie() {
    var score = getCookie("bestScore");
    var clickNum = getCookie("ClickNum");
    if (score != "") {
        var bestScore = score - '0';
        var leastClick = clickNum - '0';
        //the score and click time must be integer
        if(bestScore%1 !== 0 || leastClick%1 !== 0){
        	score = scoreChange;
            clickNum = clickTime;
        }

        //if the score is the same , we choose less click time
        if(bestScore === scoreChange){
        	clickNum = Math.min(leastClick,clickTime);
        }else if(bestScore > scoreChange){
        	score = bestScore;
        	clickNum = leastClick;
        }else {
        	score = scoreChange;
        	clickNum = clickTime;
        }
    } else{
       score = scoreChange;
       clickNum = clickTime;
    }
    document.getElementById("bestScore").innerHTML = score;
    document.getElementById("clickNum").innerHTML = clickNum;
    setCookie("bestScore", score,"ClickNum",clickNum, 30);
}
//Get the cookie 
function getCookie(cscore){
    var score = cscore + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    var cook = ca[0].split(',');
    for(var i = 0; i < cook.length; i++) {
        var c = cook[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(score) == 0) {
            return c.substring(score.length, c.length);
        }
    }
    return "";
}


