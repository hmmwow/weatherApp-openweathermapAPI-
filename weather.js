var APPID = "fc0d517eaa584380c587b2119eb6c5a4";
var temp;
var loc;
var country;
var icon;
var humidity;
var wind;
var dir;
var des;

window.onload = function() {
    //time and day;
    var day = ["Sunday", "Monday" , "Tuesday", "Wednesday", "Thursday" , "Friday", "Saturday" ]
    var date = new Date();
    day = document.getElementById("day").innerHTML = day[date.getDay()];
    time = document.getElementById("time").innerHTML = time(date);

    var months = ['January','Febuary','March','April','May','June','July','August','September','October','November','December'];
    dayNum = date.getDate();
    month = months[date.getMonth()];
    year = date.getFullYear();
     $(".date").html(month+" "+dayNum+", "+year);

    $.getJSON('https://geoip-db.com/json/geoip.php?jsonp=?') 
         .done (function(location)
         {
            $('#country').html(location.country_name);
            $('#state').html(location.state);
            $('#city').html(location.city);
            $('#ip').html(location.IPv4);               
         });




    if(navigator.geolocation){
        var showPosition = function(position){
        updateByGeo(position.coords.latitude, position.coords.longitude);
        }
        navigator.geolocation.getCurrentPosition(showPosition);

    }else{
        var zip = window.prompt("We could not find your location, please enter your zip code.")
        updateByZip(zip);
    }
}





function updateByGeo(lat, lon){
    var url = "https://crossorigin.me/http://api.openweathermap.org/data/2.5/weather?lat=" + lat +
     "&lon=" + lon +
      "&APPID=" + APPID;

      sendRequest(url);
}

function updateByZip(zip){

	var url ="https://crossorigin.me/http://api.openweathermap.org/data/2.5/weather?" +
     "zip=" + zip +
      "&APPID=" + APPID;

	sendRequest(url);
} 




function sendRequest(url){
	var xmlhttp = new XMLHttpRequest();

	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			var data = JSON.parse(xmlhttp.responseText);
      var iconCode = data.weather[0].icon;
      var iconUrl = "http://openweathermap.org/img/w/" + iconCode + ".png";

        $("#icon").html("<img src='http://openweathermap.org/img/w/" + data.weather[0].icon + ".png' alt='Icon depicting current weather.'>");
        $("#des").html(data.weather[0].description);
			  $(".temperature").html(celsius(data.main.temp));
        $(".tempLetter").html('&degC')
        $("#humidity").html(data.main.humidity);
        $("#wind").html(data.wind.speed);
        $("#dir").html(degreesToDirection(data.wind.deg));



        var x = 1;
        var weatherTemp =data.main.temp;
      
       $(".c").click(function(){
      
      if (x === 0){
        $(this).slideToggle(500).slideToggle( function(){
           $(this).html('<img src="https://maxcdn.icons8.com/Color/PNG/24/Weather/thermometer-24.png" height="16px"> &deg Fahrenheit</i>');
          temp = Math.round(weatherTemp - 273.15);
           $(".temperature").html(temp);
           $(".tempLetter").html('&degC');

            return x = 1; 
          
        });
      }
        
      else if (x === 1){
      
        $(this).slideToggle(500).slideToggle( function(){
            $(this).html('<img src="https://maxcdn.icons8.com/Color/PNG/24/Weather/thermometer-24.png" height="16px"> &deg  Celsius</i>');
          temp = Math.round((weatherTemp * 9/5) - 459.67);
           $(".temperature").html(temp);
           $(".tempLetter").html('&degF');

           return x = 0;
    
        });
           
      }
      });

		}
	};

  
  
  xmlhttp.open("GET", url ,true);
  xmlhttp.send();
}


function celsius(k){
    cel =  Math.round(k - 273.15);
    return cel ;   
}



function time(date){
  var hours = date.getHours();
  var min = date.getMinutes();
  var ampm = "";
  var time = "";


    if (hours >= 12){
      ampm = "PM";
    if(hours > 12){
      hours -= 12;
    }
    }
  else if(hours === 0){
    hours = 12;
    ampm = "AM";
    
  }
    else{
      ampm = "AM";
    }

    if (min < 10){
      min = "0"+min;
    }
 
 return time = hours + ":" + min + " " + ampm;
}

function degreesToDirection(degrees){
   var range = 360/16;
    var low = 360 - range/2;
    var high = (low + range) % 360;
    var angles = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
    for( i in angles ) {
    if(degrees >= low && degrees < high){
        console.log(angles[i]);
        return angles[i];
        console.log("derp");
    }
    low = (low + range) % 360;
    high = (high + range) % 360;
    }
    return "N";
}
