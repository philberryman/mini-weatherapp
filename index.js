let photos = [];

const weatherAPI = '777c23f5bbd5f5d4147b6bc37ff8db50';
const unSplashAPI = "d7ab4c73aab34ac3669753c9065df8434e7cf8bdf9cdaf9022eba3aae46d4a07";
const locationIQKey = "0678f909bb29c0";

// https://maps.googleapis.com/maps/api/geocode/json?latlng=40.714224,-73.961452&key=AIzaSyCG_D0wN8y6YHnzRySh-p7Zsz5NoFJa8LU
// https://eu1.locationiq.com/v1/reverse.php?key=locationIQKey&lat=${lat}&lon=${long}&format=json


const getLocation = (lat, long) => {
    console.log(location);
    let url = `https://eu1.locationiq.com/v1/reverse.php?key=${locationIQKey}&lat=${lat}&lon=${long}&format=json`;
        fetch(url)
            .then(function (response) {
                return response.json();
            })
            .then(function (body) {
                getWeather(body.address.city);
            })
        }


// location goes into this function and weather comes out (and is sent to getPicture function)
const getWeather = (location) => {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${weatherAPI}`;
        fetch(url)
            .then(function (response) {
                return response.json();
            })
            .then(function (body) {
                console.log(body);
                const weather = body.weather[0].description;
                getPicture(location + ' weather ' + weather);
                weatherDisplay(weather, location);
            })
        }


// weather (from getWeather) is sent to Unsplash api. Unsplash return pictures related to the weather. These are stored in photos (a global array)
const getPicture = (weather) => {

    let url = `https://api.unsplash.com/search/photos?page=1&query=${weather}&client_id=${unSplashAPI}`;
        fetch(url)
            .then(function (response) {
                return response.json();
            })
            .then(function (body) {
                photos = body.results;
                console.log(photos);
                createThumbs();
            })
        }

// creates thumbnails using the array of photos that were created by getPicture function.
const createThumbs = () => {
    let parentNode = document.querySelector('.thumbs');
    parentNode.innerHTML = "";
    photos.forEach(item => {
        const childNode = document.createElement('img');
        childNode.src = item.urls.thumb;
        childNode.className = 'thumb';
        childNode.id = item.id;
        parentNode.appendChild(childNode);
    })
}


// creates bubblng listener that changes the main photo when thumbnail photo is clicked on. Uses photo id as a reference.
const eventListen = () => {
    const content = document.querySelector('.content');
    content.addEventListener('click', event => {
    if(event.target.matches('.thumb')){
        const result = photos.find( photo => photo.id === event.target.id );
        changePhoto(result.urls.regular);
        changeCredits(result);
        console.log(event.target.classList);
        const allThumbs = document.querySelectorAll('.thumb');
        allThumbs.forEach(item => item.className = "thumb");
        event.target.classList.toggle('active');   
    }
    });
}

// listens to the submit event. Sends input to getWeather
const submitListen = () => {
    const form = document.querySelector("form");
    const input = document.querySelector(".search__input")
    form.addEventListener("submit", event => {
    event.preventDefault();
    getWeather(input.value);
    })
}


// Changes the main photo to the identified in eventListener click event.
const changePhoto = (url) =>  {
    const parentNode = document.querySelector(".photo");
    parentNode.innerHTML = "";
    const childNode = document.createElement("img");
    childNode.src = url;
    parentNode.appendChild(childNode);

}

const changeCredits = (photo) => {
    const creditUserNode = document.querySelector('#credit-user');
    const creditUserProfile = document.querySelector('#credit-platform')
    creditUserNode.textContent = "";
    creditUserNode.href = "";
    creditUserProfile.href = "";
    creditUserNode.textContent = photo.user.name;
    creditUserNode.href = photo.user.portfolio_url;
    creditUserProfile.href = photo.user.links.html;

}

const weatherDisplay = (weather, location) => {
    const parentNode = document.querySelector("header");
    const childNode = document.createElement("p");
    childNode.textContent = "The current weather in " + location + ": " + weather;
    parentNode.appendChild(childNode);
    
}


let longLat = [];

const currentPosition = navigator.geolocation.getCurrentPosition(function(position) {
    getLocation(position.coords.latitude, position.coords.longitude);
  });




submitListen();
eventListen();






