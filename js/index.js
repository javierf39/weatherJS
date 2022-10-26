//APIKEY OPENWEATHER
const key = "224f081fa3b806a5b2a9c12d99bc2c48";
//CONTENEDORES DE INFORMACION (DOM)
const ciudadGeo = document.querySelector("#tu-clima");
const ciudadBuscada = document.querySelector("#ciudad-buscada");

//CONSULTAR GEOLOCALIZACION, CARGANDO EL ARCHIVO
document.addEventListener('DOMContentLoaded', () => {
    navigator.geolocation.getCurrentPosition(exito)
});

//FUNCION CARGA DATOS DE CLIMA LOCAL
const exito = (pos) => {
    const la = pos.coords.latitude;
    const lon = pos.coords.longitude;

    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${la}&lon=${lon}&lang=es&appid=${key}&units=metric`)
        .then(datos => datos.json())
        .then(datos => {
            if (datos.cod !== '404') {
                mostrarInfo(ciudadGeo, datos);
            } else {
                mensajeError(ciudadGeo);
            }
        });
};

//FUNCION CARGAR CLIMA DE CIUDAD BUSCADA
const buscarCiudad = () => {
    let busqueda = document.querySelector(".buscador").value;
    let spinner = document.querySelector(".spinner-border");
    ciudadBuscada.innerHTML = "";

    if (busqueda) {
        spinner.classList.remove("ocultar");
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${busqueda}&lang=es&appid=${key}&units=metric`)
            .then(datos => datos.json())
            .then(datos => {
                if (datos.cod === '404') {
                    spinner.classList.add("ocultar");
                    mensajeError(ciudadBuscada);
                } else {
                    spinner.classList.add("ocultar");
                    mostrarInfo(ciudadBuscada, datos);
                }
            });
    } else {
        mensajeError(ciudadBuscada);
    };
};

//FORMATO A CARGAR INFO DE CLIMA
const mostrarInfo = (contenedor, datos) => {
    contenedor.innerHTML = `
        <h5>Ciudad de ${datos.name}</h5>
        <img src="http://openweathermap.org/img/wn/${datos.weather[0].icon}@2x.png" alt="Icono Clima">
        <h1>${Math.trunc(datos.main.temp)} C°</h1>
        <p>Sensación térmica: ${Math.trunc(datos.main.feels_like)} C°</p>
        <p>Min: ${Math.trunc(datos.main.temp_min)} C°</p>
        <p>Max: ${Math.trunc(datos.main.temp_max)} C°</p>
    `;
};

//MENSAJE DE ERROR AL CARGAR INFO
const mensajeError = (contenedor) => {
    contenedor.innerHTML = `
    <div class="mensaje-error">
        <h3>Ciudad no encontrada</h3>
        <h5>Ingrese una nueva ciudad</h5>
    </div>
    `;
};