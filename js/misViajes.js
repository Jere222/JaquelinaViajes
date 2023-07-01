//FUNCIONES

function noHayViajes() {
    let totalBoton = document.querySelector('.contenedorMisViajes .precioBoton');
    totalBoton && totalBoton.remove();
    let pMisViajes = document.createElement("p");
    pMisViajes.className = 'noHayViajes';
    pMisViajes.innerHTML = 'Todavia no haz decidido a donde ir?';
    document.querySelector('.contenedorMisViajes').append(pMisViajes);
}

let total = 0;

function mostrarPrecio() {
    let btnComprar = document.querySelector(".precioBoton .boton");
    btnComprar.addEventListener('click', function () {
        let total = btnComprar.parentNode.querySelector(".precio").textContent;
        Swal.fire({
            title: 'Haz realizado tu compra',
            text: 'El importe es de ' + total,
            icon: 'success',
        })
    })
}

function precioEnDolares(precioDolar) {
    let btnComprar = document.querySelector(".precioBoton .boton");
    btnComprar.addEventListener('click', function () {
        let total = btnComprar.parentNode.querySelector(".precio").textContent;
        total = parseInt(total.slice(1, total.lenght));
        let totalDolares = total / precioDolar;
        Swal.fire({
            title: 'Haz realizado tu compra',
            text: 'El importe es de $' + total + ' o  USD$' + totalDolares,
            icon: 'success',
        })
    });
}

function mostrarMisViajes() {
    let arregloProductosCarrito = localStorage.getItem('objetosCarrito');
    arregloProductosCarrito = JSON.parse(arregloProductosCarrito);
    if (arregloProductosCarrito[0]) {
        for (let arreglo of arregloProductosCarrito) {
            let viaje = document.createElement("div");
            viaje.className = 'subtitulosMisViajes';
            viaje.innerHTML = '<div> <button class="btnCant"><p>+</p></button><p class="cantidadViaje">' + arreglo.cantidad + '</p> <button class="btnCant"><p>-</p></button></div> <img class="imgMisViajes" src="' + arreglo.imgRuta + '"> <p>' + arreglo.tipo + '</p> <p class="nombreViaje">' + arreglo.nombre + '</p> <p>' + arreglo.precio + '</p> <button class="btnEliminar"><p>-</p></button>';
            document.querySelector('.contenedorMisViajes').append(viaje);
            let precio = arreglo.precio;
            precio = precio.slice(1, precio.lenght);
            precio = parseInt(precio);
            total += precio * arreglo.cantidad;
        }
        let totalBoton = document.createElement("div");
        totalBoton.className = 'precioBoton';
        totalBoton.innerHTML = '<p class="precio">$' + total + '</p> <p class="boton">Comprar</p>'
        document.querySelector('.contenedorMisViajes').append(totalBoton);

        //BOTON COMPRAR
        fetch('https://api.bluelytics.com.ar/v2/latest')
            .then((resp) => resp.json())
            .then((data) => precioEnDolares(data.blue.value_buy))
            .catch(mostrarPrecio())

    } else {
        noHayViajes();
    }
}

//MOSTRAR MIS VIAJES

mostrarMisViajes();

//BOTONES SUMAR Y RESTAR

let btnCant = document.getElementsByClassName("btnCant");
for (let boton of btnCant) {
    boton.addEventListener('click', function () {
        let arregloProductosCarrito = localStorage.getItem('objetosCarrito');
        arregloProductosCarrito = JSON.parse(arregloProductosCarrito);
        let padre = boton.parentNode;
        let abuelo = boton.parentNode.parentNode;
        let bisAbuelo = boton.parentNode.parentNode.parentNode;
        let nombreViaje = abuelo.querySelector('.nombreViaje').textContent;
        let cantidad = (arregloProductosCarrito.find((e) => e.nombre == nombreViaje)).cantidad;
        let precioTotal = bisAbuelo.querySelector('.precioBoton .precio');
        let precio = parseInt(precioTotal.textContent.slice(1, precioTotal.textContent.lenght));
        let viaje = arregloProductosCarrito.find((e) => e.nombre == nombreViaje);
        let precioViaje = parseInt(viaje.precio.slice(1, precioTotal.textContent.lenght));
        if (boton.textContent == '+') {
            (arregloProductosCarrito.find((e) => e.nombre == nombreViaje)).cantidad++;
            cantidad = (arregloProductosCarrito.find((e) => e.nombre == nombreViaje)).cantidad;
            padre.querySelector('.cantidadViaje').textContent = cantidad;
            precioTotal.textContent = '$' + (precio + precioViaje);
            arregloProductosCarrito = JSON.stringify(arregloProductosCarrito);
            localStorage.setItem('objetosCarrito', arregloProductosCarrito);
        } else if (cantidad > 1) {
            (arregloProductosCarrito.find((e) => e.nombre == nombreViaje)).cantidad--;
            cantidad = (arregloProductosCarrito.find((e) => e.nombre == nombreViaje)).cantidad;
            padre.querySelector('.cantidadViaje').textContent = cantidad;
            precioTotal.textContent = '$' + (precio - precioViaje);
            arregloProductosCarrito = JSON.stringify(arregloProductosCarrito);
            localStorage.setItem('objetosCarrito', arregloProductosCarrito);
        }
    });
}

//BOTON ELIMINAR

let btnEliminar = document.getElementsByClassName("btnEliminar");
for (let boton of btnEliminar) {
    boton.addEventListener('click', function () {
        let arregloProductosCarrito = localStorage.getItem('objetosCarrito');
        arregloProductosCarrito = JSON.parse(arregloProductosCarrito);
        let abuelo = boton.parentNode.parentNode;
        let padre = boton.parentNode;
        padre.remove();
        let nombreViaje = padre.querySelector('.nombreViaje').textContent;
        let precioTotal = abuelo.querySelector('.precioBoton .precio');
        let precio = parseInt(precioTotal.textContent.slice(1, precioTotal.textContent.lenght));
        let viaje = arregloProductosCarrito.find((e) => e.nombre == nombreViaje);
        let precioViaje = parseInt(viaje.precio.slice(1, precioTotal.textContent.lenght));
        precio -= precioViaje * viaje.cantidad;
        precioTotal.textContent = '$' + precio;
        arregloProductosCarrito.splice(arregloProductosCarrito.indexOf(arregloProductosCarrito.find((e) => e.nombre == nombreViaje)), 1);
        arregloProductosCarrito[0] || noHayViajes();
        arregloProductosCarrito = JSON.stringify(arregloProductosCarrito);
        localStorage.setItem('objetosCarrito', arregloProductosCarrito);
    });
}