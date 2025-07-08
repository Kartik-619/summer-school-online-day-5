const url = "http://api.weatherapi.com/v1/current.json"
const key = "0373ff36f431463fb6343150250807"
const temp = document.querySelector(".text");
const butt=document.getElementById("butt");
function Find_location() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(success, error);
    } else {
        console.log("geolocation api not accessible")
    }
}

function success(position) {
    const lat = position.coords.latitude;;
    const long = position.coords.longitude;;
    console.log("latitude:", position.coords.latitude);

    console.log("longitude:", position.coords.longitude);
    find_weather(lat, long);
}
function error() {
    console.log("cant access the location")
}

butt.addEventListener("click",Find_location);
async function find_weather(lat, long) {
    try {
        const response = await fetch(`${url}?key=${key}&q=${lat},${long}&lang=en`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
       

        

      
        const data = await response.json();
        console.log(data);
        
        const img = document.createElement('img');
        img.src = `https:${data.current.condition.icon}`;
        img.alt = data.current.condition.text;
        img.style.width = '100px';
        img.style.height = 'auto';
        document.querySelector('.img').appendChild(img);
        document.querySelector('.im1').innerHTML=`<h2>:${data.location.name}</h2>
                                                <h4> Weather :${data.current.condition.text}</h4>`;
        temp.innerHTML = `<p> Temp: ${data.current.temp_c}°C</p>
                          <p> Humidity : ${data.current.humidity}</p>`;
        
       
        
    } catch (error) {
        console.log(error);
    }


}
