
var imageFiles = ["images/image1.jpg","images/image2.jpg","images/image3.jpg","images/image4.jpg","images/image5.jpg","images/image6.jpg",
                  "images/image7.jpg","images/image8.jpg","images/image9.jpg","images/image10.jpg","images/image11.jpg","images/image12.jpg",
                  "images/image13.jpg","images/image14.jpg","images/image15.jpg"];

// when the page is onload, we should setup the interval and 
window.onload = function(){

    //get everyclass that have the image and button in it
    var imageClasses = document.getElementsByClassName("card-image");

    //for every class we inicial the image Interal and button setup;
    Array.from(imageClasses).forEach(inicial);
}


function inicial(currentValue, index){
    
    //Make sure that every card have distinct set of images 
	var imageSet = [imageFiles[index],imageFiles[index+5],imageFiles[index+10]];

    //the interval id
    var interID;

    //random interval
    var timerInterval = getRandomInt(1000,5000);
    
    //the index of image in the set
    var id_pos = 0

    //start the interval updates
    var timer = function(){
        var imgTag = currentValue.getElementsByTagName("IMG");

        if (imgTag.length == 0) return;

        interID = setInterval(function(){
            imgTag[0].setAttribute("src", imageSet[id_pos++ % 3]);
        },timerInterval);
    };

    //set up the button for that card DOM element
    var setButton = function(){
        var button = currentValue.getElementsByTagName("BUTTON")[0];
        if(!button) return;
        button.onclick = function(){
            if (button.innerText == "Stop"){
                clearInterval(interID);
                button.innerText = "Start";
            }
            else{
                timerInterval = getRandomInt(1000,5000);
                button.innerText = "Stop";
                timer();
            }
        }
    };

    setButton();
    timer();
}
function getRandomInt(min, max){
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random()*(max-min)) + min;
}

