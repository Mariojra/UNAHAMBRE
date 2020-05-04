/*FALTA HACER ALGUNAS VALIDACIONES DE IMAGENES Y UN SERVICIO DE PLATILLO NO ENVIA LA IMAGEN*/


/**EVENTO DE MENU RESPONSIVE */
$(document).ready(function(){
    $('#icon').click(function(){
        $('ul').toggleClass('show'); 
    });
    ImprimirRestaurantes();
});

/* conf de sweet alert pequeño */
const Toast = Swal.mixin({
    toast: true,
    position: 'center',
    showConfirmButton: false,
    timer: 1500,
    timerProgressBar: true,
    width:'40rem',
    customClass:{
        popup:'swal-toastCustomPopup',
        title:'swal-toastCustomTitle'
    },
    showClass: {
        popup: 'animated jackInTheBox'
      },
    //   hideClass: {
    //     popup: 'animated hinge'
    //   },
    onOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
});


function ImprimirRestaurantes(){
         axios({
                 method:'GET',
                 url:'https://api-unahambre.herokuapp.com/api_producto/g_mostrar_restaurantes'
             }).then(res=>{
                document.querySelector('#seleccion').innerHTML = 'Restaurantes';
                document.querySelector('#cambioDeInformacion').innerHTML = '';
                var data_restaurante = res.data.items;
                for (let i = 0; i < data_restaurante.length; i++) {
                    document.querySelector('#cambioDeInformacion').innerHTML += `
                                        <div class="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-xs-12 tarjetaMenu" data-id="${data_restaurante[i].idRestaurante}">
                                            <div class="card shadow tamanioTarjeta" >
                                                <img src="${data_restaurante[i].Foto_Restaurante}" class="card-img-top img-c" alt="...">
                                                <div class="card-body">
                                                    <h5 class="card-title h1 text-info">${data_restaurante[i].Nombre_Local}</h5>
                                                    <p class="card-text ">Telefono | ${data_restaurante[i].Telefono}</p>
                                                    <p class="card-text ">Ubicacion | ${data_restaurante[i].Ubicacion}</p>
                                                </div>
                                                <div class="card-footer">
                                                    <button class="btn btn-secondary btn-seleccionar">Seleccionar</button>
                                                </div>
                                            </div>
                                        </div>
                                            `;
                }
                let botones = document.getElementsByClassName('btn-secondary');
                for (let i = 0; i < botones.length; i++) {
                    let boton = botones[i];
                    boton.addEventListener('click',seleccionRestaurante)
                }
                // console.log("Tarjetas Restaurantes Cargadas "); 
              }).catch(function(error){
                 console.log(error);
              });                
}


function ImprimirMenus() {
    axios({
        method: 'GET',
        url: 'https://api-unahambre.herokuapp.com/api_producto/g_mostrar_menus'
    }).then(res => {
        document.querySelector('#seleccion').innerHTML = 'Menus';
        document.querySelector('#cambioDeInformacion').innerHTML = '';
        var data_menus = res.data.items;
        for (let i = 0; i < data_menus.length; i++) {
            document.querySelector('#cambioDeInformacion').innerHTML += `
                                       <div class="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-xs-12 tarjetaMenu">
                                           <div class="card shadow tamanioTarjeta" >
                                           <img src="img/burger2.jpg" class="card-img-top img-c" alt="...">
                                           <div class="card-body">
                                               <h5 class="card-title h1 text-info">${data_menus[i].Tipo_Menu}</h5>
                                               <p class="card-text ">Fecha Registro | ${data_menus[i].Fecha_Registro}</p>
                                               
                                           </div>
                                           </div>
                                       </div>
                                           `;
        }
        // console.log("Tarjetas Menus Cargadas ");
    }).catch(function (error) {
        console.log(error);
    });
}
    



function ImprimirCategorias(){
    document.querySelector('#seleccion').innerHTML = 'Categorias';
    document.querySelector('#cambioDeInformacion').innerHTML = '';
    document.querySelector('#cambioDeInformacion').innerHTML += `
                    <div class="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-xs-12 tarjetaMenu">
                        <div class="card shadow tamanioTarjeta" >
                        <img src="img/burger2.jpg" class="card-img-top img-c" alt="...">
                        <div class="card-body">
                            <h5 class="card-title h1 text-info">Desayuno</h5>
                            <p class="card-text ">Primer comida que una persona ingiere en su vida cotidiana.</p>
                        
                        </div>
                        </div>
                    </div>
                    <div class="col-xl-3 col-lg-3 col-md-4 col-sm-6 col-xs-12 tarjetaMenu">
                        <div class="card shadow tamanioTarjeta" >
                        <img src="img/burger2.jpg" class="card-img-top img-c" alt="...">
                        <div class="card-body">
                            <h5 class="card-title h1 text-info">Almuerzo</h5>
                            <p class="card-text ">Comida que se ingiere en la mitad del dia.</p>
                        
                        </div>
                        </div>
                    </div>
                    <div class="col-xl-3 col-lg-3 col-md-4 col-sm-6 col-xs-12 tarjetaMenu">
                        <div class="card shadow tamanioTarjeta" >
                        <img src="img/burger2.jpg" class="card-img-top img-c" alt="...">
                        <div class="card-body">
                            <h5 class="card-title h1 text-info">Cena</h5>
                            <p class="card-text ">Ultima comida del dia.</p>
                        
                        </div>
                        </div>
                    </div>
                    <div class="col-xl-3 col-lg-3 col-md-4 col-sm-6 col-xs-12 tarjetaMenu">
                        <div class="card shadow tamanioTarjeta" >
                        <img src="img/burger2.jpg" class="card-img-top img-c" alt="...">
                        <div class="card-body">
                            <h5 class="card-title h1 text-info">Antojos</h5>
                            <p class="card-text ">Comunmente un postre o golosina entre comidas pesadas.</p>
                        
                        </div>
                        </div>
                    </div>
                    <div class="col-xl-3 col-lg-3 col-md-4 col-sm-6 col-xs-12 tarjetaMenu">
                        <div class="card shadow tamanioTarjeta" >
                        <img src="img/burger2.jpg" class="card-img-top img-c" alt="...">
                        <div class="card-body">
                            <h5 class="card-title h1 text-info">Bebidas</h5>
                            <p class="card-text ">Gaseosas o frescos naturales.</p>
                        
                        </div>
                        </div>
                    </div>
                    <div class="col-xl-3 col-lg-3 col-md-4 col-sm-6 col-xs-12 tarjetaMenu">
                        <div class="card shadow tamanioTarjeta">
                        <img src="img/burger2.jpg" class="card-img-top img-c" alt="...">
                        <div class="card-body">
                            <h5 class="card-title h1 text-info">Grupal</h5>
                            <p class="card-text ">Comida para disfrutar entre amigos.</p>
                        </div>
                        </div>
                    </div>

    `;
}


function ImprimirPlatillos(){
    axios({
        method:'GET',
        url:'https://api-unahambre.herokuapp.com/api_producto/g_mostrar_platillos'
    }).then(res=>{
       console.log(res)
       document.querySelector('#seleccion').innerHTML = 'Platillos';
       document.querySelector('#cambioDeInformacion').innerHTML = '';
       var data_platillos = res.data.items;
       for (let i = 0; i < data_platillos.length; i++) {
        document.querySelector('#cambioDeInformacion').innerHTML  += `
            <div class="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-xs-12 tarjetaMenu" data-id="${data_platillos[i].idPlatillo}">
                <div class="card shadow tamanioTarjeta" >
                <img src="${data_platillos[i].Foto_Platillo}" class="card-img-top img-c" alt="...">
                <div class="card-body">
                    <h5 class="card-title h1 text-info">${data_platillos[i].Nombre}</h5>
                    <p class="card-text ">Descripcion | ${data_platillos[i].Descripcion}</p>
                    <p class="card-text ">Precio | ${data_platillos[i].Precio}</p>
                </div>
                <div class="card-footer">
                    <button class="btn btn-success btn-comprar" onclick="anadirCarro('${data_platillos[i].idPlatillo}','${data_platillos[i].Nombre}','${data_platillos[i].Precio}')">Agregar al carro</button>
                </div>
                </div>
            </div>
            `;
       }
    //    console.log("Tarjetas Platillos Cargadas "); 
     }).catch(function(error){
        console.log(error);
     }); 
}   


/*FUNCIONES 3ER SPRINT COMPRA*/
function seleccionRestaurante(e){
    // console.log(e.target.previousElementSibling.previousElementSibling.previousElementSibling.innerHTML)
    let padre = e.target.parentNode.parentNode.parentNode;
    let nombreRestaurante = e.target.parentNode.previousElementSibling.firstElementChild.innerText;
    let id = padre.dataset.id
    let datos = {
        idRestaurante: id
    }
    axios({
        method:'POST',
        url: 'https://api-unahambre.herokuapp.com/api_producto/menus_restaurante',
        data: datos
    }).then(res=>{
        // console.log(res)
        document.querySelector('#seleccion').innerHTML = '<a href="#" id="a-restaurant">'+ nombreRestaurante.toLowerCase() + '</a> <span>/ menu</span>';
                document.querySelector('#cambioDeInformacion').innerHTML = '';
                let data_menu = res.data.items;
                for (let i = 0; i < data_menu.length; i++) {
                    if (data_menu[i].Foto_Menu == undefined || data_menu == null || data_menu[i].Foto_Menu.length<100){
                        data_menu[i].Foto_Menu='img/burger2.jpg';
                        // console.log(data_menu[i].Foto_Menu)
                    }
                    document.querySelector('#cambioDeInformacion').innerHTML += `
                        <div class="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-xs-12 tarjetaMenu" data-id="${data_menu[i].idMenu}">
                            <div class="card shadow tamanioTarjeta" >
                                <img src="${data_menu[i].Foto_Menu}" class="card-img-top img-c" alt="...">
                                <div class="card-body tipo-menu">
                                    <h5 class="card-title h1 text-info">${data_menu[i].Tipo_Menu}</h5>
                                </div>
                                <div class="card-footer">
                                    <button class="btn btn-secondary btn-seleccionar">Seleccionar</button>
                                </div>
                            </div>
                        </div>
                                            `;
                }
                let botones = document.getElementsByClassName('btn-secondary');
                for (let i = 0; i < botones.length; i++) {
                    let boton = botones[i];
                    boton.addEventListener('click',seleccionMenu)
                }
    }).catch(err=>{
        console.log(err);
    });
}

function seleccionMenu(e) {
    let nombreMenu = e.target.parentNode.previousElementSibling.firstElementChild.innerText;
    let padre = e.target.parentNode.parentNode.parentNode;
    let titulo_paso = padre.parentNode.parentNode.previousElementSibling.firstElementChild.innerHTML;
    let id = padre.dataset.id;
    // console.log(id)
    let datos = {
        idMenu: id
    }
    axios({
        method:'POST',
        url:'https://api-unahambre.herokuapp.com/api_producto/platillos_menu',
        data: datos
    }).then(res=>{
        // console.log(res);
       document.querySelector('#seleccion').innerHTML = titulo_paso.replace('menu',nombreMenu.toLowerCase());
       document.querySelector('#cambioDeInformacion').innerHTML = '';
       let data_platillos = res.data.items;
       console.log(data_platillos)
       if(data_platillos.length != undefined){
            for (let i = 0; i < data_platillos.length; i++) {
                document.querySelector('#cambioDeInformacion').innerHTML  += `
                    <div class="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-xs-12 tarjetaMenu" data-id="${data_platillos[i].idPlatillo}">
                        <div class="card shadow tamanioTarjeta" >
                        <img src="${data_platillos[i].Foto_Platillo}" class="card-img-top img-c" alt="...">
                        <div class="card-body">
                            <h5 class="card-title h1 text-info">${data_platillos[i].Nombre}</h5>
                            <p class="card-text ">Descripcion | ${data_platillos[i].Descripcion}</p>
                            <p class="card-text ">Precio | ${data_platillos[i].Precio}</p>
                        </div>
                        <div class="card-footer">
                            <button class="btn btn-success btn-comprar" onclick="anadirCarro('${data_platillos[i].idPlatillo}','${data_platillos[i].Nombre}','${data_platillos[i].Precio}')">Agregar al carro</button>
                        </div>
                        </div>
                    </div>
                    `;
            }

            // let botones = document.getElementsByClassName('btn-seleccionar');
            // console.log(botones)
            // for (let i = 0; i < botones.length; i++) {
            //     boton = botones[i];
            //     boton.addEventListener('click',clickAnadirCarro);
            // }

       } else {
            document.querySelector('#cambioDeInformacion').innerHTML  += `
            <div class="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-xs-12 tarjetaMenu" data-id="${data_platillos.idPlatillo}">
                <div class="card shadow tamanioTarjeta" >
                <img src="img/burger2.jpg" class="card-img-top img-c" alt="...">
                <div class="card-body">
                    <h5 class="card-title h1 text-info">${data_platillos.Nombre}</h5>
                    <p class="card-text ">Descripcion | ${data_platillos.Descripcion}</p>
                    <p class="card-text ">Precio | ${data_platillos.Precio}</p>
                </div>
                <div class="card-footer">
                    <button class="btn btn-success btn-comprar" onclick="anadirCarro('${data_platillos[i].idPlatillo}','${data_platillos[i].Nombre}','${data_platillos[i].Precio}')">Agregar al carro</button>
                </div>
                </div>
            </div>
            `;

       }
    }).catch(err=>{
        console.log(err);
    });
}


function anadirCarro(idPlatillo,nombre,precio){
    let cartRow = document.createElement('div');
    cartRow.classList.add('cart-row');
    cartRow.setAttribute("data-id",idPlatillo);

    let cartItems=document.getElementsByClassName('cart-items')[0];
    let cartNames = cartItems.getElementsByClassName('cart-item-title');
    for (let i=0; i<cartNames.length;i++){
        cartName=cartNames[i];
        if(cartName.innerText == nombre){
            Toast.fire({
                icon:"error",
                title:"Ya has agregado este producto"
            });
            return
        }
    }
    let cartContent = `
        <div class="cart-item cart-column">
          <img class="cart-item-image" src="img/burger2.jpg" width="100" height="100">
          <span class="cart-item-title">${nombre}</span>
        </div>
        <span class="cart-price cart-column">Lps.${precio}</span>
        <div class="cart-quantity cart-column cart-quantity-c">
          <input class="cart-quantity-input" type="number" value="1" min="1" onchange="cambioCantidad(event);">
          <button class="btn btn-danger" type="button" onclick="eliminarProducto(event)">QUITAR</button>
        </div>
    `;
    cartRow.innerHTML=cartContent;
    cartItems.append(cartRow);
    actualizarTotal();
    Toast.fire({
        icon:'success',
        title:'Producto agregado a tu orden!'
    })
}

function mostrarCarrito() {
    $('#modal-compras').modal('show');
}


function eliminarProducto(e){
    cartItems = e.target.parentNode.parentNode;
    cartItems.remove();
    actualizarTotal()
}

function cambioCantidad(e){
    let input = e.target
    // console.log(input.value)
    if(isNaN(input.value) || input.value==''){
        input.value = 1;
    }
    actualizarTotal();
}


function actualizarTotal(){
    let cartItems = document.getElementsByClassName('cart-items')[0];
    let cartRows = cartItems.getElementsByClassName('cart-row');
    let total = 0;
    for (let i = 0; i < cartRows.length; i++) {
        let cartRow = cartRows[i];
        let cantidad = cartRow.getElementsByClassName('cart-quantity-input')[0].value
        let elementoPrecio = cartRow.getElementsByClassName('cart-price')[0]        
        let precio = parseFloat(elementoPrecio.innerText.replace('Lps.',''));
        total = total + (precio * cantidad);
    }
    total = Math.round(total*100)/100
    document.getElementsByClassName('cart-total-price')[0].innerHTML='Lps.'+total;
}

//EVENTO DE CLICK DEL BOTON DE HACER COMPRA
document.getElementById('btn-compra').addEventListener('click',function(){
    let cartItems = document.getElementsByClassName('cart-items')[0];
    let cartRows = cartItems.getElementsByClassName('cart-row');
    let id = [];
    let info_orden= [];
    let elementoTotal = document.getElementsByClassName('cart-total-price')[0];
    let total = parseFloat(elementoTotal.innerHTML.replace('Lps.',''));
    if (cartRows.length>0){
        for (let i=0; i<cartRows.length; i++){
            let cartRow = cartRows[i];
            let cartId = cartRow.dataset.id;
            id.push(cartId);
            let nombrePlatillo = cartRow.getElementsByClassName('cart-item-title')[0].innerText;
            let cantidad = cartRow.getElementsByClassName('cart-quantity-input')[0].value;
            let foto = cartRow.getElementsByClassName('cart-item-image')[0].src;
            let json_orden = {id:cartId, nombre:nombrePlatillo, cantidad:cantidad, foto:foto};
            info_orden.push(json_orden);
            
        }
       
        realizar_pago(id, info_orden, total)
        return id, info_orden, total;

    } else {
        Toast.fire({
            icon:"warning",
            title:"No tienes añadido ningun producto a tu orden."
        });
    }
});