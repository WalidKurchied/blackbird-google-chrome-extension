
//variables
var active = false;

//this is called when the page finished loading
window.onload = onLoadGetInfo();


//called when the user clicks the browser action icon
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if( request.message === "clicked_browser_action" ) {     	
     	var status = nightTime();
     	//saveData(request.urlOfTab);
     	saveData(status);
	}
  });


//NightTime vision
function nightTime(){
	if(active == false){
		turnBlackBgAndWhiteFo();
		active = true;
	}else{
		turnWhiteBgAndBlackFo();
		active = false;
	}
	return active;
}
 

// function saveData(url){
// 	var save = {};
// 	// chrome.storage.sync.get(window.location.host, function (obj) {
// 	// 	console.log('im inside');
// 	// 		if (obj[window.location.host] == window.location.host) {
// 	// 			console.log('even deeper');
// 	// 			// StorageArea.remove(window.location.host, function(){
// 	// 			// 	console.log('removed url');
// 	// 			// });
// 	// 			//delete obj.window.location.host;
// 	// 			//active = false;
// 	// 			console.log(window.location.host);
// 	// 		} else {
// 	// 			console.log("im in the else statmenet");
// 	// 			save[window.location.host] = window.location.host;
// 	// 		 	chrome.storage.sync.set(save, function() {
// 	// 		 	console.log(window.location.host);
// 	// 		    console.log('Settings saved');
// 	// 		    console.log(save);
// 	//   			});
// 	// 		}
// 	//	});

// 	save[window.location.host] = window.location.host;
// 			chrome.storage.sync.set(save, function() {
// 			 	console.log(window.location.host);
// 			    console.log('Settings saved');
// 			    console.log(save);
// 	  		});
// }

function saveData(stat){
	var save = {};

	chrome.storage.sync.get('active', function (obj) {
	  	  	if(obj.active == true){
	  		  console.log(obj.active);
	  		  delete obj[active];
	  		  save['active'] = false;
				chrome.storage.sync.set(save, function() {
				   console.log(save);
		  		}); 
		  	//  location.reload();
	  	}else{
	  		//store it
	  		console.log("it is gonna be stored");
			save['active'] = stat;
				chrome.storage.sync.set(save, function() {
				   console.log('Settings saved');
				   console.log(save);
		  		});
		  		//location.reload();
	  	}
	});	
}


//edit here
function onLoadGetInfo(){
   chrome.storage.sync.get('active', function (obj) {
   	console.log(obj.active);
   	console.log('hit from within');

   	if(obj.active == true){
   		turnBlackBgAndWhiteFo();
   		console.log("black and white");
   	}else {
   		turnWhiteBgAndBlackFo();
   		console.log("white and white");
   	}
	});
}


//turns background black and font white
function turnBlackBgAndWhiteFo() {
    setInterval(changeBgAndFont, 0000);
}


function changeBgAndFont(){
	$("body").find("*").css("backgroundColor","black");
	$("*").css("backgroundColor","black");
    $('*').css('color','#999999');
    $('a').css('color','#0074d9');
}

//turns background white and font black
function turnWhiteBgAndBlackFo() {
	$('*').css('background-color','');
	$('body').each(function(element){
		$(this).css('color','black');
	});
	$('*').css('color','');
}
