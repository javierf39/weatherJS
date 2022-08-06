let key = "0890015d54c2a0957c03c6547024f7ed"

document.addEventListener('DOMContentLoaded', () => {
    navigator.geolocation.getCurrentPosition(exito)
});

const exito = (pos) => {
    const la = pos.coords.latitude;
    const lon = pos.coords.longitude;

    fetch(`http://api.weatherstack.com/current?access_key=${key}&query=${la},${lon}&units=m`)
        .then(data => data.json())
        .then(data => {
            getLocation(data.location.name, "location")
            getTemperature(data.current.temperature, "degrees")
            getIcon(data.current.weather_icons[0], "iconTemp")
            getRain(data.current.precip, "percentage")
            console.log(data)
        })
}

const searchCity = () => {
    let city = document.getElementById("city").value;
    let newCity = document.getElementById("new-city")
    if (city.length > 0) {
        newCity.removeAttribute("style")

        fetch(`http://api.weatherstack.com/current?access_key=${key}&query=${city}&units=m`)
            .then(data => data.json())
            .then(data => {
                console.log(data)
                getLocation(data.location.name, "locationNew")
                getTemperature(data.current.temperature, "degreesNew")
                getIcon(data.current.weather_icons[0], "iconTempNew")
                getRain(data.current.precip, "percentageNew")

            })
    }


}

const getLocation = (location, id) => {
    let loc = document.getElementById(id);
    loc.textContent = location
}

const getTemperature = (temperature, id) => {
    let tem = document.getElementById(id);
    tem.textContent = temperature + " °C"
}

const getIcon = (url, id) => {
    let icon = document.getElementById(id);
    icon.src = url
}

const getRain = (percentage, id) => {
    let porc = document.getElementById(id);
    porc.textContent = (percentage * 100) + ' %'
}