var button = document.getElementById("btn");
var info = document.getElementsByClassName("game_win");
var flag = true;

//First add two event listener to button,one for mouse move,one for click
window.onload = function(){
	button.addEventListener('mouseover',move,false);
	
	button.addEventListener('click',btnClick,false);
}

//When the mouse come to the button, it move
function move(){
	if(flag){
		button.style.position = "absolute";
		var buttonwidth = button.offsetWidth;
		var buttonheight = button.offsetHeight;
		button.style.left = Math.floor(Math.random()*(window.innerWidth - buttonwidth)) + "px";
		button.style.top = Math.floor(Math.random()*(window.innerHeight - buttonheight)) + "px";
		}
}
function btnClick(){
	if(button.innerHTML == "Click Me"){
		button.innerHTML = "Play Again";
		info[0].style.display = "inline-block";
		button.removeEventListener('mouseover',move);
	} else if(button.innerHTML == "Play Again"){
		button.innerHTML = "Click Me";
		info[0].style.display = "none";
		button.addEventListener('mouseover',move,false)
		move();
	}

}
window.onkeydown = function(e){
    if (e.keyCode == 16){
    	flag = false;
    }
       
}

window.onkeyup = function(e){
    if(e.keyCode ==16){
        flag = true;
    }
}
