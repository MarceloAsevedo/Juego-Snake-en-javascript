//lo del html
const tabla1 = document.getElementById('tabla');
const tablapuntos = document.getElementById('tablapunt');
const arrancador = document.getElementById('arranca');
const cagaste2 = document.getElementById('cagaste');
//config del jueguito
const tamaniotabla = 10;
const velocitodeljuego = 100;
const tiposcuadrados = {
    cuadrovacio: 0,
    cuadrovibora: 1,
    cuadrocomida: 2
}
const direcciones = {
    ArrowUp: -10,
    ArrowDown:10,
    ArrowRight: 1,
    ArrowLeft: -1,
}
//variables
let vivora;
let puntos = 0;
let direccion;
let tabladecuadros;
let cuadrosvacios;
let movimientos;



const dibujecuadro = (cuadradito, type) => {
    const [ row, column ] = cuadradito.split('');
    tabladecuadros[row][column] = tiposcuadrados[type];
    const elementodelcuadro = document.getElementById(cuadradito);
    elementodelcuadro.setAttribute('class', `cuadradito ${type}`);
    if(type === 'cuadrovacio') {
        cuadrosvacios.push(cuadradito);
    } else {
        if(cuadrosvacios.indexOf(cuadradito) !== -1) {
           cuadrosvacios.splice(cuadrosvacios.indexOf(cuadradito), 1);
        }
    }
}
const dibujevivora = () => {
    vivora.forEach( cuadradito => dibujecuadro(cuadradito, 'cuadrovivora'));
}
const movemelavivora = () => {
    const nuevocuadro = String(
        Number(vivora[vivora.length -1]) + direcciones[direccion])
        .padStart(2, '0');
        const [row, column] = nuevocuadro.split('');


        if( nuevocuadro < 0 || 
            nuevocuadro > tamaniotabla * tamaniotabla ||
            (direccion === 'ArrowRight' && column == 0) ||
            (direccion === 'ArrowLeft' && column == 9 ||
            tabladecuadros[row][column] === tiposcuadrados.cuadrovibora) ) {
            tremendomanco();
        } else {
            vivora.push(nuevocuadro);
            if(tabladecuadros[row][column] === tiposcuadrados.cuadrocomida) {
                mascomida();
            } else {
                const cuadrovacio= vivora.shift();
                dibujecuadro(cuadrovacio, 'cuadrovacio');
            }
            dibujevivora();
    
}}
const mascomida = () => {
    puntos++;
    cargapuntos();
    mandecomida();
}
const tremendomanco = () => {
    cagaste2.style.display = 'block';
    clearInterval(movimientos)
    arrancador.disabled = false;
}
const controldireccion = nuevadireccion => {
    direccion = nuevadireccion;
}
const adondevai = key =>{
    switch(key.code){
        case 'ArrowUp':
            direccion != 'ArrowDown' && controldireccion(key.code)
            break;
        case 'ArrowDown':
            direccion != 'ArrowUp' && controldireccion(key.code)
            break;
        case 'ArrowRight':
            direccion != 'ArrowLeft' && controldireccion(key.code)
            break;
        case 'ArrowLeft':
            direccion != 'ArrowRight' && controldireccion(key.code)
            break;          
    }
}

const mandecomida = () => {
    const uncuadrocualquiera = cuadrosvacios[Math.floor(Math.random() * cuadrosvacios.length)];
    dibujecuadro(uncuadrocualquiera, 'cuadrocomida');
}

const cargapuntos = () => {
    tablapuntos.innerText = puntos;
}

const creatabla = () => {
    tabladecuadros.forEach( (row, rowIndex) => {
        row.forEach( (column, columnndex) => {
            const valordecuadros = `${rowIndex}${columnndex}`;
            const elementodelcuadro = document.createElement('div');
            elementodelcuadro.setAttribute('class', 'cuadritos cuadrovacio');
            elementodelcuadro.setAttribute('id', valordecuadros);
            tabla1.appendChild(elementodelcuadro);
            cuadrosvacios.push(valordecuadros);
        })
    })
}

function preparajuego() {
    vivora = ['00', '01', '02', '03'];
    puntos = 0;
    direccion = 'ArrowRight';
    tabladecuadros = Array.from(Array(tamaniotabla), () => new Array(tamaniotabla).fill(tiposcuadrados.cuadrovacio));
    console.log(tabladecuadros);
    tabla1.innerHTML = '';
    cuadrosvacios = [];
    creatabla();
}
const arrancajuego =() => {
    preparajuego();
    cagaste2.style.display = 'none';
    arrancador.disabled = true;
    dibujevivora();
    cargapuntos();
    mandecomida();
    document.addEventListener('keydown', adondevai);
    movimientos = setInterval( () => movemelavivora(), velocitodeljuego);
}
arranca.addEventListener('click', arrancajuego);

