
// Selectores
const container  = document.querySelector('.container');
const resultado  = document.querySelector('#resultado');
const formulario = document.querySelector('#formulario');

// Event listeners
window.addEventListener('load', () => {
    formulario.addEventListener('submit', buscarClima)
})



function buscarClima(e) {
    e.preventDefault();

    // Validar el formulario
    const ciudad = document.querySelector('#ciudad').value;
    const pais = document.querySelector('#pais').value;

    if (ciudad === '' || pais === '') {
        // Error
        mostrarError('Todos los campos son obligatorios');

        return;
    } else {
        console.log(`Datos agregados correctamente. Ciudad: ${ciudad} - Pais: ${pais}`);
    }

    // Consultar la API
    consultarAPI(ciudad, pais);
}

function mostrarError(mensaje) {
    const alerta = document.querySelector('bg-red-100');

    if (!alerta) {
        // Crear una alerta
        const alerta = document.createElement('div');
        alerta.classList.add('bg-red-100', 'border-red-400', 'text-red-700', 'px-4', 'py-3', 'rounded', 'max-w-md', 'mx-auto', 'mt-6', 'text-center');
        alerta.innerHTML = `
            <strong class="font-bold">Error!</strong>
            <span class="block">${mensaje}</span>
        `;
    
        container.appendChild(alerta);

        // eliminar la alerta luego de 3 seg
        setTimeout(() => {
            alerta.remove();
        }, 5000);
    };
    
};

function consultarAPI(ciudad, pais) {
    
    const appID = 'ad15a45fa598cde74bf14733f360ec58';
    const url   = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appID}`;
    
    // Spinner de carga
    spinner();
    
    fetch(url)
        .then( respuesta => respuesta.json())
        .then( datos => {
            limpiarHTML();

            if (datos.cod === "404") {
                mostrarError('Ciudad no encontrada');
                return;
            }

            // Imprime la respuesta en el HTML
            mostrarClima(datos);
        });
};

const conversorTemp = temp => parseInt(temp - 273.15);

function mostrarClima(datos) {
    const { name, main: { temp, temp_max, temp_min}} = datos;

    const centigrados = conversorTemp(temp);
    const max = conversorTemp(temp_max);
    const min = conversorTemp(temp_min);

    const nombreCiudad = document.createElement('p');
    nombreCiudad.textContent = `Clima en ${name}`;
    nombreCiudad.classList.add('font-bold', 'text-2xl'); 

    const actual = document.createElement('p');
    actual.innerHTML = `${centigrados} &#8451;`;
    actual.classList.add('font-bold', 'text-6xl');

    const tempMaxima = document.createElement('p');
    tempMaxima.innerHTML = `Max: ${max} &#8451;`;
    tempMaxima.classList.add('text-xl');

    const tempMin = document.createElement('p');
    tempMin.innerHTML = `Min: ${min} &#8451;`;
    tempMin.classList.add('text-xl');

    const resultadoDiv = document.createElement('div');
    resultadoDiv.classList.add('text-center', 'text-white');
    resultadoDiv.appendChild(nombreCiudad);
    resultadoDiv.appendChild(actual);
    resultadoDiv.appendChild(tempMaxima);
    resultadoDiv.appendChild(tempMin);

    resultado.appendChild(resultadoDiv);
}

function limpiarHTML() {
    while (resultado.firstChild) {
        resultado.removeChild(resultado.firstChild);
    }
}

function spinner() {

    limpiarHTML();
    
    const divSpinner = document.createElement('div');
    divSpinner.classList.add('sk-fading-circle');

    divSpinner.innerHTML = `
        <div class="sk-circle1 sk-circle"></div>
        <div class="sk-circle2 sk-circle"></div>
        <div class="sk-circle3 sk-circle"></div>
        <div class="sk-circle4 sk-circle"></div>
        <div class="sk-circle5 sk-circle"></div>
        <div class="sk-circle6 sk-circle"></div>
        <div class="sk-circle7 sk-circle"></div>
        <div class="sk-circle8 sk-circle"></div>
        <div class="sk-circle9 sk-circle"></div>
        <div class="sk-circle10 sk-circle"></div>
        <div class="sk-circle11 sk-circle"></div>
        <div class="sk-circle12 sk-circle"></div>
    `;

    resultado.appendChild(divSpinner);
}