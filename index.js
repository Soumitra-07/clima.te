let currentCity = "Kolkata";
let units = "metric";
let city = document.querySelector(".weather--city");
let datetime = document.querySelector(".weather--datetime");
let weather_forecast = document.querySelector(".weather--forecast");
let weather_icon = document.querySelector(".weather--icon");
let weather_temp = document.querySelector(".weather--temp");
let weather_minmax = document.querySelector(".weather--MinMax");
let weather_feelslike = document.querySelector(".weather--card--temp");
let weather_humidity = document.querySelector(".weather--card--humid");
let weather_pressure = document.querySelector(".weather--card--pressure");
let weather_wind = document.querySelector(".weather--card--wind");

//for searching city
document.querySelector(".wsearch").addEventListener('submit', e => {
    let search = document.querySelector(".weather--search--form");
    //prevent default action
    e.preventDefault();
    //change city
    currentCity = search.value;
    getWeather();
})
//changing celcius to farenheit
document.querySelector(".weather--unit--c").addEventListener("click", () => {

    if (units !== "metric") {
        units = "metric"
        getWeather();
    }
})
document.querySelector(".weather--unit--f").addEventListener("click", () => {

    if (units !== "Imperial") {
        units = "Imperial"
        getWeather();
    }
})


//country code to country
function convert_Ccode(country) {
    let regions = new Intl.DisplayNames(
        ["en"], { type: "region" })
    return regions.of(country)

}
//to display accurate time n date
function convert_Time(TimeStamp, Timezone) {
    const conv = Timezone / 3600;//converts seconds to hour
    const date = new Date(TimeStamp * 1000);

    const options = {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
        timeZone: `Etc/GMT${conv >= 0 ? "-" : "+"}${Math.abs(conv)}`,
        hour12: true,
    }
    const optionsIST = {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
        timeZone: "Asia/Kolkata",
        hour12: true,
    }
    if (Timezone == 19800) {
        return date.toLocaleString("en-US", optionsIST);
    }
    else {
        return date.toLocaleString("en-US", options);
    }




}
function getWeather() {
    const API_KEY = '68d033f3d7cf9ab7c1f6b728388594a5';
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${currentCity}&appid=${API_KEY}&units=${units}`).then(res => res.json()).then(data => {
        console.log(data);
        city.innerHTML = `${data.name},${convert_Ccode(data.sys.country)}`
        datetime.innerHTML = convert_Time(data.dt, data.timezone);
        weather_forecast.innerHTML = `<p>${data.weather[0].main}`;
        weather_temp.innerHTML = `${data.main.temp.toFixed()}&#176`;
        weather_icon.innerHTML = `<img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png" />`;
        weather_minmax.innerHTML = `<p>Min:${data.main.temp_min.toFixed()} &#176</p><p> Max: ${data.main.temp_max.toFixed()} &#176 </p>`;
        weather_feelslike.innerHTML = `${data.main.feels_like.toFixed()}&#176`;
        weather_humidity.innerHTML = `${data.main.humidity}%`;
        weather_wind.innerHTML = `${data.wind.speed} ${units == "metric" ? "m/s" : "mph"
            }`;
        weather_pressure.innerHTML = `${data.main.pressure} hPa`;



    }
    )


}
document.body.addEventListener("load", getWeather())