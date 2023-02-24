//DECLARACION DE OBJETOS Y CLASES

let areas = [{
        nombre: "Africa",
        costoInicial: 800000,
        paises: ["Sudáfrica", "Egipto", "Tanzania", "Etiopía", "Malawi"]
    },
    {
        nombre: "America del sur",
        costoInicial: 180000,
        paises: ["Ecuador", "Chile", "Brazil", "Colombia", "Peru"]
    },
    {
        nombre: "America del Norte",
        costoInicial: 430000,
        paises: ["Estados Unidos", "Mexico", "Canada", "Alaska", "Groenlandia"]
    },
    {
        nombre: "Centroamerica",
        costoInicial: 500000,
        paises: ["Cuba", "Puerto Rico", "Panama", "Nicaragua", "Belice"]
    },
    {
        nombre: "Asia Oriental",
        costoInicial: 1500000,
        paises: ["China", "Corea del Norte", "Corea del Sur", "Mongolia", "Japon"]
    },
    {
        nombre: "Asia del Sur",
        costoInicial: 800000,
        paises: ["Bangladesh", "Bhután", "India", "Maldivas", "Nepal"]
    },
    {
        nombre: "Asia Sudoriental Continental",
        costoInicial: 1200000,
        paises: ["Indonesia", "Filipinas", "Malasia", "Vietnam", "Camboya"]
    },
    {
        nombre: "Europa",
        costoInicial: 500000,
        paises: ["Portugal", "Francia", "Inglaterra", "España", "Alemania"]
    },
    {
        nombre: "Oceania",
        costoInicial: 2000000,
        paises: ["Australia", "Nueva Zelanda", "Islas Fiyi", "Papua Nueva Guinea", "Micronesia"]
    },
];
class viaje{
    constructor(fechaSal, cantPersonas, area, paises , diasXPais, excXPais, email, comentarios, costoAprox) {
        this.fechaSal = fechaSal;
        this.cantPersonas = cantPersonas;
        this.area = area;
        this.paises = paises;
        this.diasXPais = diasXPais;
        this.excXPais = excXPais;
        this.email = email;
        this.comentarios = comentarios;
        this.costoAprox = costoAprox;
    }
    mostrar(){
        return("<div id='divAlertaArmado'> <h3>Ya estamos preparando tu tour</h3> <h4>Los datos del mismo son:</h4> <div><h5>Fecha de salida:</h5> <p>" + this.fechaSal + "</p> </div> <div> <h5>Cantidad de personas:</h5> <p>" + this.cantPersonas + "</p> </div> <div> <h5>Area Geografica:</h5> <p>" + this.area + "</p> </div> <div> <h5>Paises:</h5> <p>" + this.paises.join(", ") + ".</p> </div> <div> <h5>Dias para alojarse en cada pais:</h5> <p>" + this.diasXPais + "</p> </div> <div> <h5>Excursiones por pais:</h5> <p>" + this.excXPais + "</p> </div> <div> <h5>Email:</h5> <p>" + this.email + "</p> </div> <div> <h5> Comentarios: </h5> <p>" + this.comentarios + "</p> </div> <div> <h5> Costo Aproximado: </h5><p>$" + this.costoAprox + "</p> </div> <br> <p> Este incluye hotel, traslado y las excursiones solicitadas por viaje<p></div>");
    }
}

//GENERAR OPCIONES PARA AREAS GEOGRAFICAS
for (let area of areas) {
    let option = document.createElement("option");
    option.innerHTML = area.nombre;
    option.value = areas.indexOf(area);
    document.getElementById("areaGeografica").append(option);
}

//FUNCION PARA MOSTRAR PAISES

function seleccionarArea() {
    if (selectArea.value != "seleccionar") {
        let selectPaises = document.getElementById("paises");
        selectPaises.innerHTML = '<div> <input id="viaje1" type="checkbox" value="' + areas[selectArea.value].paises[0] + '"> <label for="viaje1">' + areas[selectArea.value].paises[0] + '</label> </div>' + '<div> <input id="viaje2" type="checkbox" value="' + areas[selectArea.value].paises[1] + '"> <label for="viaje2">' + areas[selectArea.value].paises[1] + '</label> </div>' + '<div> <input id="viaje3" type="checkbox" value="' + areas[selectArea.value].paises[2] + '"> <label for="viaje3">' + areas[selectArea.value].paises[2] + '</label> </div>' + '<div> <input id="viaje4" type="checkbox" value="' + areas[selectArea.value].paises[3] + '"> <label for="viaje4">' + areas[selectArea.value].paises[3] + '</label> </div>' + '<div> <input id="viaje5" type="checkbox" value="' + areas[selectArea.value].paises[4] + '"> <label for="viaje5">' + areas[selectArea.value].paises[4] + '</label> </div>'
    }
}

// LLAMADO A LA FUNCION PARA MOSTRAR PAISES

let selectArea = document.getElementById("areaGeografica");
selectArea.addEventListener("change", seleccionarArea);


//VALIDACION Y GUARDADO DE DATOS INGRESADOS

let form = document.getElementById("formTour"), band1 = false, band2 = false, band3 = false, band4 = false;
form.addEventListener("submit", function(e){
    let band = 0;
    e.preventDefault();
    
    // VALIDAR QUE AREA GEOGRAFICA NO ESTE EN SELECCIONAR Y QUE LOS PAISES ELEGIDOS SEAN MAS DE DOS
    
    if (selectArea.value != "seleccionar") {
        let co = 0;
        let check = document.querySelectorAll("#paises input");
        check.forEach((e)=>{
            if(e.checked){
                co++;
            }
        });
        if (co>1) {
            band++;
            if(band2){
                let h5Paises = document.querySelector("#divPaises p");
                h5Paises.remove();
                band2=false;
            }
        } else {
            if(band2){
                let h5Paises = document.querySelector("#divPaises p");
                h5Paises.remove();
            }
            let alertaPaises = document.createElement("p");
            alertaPaises.innerHTML = '<h5>*tiene que elegir mas de 2 paises para continuar*</h5>';
            document.getElementById("divPaises").append(alertaPaises);
            band2=true;
        }
        if(band1){
            let h5AG = document.querySelector("#divAG p");
            h5AG.remove();
            band1=false;
        }
    } else {
        if(band1){
            let h5AG = document.querySelector("#divAG p");
            h5AG.remove();
        }
        let alertaAG = document.createElement("p");
        alertaAG.innerHTML = '<h5>*elija un area para continuar*</h5>';
        document.getElementById("divAG").append(alertaAG);
        band1=true;
    }
    
    //VALIDAR QUE LA FECHA DE SALIDA NO SEA UNA FECHA PASADA
    
    let fechaActual = new Date(), fechaIngresada = document.getElementById("date").value;
    let anioActual = fechaActual.getFullYear(), mesActual = fechaActual.getMonth() + 1, diaActual= fechaActual.getDate(); 
    let anio = fechaIngresada[0] + fechaIngresada[1] + fechaIngresada[2] + fechaIngresada[3];
    let mes = fechaIngresada[5] + fechaIngresada[6];
    let dia = fechaIngresada[8] + fechaIngresada[9];

    if((anioActual<anio)||((anioActual==anio)&&(mesActual<mes))||((anioActual==anio)&&(mesActual==mes)&&(diaActual<dia))){
        band++;
        if(band3){
            let h5Date = document.querySelector("#divDate p");
            h5Date.remove();
            band3=false;
        }
    }else{
        if(band3){
            let h5Date = document.querySelector("#divDate p");
            h5Date.remove();
        }
        let alertaDate = document.createElement("p");
        alertaDate.innerHTML = '<h5>*la fecha ingresada es anterior a la actual*</h5>';
        document.getElementById("divDate").append(alertaDate);
        band3=true;
    }
    
    //VALIDAR QUE EL EMAIL NO ESTE EN BLANCO
    let email = document.getElementById("inputEmail").value;
    if(email != ""){
        band++;
        if(band4){
            let h5Email = document.querySelector("#divEmail p");
            h5Email.remove();
            band4=false;
        }
    }
    else {
        if(band4){
            let h5Email = document.querySelector("#divEmail p");
            h5Email.remove();
        }
        let alertaEmail = document.createElement("p");
        alertaEmail.innerHTML = '<h5>*complete este campo para seguir*</h5>';
        document.getElementById("divEmail").append(alertaEmail);
        band4=true;
    }

    //GUARDAR DATOS DEL TOUR SELECCIONADO Y MOSTRARLOS (la idea de guardar datos es que se envien a alguien pero no se como)
    
    if(band==3){
        let check = document.querySelectorAll("#paises input");
        let paises=[], coCheck = 0;
        check.forEach(e=>{
            if(e.checked){
                paises.push(check[coCheck].value);
            }
            coCheck++;
        });
        let nuevoViaje = new viaje(
            document.getElementById("date").value, 
            document.getElementById("selectPersonas").value, 
            areas[selectArea.value].nombre, 
            paises, 
            document.getElementById("selectDias").value, 
            document.getElementById("selectExc").value, 
            document.getElementById("inputEmail").value, 
            document.getElementById("comentario").value, 
            (areas[selectArea.value].costoInicial + document.getElementById("selectDias").value * paises.length * 35000 + (paises.length - 1) * 35000 + paises.length * document.getElementById("selectExc").value * 15000) * document.getElementById("selectPersonas").value * 1.05
            );
        swal.fire({
            imageUrl: '../img/gatito.jpg',
            imageWidth: 150,
            imageHeight: 150,
            html: nuevoViaje.mostrar(),
        })
        
    }
});

    



