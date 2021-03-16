

// get elements from html 

let timeZone = document.querySelector('.location-timezone');
let icon = document.querySelector('.location > p img');
let temperature = document.querySelector('.temperature-degree');
let temperatureDesc = document.querySelector('.temperature-description > b');
let temperatureType = document.querySelector(".degree-section > span");

let form = document.querySelector('form');
let cityName = document.getElementById('cityName');


// fetch data 
function fetchData(name = "Casablanca"){
    
   let request = new XMLHttpRequest();

    request.onreadystatechange = () => {
       
       if (request.status == 200 && request.readyState == 4) {

         let theApiInformation = JSON.parse(request.responseText);

           handelInformation(theApiInformation);
           console.log(theApiInformation);
       }
    }
   request.open( "GEt" , `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=b91101d48cdde5705f7ed670b2f4a6a0` , true );
   request.send();
}

window.addEventListener('load' , fetchData());

form.addEventListener('submit' , (e) => {
   e.preventDefault();
   let value = cityName.value.toLowerCase();
    // make the first letter upperCase
   let lastSlice = value.slice(1);
   let firstLetter = value.charAt(0).toUpperCase();

   let lastValue = firstLetter + lastSlice;
   
   // send the name to fetch data
   fetchData(lastValue);

   cityName.value = "";

})


// handela the data
const handelInformation = ({ name , weather , main }) => {

   let information = weather[0];

   console.log(weather);

   timeZone.innerHTML = name;
   temperature.innerHTML = Math.floor( main.temp - 273.15 );
   temperatureType.innerHTML = "°C";
   temperatureDesc.innerHTML = information.description;
   icon.src = `http://openweathermap.org/img/wn/${information.icon}@2x.png`;

}

