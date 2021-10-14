"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const button = document.getElementById('pulsa');
const texto = document.getElementById('chiste');
const form = document.getElementById('form');
const temps = document.getElementById('temps');
const root = document.querySelector(':root');
let newJoke;
let report;
const reportAcudits = [];
let idInput;
let backgroundColor = 0;
if (button) {
    button.addEventListener('click', () => {
        let random = Math.floor(Math.random() * 2);
        if (random === 0)
            getDadJoke();
        else
            getChuckJoke();
        if (form === null || form === void 0 ? void 0 : form.classList.contains('joke-box__form--visible')) {
            saveReport();
        }
        else
            form === null || form === void 0 ? void 0 : form.classList.add('joke-box__form--visible');
        report = {
            joke: newJoke,
            score: '0',
            date: new Date().toISOString()
        };
        random = Math.floor(Math.random() * 5);
        while (random === backgroundColor)
            random = Math.floor(Math.random() * 5);
        backgroundColor = random;
        if (root) {
            root.style.setProperty('--background', `url('../assets/images/backgroundMain/blob${backgroundColor}.svg')`);
            root.style.setProperty('--background-before', `url('../assets/images/backgroundLeft/blob${backgroundColor}-before.svg')`);
            root.style.setProperty('--background-after', `url('../assets/images/backgroundRight/blob${backgroundColor}-after.svg')`);
        }
    });
}
// Fetch API Dadjokes
const getDadJoke = () => __awaiter(void 0, void 0, void 0, function* () {
    const url = 'https://icanhazdadjoke.com/';
    const response = yield fetch(url, {
        headers: {
            'Accept': 'application/json'
        }
    });
    const joke = yield response.json();
    newJoke = joke.joke;
    if (texto)
        texto.textContent = `" ${newJoke} "`;
});
// Fetch API Chuck Norris
const getChuckJoke = () => __awaiter(void 0, void 0, void 0, function* () {
    const url = 'https://api.chucknorris.io/jokes/random';
    const response = yield fetch(url);
    const joke = yield response.json();
    newJoke = joke.value;
    if (texto)
        texto.textContent = `" ${newJoke} "`;
});
form === null || form === void 0 ? void 0 : form.addEventListener('change', (e) => {
    const target = e.target;
    idInput = target.id;
    report.score = target.value;
});
const saveReport = () => {
    reportAcudits.push(report);
    const input = document.getElementById(idInput);
    if (input)
        input.checked = false;
};
//Fecth API Weather
const getWeather = (lon, lat) => __awaiter(void 0, void 0, void 0, function* () {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=731c48d38ef1b7cc54c3e98af3404213&units=metric&lang=es`;
    const response = yield fetch(url);
    const weather = yield response.json();
    const temp = Math.floor(weather.main.temp);
    const icon = weather.weather[0].icon;
    if (temps)
        temps.innerHTML = `<img src="https://openweathermap.org/img/wn/${icon}.png"/><span>${temp} ºC</span>`;
});
//Weather API load
window.addEventListener('load', () => {
    let lon;
    let lat;
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            lon = position.coords.longitude;
            lat = position.coords.latitude;
            getWeather(lon, lat);
        });
    }
});
