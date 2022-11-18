//! Creacion de objetos

class Productos {
  constructor(id, nombre, precio, img) {
    this.id = id;
    this.nombre = nombre;
    this.precio = precio;
    this.img = img;
    this.cantidad = 1;
  }
}

/*  */
const modeloA = new Productos(1, "Modelo A", 199, "img/modelo-x.svg");
const modeloB = new Productos(2, "Modelo B", 249, "img/modelo-x.svg");
const modeloC = new Productos(3, "Modelo C", 299, "img/modelo-x.svg");
const modeloX = new Productos(4, "Modelo X", 349, "img/modelo-y.svg");
const modeloY = new Productos(5, "Modelo Y", 499, "img/modelo-y.svg");
const modeloZ = new Productos(6, "Modelo Z", 599, "img/modelo-y.svg");
const modeloPro = new Productos(7, "Tech Pro", 699, "img/modelo-z.svg");
const modeloPremium = new Productos(8, "T Premium", 899, "img/modelo-z.svg");
const modeloTGaming = new Productos(9, "T Gaming", 999, "img/modelo-z.svg");
//! Array de productos

const productos = [
  modeloA,
  modeloB,
  modeloC,
  modeloX,
  modeloY,
  modeloZ,
  modeloPro,
  modeloPremium,
  modeloTGaming,
];
console.log(productos);

//! ARRAY CARRITO

let carrito = [];
// Cargar carrito desde el LS. Si hay algo en el LS lo cargamos en el carrito, sino se inicializa vacio
if(localStorage.getItem('carrito')){
    carrito = JSON.parse(localStorage.getItem('carrito'))
}

//! MODIFICAMOS EL DOM

const contenedorProductos = document.getElementById("contenedorProductos"); //vinculamos la const con el div contenedor

//! FUNCION PARA MOSTRAR LOS PRODUCTOS

const mostrarProductos = () => {
  productos.forEach((producto) => {
    const card = document.createElement("div"); // Creamos un div
    card.classList.add("col-xl-4", "col-md-6", "col-xs-6"); // con este metodo le añadimos una clase de bootstrap a la card creada anteriormente
    card.innerHTML = ` 
        <div class= 'card'>
            <img src = '${producto.img}' class='card-img-top imgProductos' alt='${producto.nombre}'>
            <div class='card-body'>
            <h5 class='card-title text-center'> ${producto.nombre} </h5>
            <p class='card-text text-center precio'> ${producto.precio} $</p>
            <button class="btn colorBoton" id="boton${producto.id}">Agregar al carrito </button>
            </div>
        </div>
        `; // contenido de la card
    contenedorProductos.appendChild(card); // pegamos el contenido en el div

    //? BOTON agregar al carrito
    const boton = document.getElementById(`boton${producto.id}`); // Toma de manera dinamica cada id
    boton.addEventListener("click", () => {
      // pasamos dos parametros: funcion y evento
      agregarAlCarrito(producto.id);
    });
  });
};

//! INVOCAR A LA FUNCION

mostrarProductos() // ejecutamos la funcion

//! FUNCION AGREGAR AL CARRITO

const agregarAlCarrito = (id) => {
    const producto = productos.find(producto => producto.id === id)
    const productoEnCarrito = carrito.find(producto=> producto.id === id)
    if(productoEnCarrito){
        productoEnCarrito.cantidad++ // si el producto añadido ya se encuentra en el carrito, modifica la cantidad en +1
    } else {
        carrito.push(producto)

        //* ALMACENAMOS EN LOCAL STORAGE
        localStorage.setItem('carrito',JSON.stringify(carrito))
    }
    calcularTotal()
}

//! MOSTRAR EL CARRITO
const contenedorCarrito = document.getElementById('contenedorCarrito')
const verCarrito = document.getElementById('verCarrito')

verCarrito.addEventListener('click', () => {
    mostrarCarrito()
})

//! FUNCION PARA MOSTRAR EL CARRITO
const mostrarCarrito = () => {
    contenedorCarrito.innerHTML='' // comillas vacias para evitar que se dupliquen los productos
    carrito.forEach(producto => {
        const card = document.createElement("div"); // Creamos un div
        card.classList.add("col-xl-6", "col-md-12", "col-xs-12"); // con este metodo le añadimos una clase de bootstrap a la card creada anteriormente
        card.innerHTML = ` 
        <div class= 'card card-carrito'>
            <div class='card-body'>
            <h5 class='card-title text-center'> ${producto.nombre} </h5>
            <img src = '${producto.img}' class='card-img-top imgProductos' alt='${producto.nombre}'>
            <p class='card-text text-center precio'> ${producto.precio} $</p>
            <p class='card-text text-center cantidad'> ${producto.cantidad} </p>
            <button class="btn colorBoton" id="eliminar${producto.id}">Eliminar producto</button>
            </div>
        </div>`

        contenedorCarrito.appendChild(card)

        // Eliminar productos del carrito
        const boton = document.getElementById(`eliminar${producto.id}`) // vinculamos
        boton.addEventListener('click', () =>{ // escuchamos el evento + funcion
            eliminarDelCarrito(producto.id)
        })

    })
    calcularTotal()

}

//! CALCULAR EL TOTAL DE LA COMPRA

const total = document.getElementById('total')
const totalCanvas = document.getElementById('totalCanvas')

const calcularTotal = () => {
    let totalCompra = 0
    carrito.forEach(producto => {
        totalCompra += producto.precio * producto.cantidad // totalcompra += es igual a poner totalCompra = totalCompra + producto.precio
    })

    totalCanvas.innerHTML = `$ ${totalCompra}`
    total.innerHTML = `$ ${totalCompra}`
}


//! ELIMINAR PRODUCTOS
const eliminarDelCarrito = (id) => {
    const producto = carrito.find(producto => producto.id === id) // buscamos coincidencias
    const indice = carrito.indexOf(producto) // vemos que lugar del array ocupa y obtenemos esa ubicacion
    carrito.splice(indice, 1 ) // eliminamos del array con splice, sabiendo la ubicacion en el indice y le ponemos la cantidad de veces

    mostrarCarrito()

    //* LOCAL STORAGE
    localStorage.setItem('carrito', JSON.stringify(carrito)) // cuando eliminamos un producto del carrito se actualiza el local storage
}

//! VACIAR EL CARRITO COMPLETAMENTE
const vaciarCarrito = document.getElementById('vaciarCarrito')
vaciarCarrito.addEventListener('click', () => {
    eliminarTodoElCarrito()
})

//! FUNCION PARA VACIAR TODO EL CARRITO

const eliminarTodoElCarrito = () => {
    carrito = [] // le pasamos el array vacio para eliminar TODO
    mostrarCarrito()

    //* VACIAMOS EL LOCAL STORAGE AL VACIAR EL CARRITO
    localStorage.clear();
}

//! REALIZAR COMPRA

const realizarCompra = document.getElementById('realizarCompra')

realizarCompra.addEventListener('click',() =>{
    Swal.fire({
        title:'IMPOSIBLE REALIZAR LA COMPRA',
        text: 'COMENZO LA TERCERA GUERRA MUNDIAL',
        icon: 'warning',
        confirmButtonText: 'CHAU',
        confirmButtonColor: 'green',
        showCancelButton: true,
        cancelButtonText: 'FFFFF',
        cancelButtonColor: 'red'
    })
})
