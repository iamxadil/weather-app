//Selectors
const content = document.querySelector("#weather-container");
const clock = document.querySelector(".clock");
const date = document.querySelector(".date");
const status = document.querySelector(".status");
const temp = document.querySelector(".temp");
const loc = document.querySelector(".location");
const sideBar = document.querySelector(".side-bar");
const list = document.querySelectorAll(".side-bar ul li");
const humidity = document.querySelectorAll(".humidity");
const hamburger = document.querySelector(".hamburger");
const searchBtn = document.querySelector(".btn");
const key = `4cecd5fbd2292d0dae99f84a2ae8dbf9`;

//Variable and Arrays
isRight = true;
isOn = true;
const info = Array.from(list);
const details = [temp, loc, status];
const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wedenesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

//Events
hamburger.addEventListener("click", () => {
  if (isRight) {
    sideBar.style.right = "0";
    isRight = false;
    info.forEach((e) => {
      setTimeout(() => {
        e.style.opacity = "1";
      }, 500);
    });
  } else {
    sideBar.style.right = "-100%";
    list.forEach((e) => {
      e.style.opacity = "0";
    });
    isRight = true;
  }
});

//Setting Time

setInterval(() => {
  //Setting Up Some Stuff

  let time = new Date();
  let hours = time.getHours();
  let minutes = time.getMinutes();
  let seconds = time.getSeconds();
  let day = time.getDay();
  let mDay = time.getDate();
  let month = time.getMonth();
  let AmPm = hours >= 12 ? "PM" : "AM";
  let hrFormat = hours >= 13 ? hours % 12 : hours;
  let hr = hrFormat < 10 ? "0" + " " + hrFormat : hrFormat;
  let min = minutes < 10 ? "0" + " " + minutes : minutes;

  //Displaying
  clock.innerHTML = `${hr} : ${min} : ${seconds}  ${AmPm}`;
  date.innerHTML = `${days[day]}, ${mDay} ${months[month]}`;
}, 1000);

//Loading Page
loadWeather();
function loadWeather() {
  navigator.geolocation.getCurrentPosition((position) => {
    let { latitude, longitude } = position.coords;
    fetch(
      `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${key}`
    )
      .then((response) => response.json())
      .then((data) => {
        content.style.backgroundImage = `linear-gradient(90deg, rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('https://source.unsplash.com/1920x1080/?"${data.weather[0].description}')`;

        list[0].innerHTML = `Humidity&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>${data.main.humidity}%</span>`;
        list[1].innerHTML = `Wind Speed&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>${data.wind.speed}Km/h</span>`;
        list[2].innerHTML = `Feels Like&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>${data.main.feels_like}</span>`;

        setTimeout(() => {
          loc.innerHTML = ` ${data.sys.country}, ${data.name} `;
          temp.innerHTML = `${Math.floor(data.main.temp)}℃`;
          status.innerHTML = `${data.weather[0].description.toUpperCase()}`;
        }, 550);

        setTimeout(() => {
          details.forEach((e) => {
            e.style.opacity = "1";
          });
        }, 550);
      });
  });
}



//Search
searchBtn.addEventListener("click", () => {
  let input = document.querySelector("input");
  async function getWeather() {
    const fetching = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${input.value}&units=metric&appid=${key}`
    );
    const res = await fetching.json();
    content.style.backgroundImage = `linear-gradient(90deg, rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('https://source.unsplash.com/1600x900/?"${res.weather[0].description}')`;

    details.forEach((e) => {
      e.style.opacity = "0";
    });

    list[0].innerHTML = `Humidity&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>${res.main.humidity}%</span>`;
    list[1].innerHTML = `Wind Speed&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>${res.wind.speed}Km/h</span>`;
    list[2].innerHTML = `Feels Like&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>${res.main.feels_like}</span>`;

    setTimeout(() => {
      loc.innerHTML = ` ${res.sys.country}, ${res.name} `;
      temp.innerHTML = `${Math.floor(res.main.temp)}℃`;
      status.innerHTML = `${res.weather[0].description.toUpperCase()}`;
    }, 550);

    setTimeout(() => {
      details.forEach((e) => {
        e.style.opacity = "1";
      });
    }, 550);
  }
  window.addEventListener("keyup", (e) => {
    if (e.key == "Enter") {
      getWeather();
    }
  });
  getWeather();
});
