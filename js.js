$(document).ready(function(){
		/* $("body").css("background-image", "url('img/giphy.gif')"); */
		
		
		var lattitude;
		var longitude;
  var icons = new Skycons({"color": "orange"});
		icons.set("partly-cloudy-day", Skycons.PARTLY_CLOUDY_DAY);
		icons.play();
		 var toggleC = true;
	 if (navigator.geolocation) {
	navigator.geolocation.getCurrentPosition(function(position) {
		lattitude = position.coords.latitude;
		longitude = position.coords.longitude;
    /* $("#data").html("latitude: " + position.coords.latitude + "<br>longitude: " + position.coords.longitude);
	*/console.log("lat "+lattitude);
	 
	var api='https://crossorigin.me/http://api.openweathermap.org/data/2.5/weather?lat='+lattitude+'&lon='+longitude+'&appid=518b05d055aad92f54e053f3b2221c12';
	console.log(api);
	$.getJSON(api, function(data){
		var weatherType=data.weather[0].description;
		var kelvin = data.main.temp;
		var celcius = Math.round(kelvin-273.15);
		var fahren = Math.round(kelvin*(9/5)-459.67);
		var city=data.name;
		/* var cl=data.clouds.all; */
		console.log(weatherType);
    	
		String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}
		
		var z = weatherType.capitalize();
		//console.log("capital "+z);
    
    
		console.log("Hello "+weatherType);
			/* console.log("city "+city);
			console.log("temp "+celcius);
			console.log("temp "+fahren); */
			console.log("temp "+data.main);
		$('.city').text(city);
		$('.temp').text(fahren+'\xB0'+" F");
	
		 $('#icon')
        .append("<img src='http://openweathermap.org/img/w/" + data.weather[0].icon + ".png'>");
		
		$('.clouds').text(z);
		$('.toggle').on('click', function() {
			if (toggleC == true) {
			  toggleC = false;
			  $('.temp').text(fahren + '\xB0' + " F");
			} else if (toggleC == false) {
			  toggleC = true;
			  $('.temp').text(celcius +'\xB0' +" C");
				}
		});
		
		
if(weatherType=="clear sky" || weatherType=="calm") {
	$("body").css({"backgroundImage": "url('http://res.cloudinary.com/ddqhcwp8j/image/upload/v1469647030/resort-863129_wpglwb.jpg')","backgroundRepeat":"no-repeat"}); 
	$("a").css("color","black"); 
}
else if(weatherType=="scattered clouds" || weatherType== "few clouds"|| weatherType== "broken clouds" || weatherType== "overcast clouds") {
	$("body").css({"background-image": "url('http://res.cloudinary.com/ddqhcwp8j/image/upload/v1469647014/pigs-and-garden-011_jens92.jpg')"}); 
	$("a").css("color","black"); 
}
else if(weatherType=="shower rain" ||  weatherType== "light intensity shower rain" || weatherType== "ragged shower rain"|| weatherType== "light rain"|| weatherType== "light intensity drizzle" || weatherType== "drizzle" || weatherType== "heavy intensity drizzle" || weatherType== "light intensity drizzle rain "|| weatherType== "drizzle rain" || weatherType== "heavy intensity drizzle rain" || weatherType== "shower rain and drizzle" ||  weatherType== "heavy shower rain and drizzle" ||  weatherType== "shower drizzle" || weatherType== "light intensity shower rain" || weatherType== "heavy intensity shower rain") {
	$("body").css({"backgroundImage": "url('http://res.cloudinary.com/ddqhcwp8j/image/upload/v1469646986/gif___running_through_the_rain_by_turst67-d6scius_asxoux.gif')","backgroundRepeat":"no-repeat"});
  $("h1,h2").css("color","white");
}
else if(weatherType=="very heavy rain" || weatherType== "moderate rain"|| weatherType== "heavy intensity rain" || weatherType== "very heavy rain" || weatherType== "extreme rain" || weatherType== "freezing rain" || weatherType== "heavy intensity shower rain") {
	$("body").css({"backgroundImage": "url('http://res.cloudinary.com/ddqhcwp8j/image/upload/v1469647006/rain-758107_kyvspy.jpg')"});
}
else if(weatherType=="thunderstorm" || weatherType== "light thunderstorm" || weatherType== "heavy thunderstorm"|| weatherType== "ragged thunderstorm") {
	$("body").css("background-image","url('http://res.cloudinary.com/ddqhcwp8j/image/upload/v1469646977/giphy_1_p1slkg.gif')");
	$("h1,h2").css("color","white");
}
else if(weatherType=="thunderstorm with rain" || weatherType== "thunderstorm with light rain" || weatherType== "thunderstorm with heavy rain" || weatherType==  "thunderstorm with light drizzle" || weatherType== "thunderstorm with drizzle" ||  weatherType== "thunderstorm with heavy drizzle") {
	$("body").css("background-image", "url('http://res.cloudinary.com/ddqhcwp8j/image/upload/v1469646977/giphy_1_p1slkg.gif')");
  $("h1,h2").css("color","white");
  
}
else if(weatherType=="snow" || weatherType== "light snow"|| weatherType== "heavy snow"|| weatherType== "sleet"|| weatherType== "shower sleet"|| weatherType== "light rain and snow"|| weatherType== "rain and snow"|| weatherType== "light shower snow"|| weatherType== "shower snow" || weatherType== "heavy shower snow") {
	$("body").css({"backgroundImage": "url('http://res.cloudinary.com/ddqhcwp8j/image/upload/v1469646981/crystals-335429_qyqld0.jpg')","backgroundRepeat":"no-repeat","backgroundPosition":"fixed center bottom no-repeat"});
	$("a").css({"color":"#161d24"});
}
else if(weatherType=="mist" || weatherType== "smoke" || weatherType==  "haze" || weatherType==  "sand,dust whirls"|| weatherType== "fog"|| weatherType== "sand"|| weatherType== "dust"|| weatherType==  "volcanic ash" || weatherType== "squalls") {
	$("body").css("background-image", "url('http://res.cloudinary.com/ddqhcwp8j/image/upload/v1469646986/mist_fcjita.jpg')");
}
else if(weatherType=="tornado" || weatherType== "tropical storm") {
	$("body").css("background-image", "url('http://res.cloudinary.com/ddqhcwp8j/image/upload/v1469647053/thunderstorm_an_puhyjg.gif')");
	$("h1").css("color","#f6f8f9");
}
else if(weatherType=="hurricane"|| weatherType== "severe gale" || weatherType== "violent storm"){
	$("body").css("background-image","url('http://res.cloudinary.com/ddqhcwp8j/image/upload/v1469647516/hQ1nLwL_sygkaw.gif')");
	$("h1").css("color","#f6f8f9");
}
else if(weatherType=="hot"){
	$("body").css("background-image","url('http://res.cloudinary.com/ddqhcwp8j/image/upload/v1469738028/sunset-473345_lnjv67.jpg')");
	$("a").css("color","black");
}
else if(weatherType=="windy"){
	$("body").css("background-image","url('http://res.cloudinary.com/ddqhcwp8j/image/upload/v1469647878/grass-354737_1920_jltzfa.jpg')")
	$("h1").css("color","#f6f8f9");
}
else if(weatherType=="light breeze") {
	$("body").css("background-image","url('http://res.cloudinary.com/ddqhcwp8j/image/upload/v1469647011/sunset-731307_uwwaah.jpg')")
	$("h1").css("color","black");
}
else if(weatherType=="fresh breeze" ||weatherType=="gentle breeze" ||weatherType=="moderate breeze") {
	$("body").css("background-image","url('http://res.cloudinary.com/ddqhcwp8j/image/upload/v1469646980/grass-520912_1920_rt31wy.jpg')")
	$("h1").css("color","#f6f8f9");
}
else {
	$("body").css("background-image","url('http://res.cloudinary.com/ddqhcwp8j/image/upload/v1469738291/clouds-1194912_e80cqb.jpg')","backgroundRepeat","no-repeat","backgroundPosition","fixed center bottom no-repeat");
} 
		
		
  });
	 });

	}
	
	});
	
  


