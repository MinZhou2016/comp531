// make an array to store the input value and position
var newThings = [];
var input = document.getElementsByTagName('INPUT');
var span = document.getElementsByTagName('SPAN');

// Every time you click on the update button, need to update the information
window.onload = function(){
	var update = document.getElementById("btn_update");
	update.addEventListener('click',function(){
		Array.from(span).forEach(function(currentValue){
		currentValue.style.visibility = "hidden";
		});
		showNewThings();

	},false);
}
// work for the showNewThings function, need to check every value before update.
// only every input value is validated, we can update the old information
var allValidation = function (){
    // as long as one value is not vaidated,the flag would be false
	var flag = true;

	if(!validate("old_name","display_name")){
		flag = false;
		inform("display_name");
	}
	if(!validate("old_email","email")){
		flag =  false;
		inform("email");
	}
	if(!validate("old_number","phone_number")){
		flag = false;
		inform("phone_number");
	}
	if(!validate("old_zip","zipcode")){
		flag = false;
		inform("zipcode");
	}
	if(!checkPassword()){
		flag = false;
		inform("password_confirm");
	}
	return flag;
}
// Validate different input using different form except for check password;
function validate(oldId,id){
	var component = document.getElementById(id);
	var form;

	// using different form according to its id
	switch(id){
		case "display_name":
		    form = /^[A-Za-z][A-Za-z0-9]*$/;
		    break;
		case "email" :
		    form = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		    break;
		case "phone_number":
		    form = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
		    break;
		case "zipcode":
			form = /(^\d{5}$)|(^\d{5}-\d{4}$)/;
			break;
	}

	//if user input something, and the form is right,we would store it in the array
	// waiting for update
    if(form.test(component.value)){
    	newThings.push([oldId,component.value])
    	return true;
    }

	return isEmpty(component.value);
}

//only need to check if two password is the same or if no password has been input
function checkPassword(){
	var pass1 = document.getElementById("pass_word").value;
    var pass2 = document.getElementById("password_confirm").value;
    
    if(isEmpty(pass1) && isEmpty(pass2)){
    	return true;
    }
    
    if(pass1 == pass2){
    	newThings.push(["old_password",pass1]);
    	newThings.push(["old_passConfirm",pass2]);
    	return true;
    }
    return false;
}

//If there is no input, we do not need to check its form to decide if we can update 
function isEmpty(comValue){
	if(comValue == null || comValue == ""){
		return true;
	}
	return false;
}

//If one input is not validated, I need to tell the used by showing the span 
function inform(id){

	document.getElementById(id+"_span").style.visibility = "visible";
}

//If All input is validated all is empty, we can update the old information
//at the same time, I still need to eliminate all input
function showNewThings(){
	if(allValidation()){
       
       newThings.forEach(function(item){
       	document.getElementById(item[0]).innerHTML = item[1];
       })
       
       //Eliminate all inputs
       Array.from(input).forEach(function(currentValue){
		currentValue.value = "";
	})
	}
}
