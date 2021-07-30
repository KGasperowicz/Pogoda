const input = document.querySelector('input');
const btn = document.querySelector('button');

const cityName = document.querySelector('.city-name');
const warning = document.querySelector('.warning');
const icon = document.querySelector('.icon');
const bcgimage = document.querySelector('body');


const weather = document.querySelector('.weather');
const temperature = document.querySelector('.temp');
const humidity = document.querySelector('.humidity');
const wind = document.querySelector('.wind');
const pressure = document.querySelector('.airpressure');
const sunrisetext = document.querySelector('.sunrise');
const sunsettext = document.querySelector('.sunset');

const apiLink = 'https://api.openweathermap.org/data/2.5/weather?q=';
const apiKey = '&appid=733677895883c5f7f9896605f6b66748';
const units = '&units=metric';
const lang = '&lang=pl';

let city;
let url;  // link &kluczApi &jednostki
let mediaindex = 'default';
let interval = null;

const addzero = (x) => {
    if (x < 10) {
        return '0' + x;
    } 
    return x;
}

const media = {
    storm: {
        icon: 'img/7w.png',
        backgrounds: ['backgrounds/storm1.jpg', 'backgrounds/storm2.jpg', 'backgrounds/storm3.jpg']
    },
    rain1: {
        icon: 'img/6w.png',
        backgrounds: ['backgrounds/rain1.jpg', 'backgrounds/rain2.jpg','backgrounds/rain3.jpg', 'backgrounds/rain4.jpg']
    },
    rain2: {
        icon: 'img/5w.png',
        backgrounds: ['backgrounds/rain1.jpg', 'backgrounds/rain2.jpg','backgrounds/rain3.jpg', 'backgrounds/rain4.jpg']
    },
    snow: {
        icon: 'img/8w.png',
        backgrounds: ['backgrounds/snow1.jpg', 'backgrounds/snow2.jpg', 'backgrounds/snow3.jpg', 'backgrounds/snow4.jpg']
    },
    fog: {
        icon: 'img/9w.png',
        backgrounds: ['backgrounds/fog1.jpg', 'backgrounds/fog2.jpg', 'backgrounds/fog3.jpg', 'backgrounds/fog4.jpg', 'backgrounds/fog5.jpg']
    },
    clearsky: {
        icon: 'img/1w.png',
        backgrounds: ['backgrounds/sunny1.jpg', 'backgrounds/sunny2.jpg', 'backgrounds/sunny3.jpg','backgrounds/sunny4.jpg', 'backgrounds/sunny5.jpg','backgrounds/sunny6.jpg', 'backgrounds/sunny7.jpg']
    },
    clouds1: {
        icon: 'img/2w.png',
        backgrounds: ['backgrounds/cloudsa1.jpg', 'backgrounds/cloudsa2.jpg', 'backgrounds/cloudsa3.jpg', 'backgrounds/cloudsa4.jpg']
    },
    clouds2: {
        icon: 'img/3w.png',
        backgrounds: ['backgrounds/cloudsb1.jpg', 'backgrounds/cloudsb2.jpg', 'backgrounds/cloudsb3.jpg', 'backgrounds/cloudsb4.jpg']
    },
    clouds3: {
        icon: 'img/4w.png',
        backgrounds: ['backgrounds/cloudsc1.jpg', 'backgrounds/cloudsc2.jpg', 'backgrounds/cloudsc3.jpg', 'backgrounds/cloudsc4.jpg']
    },
    default: {
        icon: 'img/2w.png',
        backgrounds: ['backgrounds/default.jpg']
    }

}

const randompick = (a) => {
    return a[Math.floor(Math.random() * a.length)]
};


const getWeather = () => {
    city = (!input.value) ? 'Poznań' : input.value;
  
    url = apiLink + city + lang + apiKey + units ;
    //https://api.openweathermap.org/data/2.5/weather?q= NAZWA-MIASTA &apiid=733677895883c5f7f9896605f6b66748 &units-metric
    if(interval) {
        clearInterval(interval);
    };
   
    warning.textContent = '';
    axios.get(url)
        .then(res => {
            const temp = res.data.main.temp;
            const press = res.data.main.pressure;
            const hum = res.data.main.humidity;
            const windspeed = res.data.wind.speed;
            const sunrise = res.data.sys.sunrise;
            const sunset = res.data.sys.sunset;

            const sunriseDate = new Date(sunrise * 1000);
            const sunsetDate = new Date(sunset * 1000);

    


            const status = Object.assign({}, ...res.data.weather)
            console.log(status.id);

            cityName.textContent = res.data.name;
            weather.textContent = status.description;
            temperature.textContent = Math.round(temp) + '°C';
            humidity.textContent = hum + '%';
            wind.textContent = Math.round(windspeed) + ' m/s';
            pressure.textContent = press + 'hPa';
            sunrisetext.textContent = addzero(sunriseDate.getHours()) + ' : ' + addzero(sunriseDate.getMinutes());
            sunsettext.textContent = addzero(sunsetDate.getHours()) + ' : ' + addzero(sunsetDate.getMinutes());

            
            input.value = '';
            

            if (status.id >= 200 && status.id < 300) {
                mediaindex = 'storm';
                // icon.setAttribute('src', 'img/7w.png') //burza
                // bcgimage.style.backgroundImage = "url(backgrounds/storm.jpg)"

            } else if (status.id >= 300 && status.id < 400) {
                mediaindex = 'rain1';
                // icon.setAttribute('src', 'img/6w.png') //deszcz słonce za chmurką
                // bcgimage.style.backgroundImage = "url(backgrounds/rain2.jpg)"

            } else if (status.id >= 500 && status.id < 600) {
                mediaindex = 'rain2';
                // icon.setAttribute('src', 'img/5w.png') // deszcz
                // bcgimage.style.backgroundImage = "url(backgrounds/rain3.jpg)"

            } else if (status.id >= 600 && status.id < 700) {
                mediaindex = 'snow';
                // icon.setAttribute('src', 'img/8w.png') // snieg
                // bcgimage.style.backgroundImage = "url(backgrounds/snow1.jpg)"

            } else if (status.id >= 700 && status.id < 800) {
                mediaindex = 'fog';
                // icon.setAttribute('src', 'img/9w.png') // mgła
                // bcgimage.style.backgroundImage = "url(backgrounds/fog.jpg)"

            } else if (status.id === 800) {
                mediaindex = 'clearsky';
                // icon.setAttribute('src', 'img/1w.png') // czyste niebo
                // bcgimage.style.backgroundImage = "url(backgrounds/sunny3.jpg)"

            } else if (status.id === 801) {
                mediaindex = 'clouds1';
                // icon.setAttribute('src', 'img/2w.png') // male zachmurzenie
                // bcgimage.style.backgroundImage = "url(backgrounds/clouds1.jpg)"
                
            } else if (status.id === 802) {
                mediaindex = 'clouds2';
                // icon.setAttribute('src', 'img/3w.png') // zachmurzenie
                // bcgimage.style.backgroundImage = "url(backgrounds/clouds2.jpg)"
                
            } else if (status.id === 803 || status.id === 804) {
                mediaindex = 'clouds3';
                // icon.setAttribute('src', 'img/4w.png') // pełne zachmurzenie
                // bcgimage.style.backgroundImage = "url(backgrounds/rain1.jpg)"
            } else {
                mediaindex = 'default';
                // icon.setAttribute('src', 'img/2w.png')
                // bcgimage.style.backgroundImage = "url(backgrounds/default.jpg)"
            }

            let selectedmedia = media[mediaindex]

            icon.setAttribute('src', selectedmedia.icon) // pełne zachmurzenie
            bcgimage.style.backgroundImage = `url(${randompick(selectedmedia.backgrounds)})`

            
                
            interval = setInterval( () => {
                let selectedmedia = media[mediaindex]
                bcgimage.style.backgroundImage = `url(${randompick(selectedmedia.backgrounds)})`
            }, 6000);



            console.log(selectedmedia);
        })
        .catch(() => warning.textContent='wpisz poprawną nazwę miasta')
};

const enterCheck = (event) => {
    if(event.keyCode === 13) {
        getWeather();
    }
};






// function changeBcg() {
//     const images = [
//         'url(backgrounds/sunny2.jpg)',
//         'url(backgrounds/sunny1.jpg)',
//         'url(backgrounds/sunny3.jpg)',
//     ]
//     const bcg = images[Math.floor(Math.random() * images.length)];
//     background.style.backgroundImage = bcg;
// };
// setInterval(changeBcg, 6000);




getWeather();
btn.addEventListener('click', getWeather)
input.addEventListener('keyup', enterCheck)


