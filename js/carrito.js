//DECLARACION DE CLASES 

class productoCarrito {
    constructor(tipo, nombre, precio, imgRuta, cantidad) {
        this.tipo = tipo;
        this.nombre = nombre;
        this.precio = precio;
        this.imgRuta = imgRuta;
        this.cantidad = cantidad;
    }
}


//CREACIÓN DE OBJETOS PARA EL CARRITO

let productosCarrito, arregloProductos = [],
    arregloProductosCarrito = [];

localStorage.getItem('objetosCarrito') || (arregloProductosCarrito = JSON.stringify(arregloProductosCarrito),
localStorage.setItem('objetosCarrito', arregloProductosCarrito));

//PAQUETES

let paquetes = document.getElementsByClassName("paquete");
for (let paquete of paquetes) {
    let nuevoProductoCarrito = new productoCarrito("paquete", paquete.querySelector("h3").textContent, paquete.querySelector(".precioBoton .precio").textContent, paquete.querySelector("img").src, 0);
    arregloProductos.push(nuevoProductoCarrito);
}

//TOURS

let tours = document.getElementsByClassName("tour");
for (let tour of tours) {
    let nuevoProductoCarrito = new productoCarrito("tour", tour.querySelector("h3").textContent, tour.querySelector(".precioBoton .precio").textContent, tour.querySelector(".mainImg").src, 0);
    arregloProductos.push(nuevoProductoCarrito);
}

//EXCURSIONES

let excs = document.getElementsByClassName("exc");
for (let exc of excs) {
    let nuevoProductoCarrito = new productoCarrito("exc", exc.querySelector("h5").textContent, exc.querySelector(".precioBoton .precio").textContent, exc.querySelector("img").src, 0);
    arregloProductos.push(nuevoProductoCarrito);
}

//EVENTO CLICK DEL BOTON COMPRAR

let botonProducto = document.querySelectorAll(".precioBoton .boton");
for (let boton of botonProducto) {
    boton.addEventListener("click", function () {
        let abueloBoton = boton.parentNode.parentNode;
        let productoAux;
        if (abueloBoton.querySelector("h3")) {
            productoAux = arregloProductos.find((e) => e.nombre == abueloBoton.querySelector("h3").textContent);
            productoAux.cantidad++;
        } else {
            productoAux = arregloProductos.find((e) => e.nombre == abueloBoton.querySelector("h5").textContent);
            productoAux.cantidad++;
        }
        arregloProductosCarrito = localStorage.getItem('objetosCarrito');
        arregloProductosCarrito = JSON.parse(arregloProductosCarrito);
        let band = false;

        for (arreglo of arregloProductosCarrito) {
            (arreglo.nombre === productoAux.nombre) && (band = true);
        }
        if (band == true) {
            (arregloProductosCarrito.find((e) => e.nombre == productoAux.nombre)).cantidad++;
            arregloProductosCarrito = JSON.stringify(arregloProductosCarrito);
            localStorage.setItem('objetosCarrito', arregloProductosCarrito);
        } else {
            arregloProductosCarrito.push(productoAux);
            arregloProductosCarrito = JSON.stringify(arregloProductosCarrito);
            localStorage.setItem('objetosCarrito', arregloProductosCarrito);
        }
        Toastify({
            text: 'Se agrego el producto a "Mis Viajes" ↑',
            duration: '1500',
            style: {
                background: '#b08dc0'
            }
        }).showToast();
    });

}