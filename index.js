let photos = [];

const weatherAPI = '777c23f5bbd5f5d4147b6bc37ff8db50';


const getWeather = (location) => {
    var url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${weatherAPI}`;
        fetch(url)
            .then(function (response) {
                return response.json();
            })
            .then(function (body) {
                const weather = body.weather[0].main;
                console.log(weather);
                getPicture(weather);
            })
        }


const unSplashAPI = "d7ab4c73aab34ac3669753c9065df8434e7cf8bdf9cdaf9022eba3aae46d4a07";

const getPicture = (weather) => {
    var url = `https://api.unsplash.com/search/photos?page=1&query=${weather}&client_id=${unSplashAPI}`;
        fetch(url)
            .then(function (response) {
                return response.json();
            })
            .then(function (body) {
                photos = body.results;
                createThumbs(body.results);
            })
        }

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



const eventListen = () => {
    const content = document.querySelector('.content');
    content.addEventListener('click', event => {
    if(event.target.matches('.thumb')){
        const result = photos.find( photo => photo.id === event.target.id );
        // console.log(result.urls.full);
        console.log(result.urls.small);
        changePhoto(result.urls.small);
    }
    if(event.target.matches('form')){
        getWeather(event.target.value)
    }
    });
}

const submitListen = () => {
    const form = document.querySelector("form");
    const input = document.querySelector(".search__input")
    form.addEventListener("submit", event => {
    event.preventDefault();
    console.log(input.value);
    getWeather(input.value);
    })
}



const changePhoto = (url) =>  {
    const parentNode = document.querySelector(".photo");
    parentNode.innerHTML = "";
    const childNode = document.createElement("img");
    childNode.src = url;
    parentNode.appendChild(childNode);
}




submitListen();
getWeather('Sydney');
eventListen();


