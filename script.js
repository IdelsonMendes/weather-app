// API Key

const apiKey = "8fa2b334d7494ae989127517de915e8c";
var lat = -11.1855;
var lon = -40.5361;
const apiWeather = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metri&appid=${apiKey}&lang=pt_br`;

// temas

var theme1 = document.getElementById('theme1');
var theme2 = document.getElementById('theme2');
var theme3 = document.getElementById('theme3');
var theme4 = document.getElementById('theme4');

// Componentes

var main = document.getElementById('main')
var container = document.getElementById('container');
var containerAfter = window.getComputedStyle(container, '::after');
var bar = document.getElementById('bar');
var buttons = document.querySelectorAll('.buttons button');

var hora = document.getElementById('hour');
var date = document.getElementById('date');

var weatherTodayIcon = document.getElementById('weather-today-icon');
var weatherTodayTemperature = document.getElementById('weather-today-tempearature');

var locationCity = document.getElementById('location-city');
var locationCountry = document.getElementById('location-country');

var weathersTemperature = document.querySelectorAll('.weathers-week-temperature');
var weathersIcon = document.querySelectorAll('.weathers-icon');

function changeTheme(theme) {

   if (theme == 'theme1') {
      container.style.backgroundImage = "url('https://images.pexels.com/photos/2049422/pexels-photo-2049422.jpeg?auto=compress&cs=tinysrgb&w=1600')";
      bar.style.backgroundColor = '#106E85';

      for (var i = 0; i < buttons.length; i++) {
         buttons[i].style.backgroundColor = '#0B3A46';
      }

   }

   if (theme == 'theme2') {
      container.style.backgroundImage = "url('https://images.pexels.com/photos/2085998/pexels-photo-2085998.jpeg?auto=compress&cs=tinysrgb&w=1600')";
      bar.style.backgroundColor = '#19241E';

      for (var i = 0; i < buttons.length; i++) {
         buttons[i].style.backgroundColor = '#616479';
      }

   }

   if (theme == 'theme3') {
      container.style.backgroundImage = "url('https://images.pexels.com/photos/1367192/pexels-photo-1367192.jpeg?auto=compress&cs=tinysrgb&w=1600')";
      bar.style.backgroundColor = '#31322A';

      for (var i = 0; i < buttons.length; i++) {
         buttons[i].style.backgroundColor = '#4E523C';
      }

   }

   if (theme == 'theme4') {
      container.style.backgroundImage = "url('https://images.pexels.com/photos/1435075/pexels-photo-1435075.jpeg?auto=compress&cs=tinysrgb&w=1600')";
      bar.style.backgroundColor = '#AE4D0B';

      for (var i = 0; i < buttons.length; i++) {
         buttons[i].style.backgroundColor = '#7E4B3F';
      }

   }
}

// Funções do App

const getWeather = async (city) => {

   const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`;
   const res = await fetch(apiWeatherURL);
   const data = await res.json();
   //console.log(data);

   weatherTodayTemperature.innerText = parseInt(data['main']['temp']) + '°C';

   if (data['weather'][0]['main'] == 'Rain') {
      weatherTodayIcon.src = 'https://cdn-icons-png.flaticon.com/128/5903/5903459.png';
   } else if (data['weather'][0]['main'] == 'Clear') {
      weatherTodayIcon.src = 'https://cdn-icons-png.flaticon.com/128/4064/4064276.png';
   } else if (data['weather'][0]['main'] == 'Clouds') {
      weatherTodayIcon.src = 'https://cdn-icons-png.flaticon.com/128/1139/1139994.png';
   }

}

getWeather(locationCity.innerHTML);



const getWeatherForecast5daily = async (city) => {

   const apiWeatherForecast5daily = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&cnt=16&appid=${apiKey}&lang=pt_br`;
   const res = await fetch(apiWeatherForecast5daily);
   const data = await res.json();
   console.log(data);

   for (var i = 0; i < weathersTemperature.length; i++) {

      weathersTemperature[i].innerHTML = parseInt((data['list'][i]['main']['temp']) - 273) + '°C';

      if (data['list'][i]['weather'][0]['main'] == 'Rain') {
         weathersIcon[i].src = 'https://cdn-icons-png.flaticon.com/128/5903/5903459.png';
      } else if (data['list'][i]['weather'][0]['main'] == 'Clear') {
         weathersIcon[i].src = 'https://cdn-icons-png.flaticon.com/128/4064/4064276.png';
      } else if (data['list'][i]['weather'][0]['main'] == 'Clouds') {
         weathersIcon[i].src = 'https://cdn-icons-png.flaticon.com/128/1139/1139994.png';
      }

      var dt_txt = data['list'][i]['dt_txt'];

      // Converter a string para um objeto Date
      const dataHora = new Date(dt_txt);

      // Extrair a data (no formato "dd/mm/yyyy")
      const dataDT = dataHora.toLocaleDateString("pt-BR");

      // Extrair a hora (no formato "hh:mm")
      const hora = dataHora.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });

      console.log("Data:", dataDT); // Saída: Data: 25/07/2023
      console.log("Hora:", hora); // Saída: Hora: 21:00

      buttons[i].innerHTML = dataDT + '\n' + hora


   }




}

getWeatherForecast5daily(locationCity.innerHTML);

// Data

var nowDate = new Date();

const year = nowDate.getFullYear();
var month = nowDate.getMonth();
const day = nowDate.getDay();

var days = new Array("Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "sábado")
var months = new Array("Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Agosto", "Outubro", "Novembro", "Dezembro")
date.innerText = `${days[nowDate.getDay()]}, ${nowDate.getDate()} de ${months[nowDate.getMonth()]} de ${year} `;

const hour = nowDate.getHours();
const minute = nowDate.getMinutes();

if (hour < 10) {
   if (minute < 10) {
      hora.innerText = `0${hour}:0${minute}`;
   } else {
      hora.innerText = `0${hour}:${minute}`;
   }

} else {
   hora.innerText = `${hour}:${minute}`;
   if (minute < 10) {
      hora.innerText = `${hour}:0${minute}`;
   }
}


