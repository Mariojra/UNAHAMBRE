//configuracion sweetalert
const alert_default = Swal.mixin({
  timer: 3000,
  timerProgressBar: true,
  onOpen: (modal)=>{
      modal.addEventListener('mouseenter', Swal.stopTimer)
      modal.addEventListener('mouseleave', Swal.resumeTimer)
  },
  showClass: {
      popup: 'animated fadeInDown'
    },
    hideClass: {
      popup: 'animated fadeOutUp'
    }
});
 

(function($) {
  "use strict"; // Start of use strict

  // Toggle the side navigation
  $("#sidebarToggle, #sidebarToggleTop").on('click', function(e) {
    $("body").toggleClass("sidebar-toggled");
    $(".sidebar").toggleClass("toggled");
    if ($(".sidebar").hasClass("toggled")) {
      $('.sidebar .collapse').collapse('hide');
    };
  });

  // Close any open menu accordions when window is resized below 768px
  $(window).resize(function() {
    if ($(window).width() < 768) {
      $('.sidebar .collapse').collapse('hide');
    };
  });

  // Prevent the content wrapper from scrolling when the fixed side navigation hovered over
  $('body.fixed-nav .sidebar').on('mousewheel DOMMouseScroll wheel', function(e) {
    if ($(window).width() > 768) {
      var e0 = e.originalEvent,
        delta = e0.wheelDelta || -e0.detail;
      this.scrollTop += (delta < 0 ? 1 : -1) * 30;
      e.preventDefault();
    }
  });

  // Smooth scrolling using jQuery easing
  $(document).on('click', 'a.scroll-to-top', function(e) {
    var $anchor = $(this);
    $('html, body').stop().animate({
      scrollTop: ($($anchor.attr('href')).offset().top)
    }, 1000, 'easeInOutExpo');
    e.preventDefault();
  });

})(jQuery); // End of use strict


window.onload = obtenerRestaurantes();
window.onload = cargarMenus();
window.onload = obtenerTiposPlatillos();
moment.locale('es')
var cabecera = document.getElementById('table-cabeceras');
var filas = document.getElementById('table-filas');
var timerPedidos;



function setRestaurante(id){
  sessionStorage.setItem('idRestaurante', id)
  alert_default.fire({
    icon:'success',
    title:'Restaurante seleccionado'
  });
}

//registro-negocio.html

function sleep(milliseconds) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}

function obtenerRestaurantes(){
  clearInterval(timerPedidos)
  document.getElementById('tablero').innerHTML = 'Mis Restaurantes'
  document.getElementById('btnAgregar').setAttribute( "onClick", "redirigirRestaurante()");
  document.getElementById('btnAgregar').text = '¡Registrar otro restaurante!'
 
  axios({
    method:'POST',
    url:'https://api-unahambre.herokuapp.com/api_propietario/restauranteUsuario',
    headers: { 'access-token': sessionStorage.getItem('token')},
    data: {
      idUsuario:sessionStorage.getItem('userID')
    }
}).then(res=>{

  cargarCabeceraRestaurantes();
  cargarFilasRestaurantes(res.data.items);
  restaurantes = res.data.items;
  document.getElementById('nombreRestaurante').text = res.data.items[0].Nombre_Local
}).catch(function(error){
   
});  
}

function redirigirRestaurante(){
  window.location.assign('registro-negocio.html')
}

function redirigirPublicidad(){
  if(comprobarSeleccionado(sessionStorage.getItem('idRestaurante'))){
    return;
  } 
window.location.assign('planes-publicidad.html')
}

const cargarCabeceraRestaurantes = () => {
    cabecera.innerHTML = '';
    cabecera.innerHTML = `<th scope="col">#</th>
                          <th scope="col">Nombre</th>
                          <th scope="col">Teléfono</th> 
                          <th scope="col">Correo</th> 
                          <th scope="col">Ubicación</th>  
                          <th scope="col">Estado</th>                         
                          <th scope="col" style='text-align:center'>Acciones</th> 
                `;
    
}
function cerrarSesion(){
  sessionStorage.removeItem('token');
  sessionStorage.removeItem('idRestaurante');
}
const cargarFilasRestaurantes = (items) => {
  filas.innerHTML = '';
  for (let i = 0; i < items.length; i++) {
    filas.innerHTML += `<tr>
    <th scope="row" id="row${items[i].idRestaurante}" abbr="${items[i].idRestaurante}">${items[i].idRestaurante}</th>
    <td>${items[i].Nombre_Local}</td>
    <td>${items[i].Telefono}</td>
    <td>${items[i].Correo}</td>
    <td>${items[i].Ubicacion}</td>
    <td>${items[i].EstadoRestaurante}</td>
    <td align='center'>
    <button type="button" class="btn btn-sm btn-primary shadow-sm" ${items[i].EstadoRestaurante === 'Activo'?'':'disabled'} onclick="setRestaurante(document.getElementById('row${items[i].idRestaurante}').abbr)"> ${items[i].EstadoRestaurante === 'Activo'?'<i class="fas fa-check fa-sm text-white-50"></i> Seleccionar Restaurante':'<i class="fas fa-ban fa-sm text-white-50"></i> Este restaurante está inactivo'} </button>
    <a href="#" class=" btn btn-sm btn-primary shadow-sm" onclick="eliminarRestaurante(document.getElementById('row${items[i].idRestaurante}').abbr)"><i class="fas fa-trash-alt fa-sm text-white-50"></i> Retirar restaurante </a>
    </td>
    </tr>`  
  }
}


let menus = []
let tipoPlatillo = []
function obtenerTiposPlatillos(){
  axios({

    method: 'GET',
    url : 'https://api-unahambre.herokuapp.com/api_propietario/tipo-platillos',
    headers: { 'access-token': sessionStorage.getItem('token')},
    }).then(res=>{
      tipoPlatillo = res.data.items
     
    }).catch(function(error){
        
    });  

    
}

function cargarMenus(){
  axios({

    method: 'POST',
    url : 'https://api-unahambre.herokuapp.com/api_propietario/menusRestaurante',
    headers: { 'access-token': sessionStorage.getItem('token')},
    data: {
      idRestaurante : sessionStorage.getItem('idRestaurante')
    }
    }).then(res=>{
      cargarCabeceraMenu();
      menus = (res.data.items)
      cargarFilasMenu(res.data.items);
      
    }).catch(function(error){
      
    }); 
}


var timerPedido;
function timerPedidoFunc(){
  timerPedido = setInterval(()=>(obtenerPedidos()), 30000);
  
}

const comprobarSeleccionado = (idRestaurante) =>{
   if(!idRestaurante){
    obtenerRestaurantes();
    alert_default.fire({
      icon:'error',
      title:'Debe seleccionar un restaurante'
    });
    return true;
   }
}

function timerClear(){
  clearInterval(timerPedido)
}

function obtenerPedidos(){
  if(comprobarSeleccionado(sessionStorage.getItem('idRestaurante'))){
    return;
  } 
  clearInterval(timerPedidos)
  document.getElementById('tablero').innerHTML = 'Pedidos Activos'
  document.getElementById('btnAgregar').setAttribute( "onClick", "obtenerPedidos()");
  document.getElementById('btnAgregar').text = '¡Actualizar Pedidos Ahora!'
  
  axios({
    method: 'POST',
    url: 'https://api-unahambre.herokuapp.com/api_propietario/pedidosRestaurante',
    headers: { 'access-token': sessionStorage.getItem('token')},
    data: {
      idRestaurante : sessionStorage.getItem('idRestaurante')
    }
  }).then(res=>{
    cargarCabeceraPedidos()
    cargarFilasPedidos(res.data.items)
  }).catch(function(error){
   
  })
}

function obtenerHistorialGeneral(){

  if(comprobarSeleccionado(sessionStorage.getItem('idRestaurante'))){
    return;
  } 
  clearInterval(timerPedidos)
  document.getElementById('tablero').innerHTML = 'Historial de Pedidos'
  document.getElementById('btnAgregar').setAttribute( "onClick", "obtenerHistorialGeneral()");
  document.getElementById('btnAgregar').text = '¡Actualizar Historial Ahora!'
  
  axios({
    method: 'POST',
    url: 'https://api-unahambre.herokuapp.com/api_propietario/historialGeneralRestaurante',
    headers: { 'access-token': sessionStorage.getItem('token')},
    data: {
      idRestaurante : sessionStorage.getItem('idRestaurante')
    }
  }).then(res=>{
    cargarCabeceraHistorialGeneral()
    cargarFilasHistorialGeneral(res.data.items)
  }).catch(function(error){
   
  })
}

obtenerTiposPlatillos()
function obtenerMenus(){
  if(comprobarSeleccionado(sessionStorage.getItem('idRestaurante'))){
    return;
  } 
  clearInterval(timerPedidos)
  document.getElementById('tablero').innerHTML = 'Lista de Menus'
  document.getElementById('btnAgregar').setAttribute( "onClick", "mostrarModalAgregarMenu()");
  document.getElementById('btnAgregar').text = 'Agregar Menu'
 
  axios({

method: 'POST',
url : 'https://api-unahambre.herokuapp.com/api_propietario/menusRestaurante',
headers: { 'access-token': sessionStorage.getItem('token')},
data: {
  idRestaurante : sessionStorage.getItem('idRestaurante')
}
}).then(res=>{
  cargarCabeceraMenu();
  menus = (res.data.items)
  cargarFilasMenu(res.data.items);
  
}).catch(function(error){
   
});  

}
const cargarCabeceraMenu = () => {
  cabecera.innerHTML = '';
  cabecera.innerHTML = `<th scope="col">#</th>
                        <th scope="col">Tipo de Menú</th>
                        <th scope="col">Fecha de registro</th>
                        <th scope="col">Imagen </th>       
                        <th scope="col" style='text-align:center'>Acciones</th> 
                        `;
}

const cargarFilasMenu = (items) => {
  filas.innerHTML = '';
  for (let i = 0; i < items.length; i++) {
    filas.innerHTML += `<tr>
    <th scope="row" id="row${items[i].idMenu}" abbr="${items[i].idMenu}">${items[i].idMenu}</th>
    <td id="tipoMenu${items[i].idMenu}" abbr="${items[i].Tipo_Menu}" >${items[i].Tipo_Menu}</td>
    <td id="fechaRegistro${items[i].idMenu}" abbr="${items[i].Fecha_Registro}">${items[i].Fecha_Registro}</td>
    <th id="imagen${items[i].idMenu}"><img src="${items[i].Foto_Menu}" class="img_menu" alt="Imagen del menu"></td>
    <td align='center'> 
    <a href="#" class=" btn btn-sm btn-primary shadow-sm" onclick="mostrarModalMenu(document.getElementById('row${items[i].idMenu}').abbr)" ><i class="fas fa-edit fa-sm text-white-50" ></i> Editar </a>
    <a href="#" class=" btn btn-sm btn-primary shadow-sm" onclick="eliminarMenu(document.getElementById('row${items[i].idMenu}').abbr)"><i class="fas fa-trash-alt fa-sm text-white-50"></i> Eliminar </a>
    </td>
    </tr>`  
  }
}
const cargarCabeceraHistorialGeneral = () => {
  cabecera.innerHTML = '';
  cabecera.innerHTML = `<th scope="col">ID de Pedido</th>
                        <th scope="col">Fecha</th>
                        <th scope="col">Monto</th>
                        <th scope="col">Metodo de Pago</th>                          
                        `
}
const cargarFilasHistorialGeneral = (items) => {
  filas.innerHTML = '';
  for (let i = 0; i < items.length; i++) {
    filas.innerHTML += `<tr>
    <th  scope="row" id="${items[i].Pedido_idPedido}" onClick="desplegarPedido(${items[i].Pedido_idPedido})"> <b>${items[i].Pedido_idPedido}<b></th>
    <td id="${items[i].Pedido_idPedido}"  onClick="desplegarPedido(${items[i].Pedido_idPedido})" >${items[i].Fecha_Transaccion}</td>
    <td id="${items[i].Pedido_idPedido}" onClick="desplegarPedido(${items[i].Pedido_idPedido})" >${items[i].Monto}</td>
    <td id="${items[i].Pedido_idPedido}" onClick="desplegarPedido(${items[i].Pedido_idPedido})" >${items[i].Metodo_Pago_idMetodo_Pago == '1' ? 'Efectivo': 'Tarjeta'}</td>
    </tr>`  
  }
}


const desplegarPedido = (pedido) =>{
  $('#modalPedido').modal('show');
  var cabeceraPedido = document.getElementById('table-pedido-cabeceras');
  var filasPedido = document.getElementById('table-pedido-filas');
  clearInterval(timerPedidos)
  axios({
    method: 'POST',
    url: 'https://api-unahambre.herokuapp.com/api_propietario/obtenerPedidoDetalle',
    headers: { 'access-token': sessionStorage.getItem('token')},
    data: {
      idRestaurante : sessionStorage.getItem('idRestaurante'),
      idCompra: pedido
    }
  }).then(res=>{
    let items = res.data.items
  
    cabeceraPedido.innerHTML = ''
    cabeceraPedido.innerHTML = `<th scope="col">ID de Pedido</th>
                              <th scope="col">Platillo</th>
                              <th scope="col">Ubicacion de Entrega</th>                                
                              <th scope="col">Precio</th>                         
                              `
    filasPedido.innerHTML = ''
    for (let i = 0; i < items.length; i++) {
      filasPedido.innerHTML += `<tr id="row">
                                <th  scope="row" > <b>${items[i].idCompra}<b></th>
                                <td >${items[i].Nombre}</td>
                                <td >${items[i].Ubicacion}</td>                            
                                <td >${items[i].Precio}</td>
                                </tr>` 
                                  
    }
  }).catch(function(error){
    
  })

 

  
}
const cargarCabeceraPedidos = () => {
  cabecera.innerHTML = '';
  cabecera.innerHTML = `<th scope="col">ID de Pedido</th>
                        <th scope="col">Platillo</th>
                        <th scope="col">Ubicacion de Entrega</th>
                        <th scope="col">Fecha de Registro</th>       
                        <th scope="col">Estado del Pedido</th>      
                        <th scope="col" style='text-align:center'>Cambiar Estado del Pedido</th> 
                        `
}

const cargarFilasPedidos = (items) => {
 
  filas.innerHTML = '';
  for (let i = 0; i < items.length; i++) {
    filas.innerHTML += `<tr id="row">
    <th  scope="row" id="row${items[i].idCompra, i}" abbr="${items[i].idCompra}"> <b>${items[i].idCompra}<b></th>
    <td id="Nombre${items[i].idCompra}" abbr="${items[i].Nombre}" >${items[i].Nombre}</td>
    <td id="Ubicacion${items[i].idCompra}" abbr="${items[i].Ubicacion}">${items[i].Ubicacion}</td>
    <td id="Fecha_Registro${items[i].idCompra}" abbr="${items[i].Fecha_Registro}">${moment(getHoraLocal(items[i].Fecha_Registro)).fromNow()}</td>
    <td align="center" id="Estado${items[i].idCompra,i}" class='class${items[i].idCompra} ${items[i].Estado == 'P' ? 'table-secondary': (items[i].Estado == 'R'? 'table-danger': 'table-success')}' abbr="${items[i].Estado}"><b>${items[i].Estado == 'P' ? 'Pendiente': (items[i].Estado == 'R'? 'Rechazado': 'Entregado')}<b></td>
    <td align='center'> 
    <a href="#" class=" btn btn-sm btn-success shadow-sm" onclick="cambiarEstado(${items[i].idPedido_Detalle},1,${items[i].idCompra},${i})" ><i class="fas fa-check-circle text-white-50" ></i> Entregado </a>
    <a href="#" class="btn btn-sm btn-info shadow-sm" onclick="cambiarEstado(${items[i].idPedido_Detalle},2,${items[i].idCompra},${i})"><i class="fas fa-exclamation-circle text-white-50"></i> Pendiente </a>
    <a href="#" class=" btn btn-sm btn-danger shadow-sm" onclick="cambiarEstado(${items[i].idPedido_Detalle},3,${items[i].idCompra},${i})" ><i class="fas fa-times-circle text-white-50" ></i> Rechazado </a>
    </td>
    </tr>`  
  }
}

const verificarPedido = (idCompra)=>{
let platillosPedido = document.getElementsByClassName('class'+idCompra);
let flag = false;
Array.from(platillosPedido).forEach((pedido)=>{
  let temp = document.getElementById(pedido.id)
  if(temp.abbr === 'P' ){
    flag = true;
  } 
})

return flag;

}

const getHoraLocal= (Hora)=>{
  
  let date= moment(Hora)

  let newDate = moment(date).add(360, 'minutes')
 
  return newDate;
}

 const cambiarEstado = async (idPedidoDetalle, cambioEstado, idCompra, row)=>{
  let antiguoEstado = document.getElementById('Estado'+row).abbr;
  let nuevoEstado;
  let celdaEstado = document.getElementById('Estado'+row)
  switch (cambioEstado) {
    case 1:
      nuevoEstado = 'E'
      break;
    case 2:
      nuevoEstado = 'P'
      break;
    case 3:
      nuevoEstado = 'R'
      break;  
    default:
      break;
  }
  celdaEstado.abbr = nuevoEstado
  await axios({
    method: 'PUT',
    url: 'https://api-unahambre.herokuapp.com/api_propietario/cambiarEstadoPedido',
    headers: { 'access-token': sessionStorage.getItem('token')},
    data: {
      idPedidoDetalle,
      nuevoEstado
    }
  }).then(res=>{
    obtenerPedidos()
  }
  ).catch(function(error){
    celdaEstado.abbr = antiguoEstado
    
  })

  if(!verificarPedido(idCompra)){
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    
    swalWithBootstrapButtons.fire({
      title: '¿Completar pedidos de la compra '+idCompra+'?',
      text: "Esto moverá todos los pedidos de esta compra al historial ",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, remover pedidos.',
      cancelButtonText: 'No, aún faltan detalles.',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        swalWithBootstrapButtons.fire(
          'Pedidos removidos correctamente',
          'Los pedidos de esa compra han sido traslados al historial de pedidos.',
          'success',
          moverPedidosAHistorial(idCompra),
          setTimeout(() => {
            obtenerPedidos()
          }, 1000),
          

        )
      } else if (
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          '¡Cancelado!',
          'Este pedido pasará a estado Pendiente de nuevo',
          'error',
          cambiarEstado(idPedidoDetalle,2, idCompra, row)

        )
      }
    })
    obtenerPedidos()
  }
}

function moverPedidosAHistorial(idCompra){
  axios({
    method: 'POST',
    url: 'https://api-unahambre.herokuapp.com/api_propietario/moverPedidosAHistorial',
    headers: { 'access-token': sessionStorage.getItem('token')},
    data: {
      idCompra  
    }
  }).then(res=>{
    alert_default.fire({
      icon:'success',
      title:'¡Pedidos pasados al historial!'
    });
  }).catch(function(error){
 
  })
}

function obtenerPlatillos(){
  if(comprobarSeleccionado(sessionStorage.getItem('idRestaurante'))){
    return;
  } 
  clearInterval(timerPedidos)
  obtenerTiposPlatillos()
  document.getElementById('tablero').innerHTML = 'Lista de Platillos'
  document.getElementById('btnAgregar').setAttribute( "onClick", "mostrarModalAgregarPlatillo()");
  document.getElementById('btnAgregar').text = 'Agregar Platillo'
  axios({
    method: 'POST',
    url: 'https://api-unahambre.herokuapp.com/api_propietario/platillosRestaurante',
    headers: { 'access-token': sessionStorage.getItem('token')},
    data: {
      idRestaurante: sessionStorage.getItem('idRestaurante')
    }
  }).then(res=>{
    cargarCabeceraPlatillos();
    cargarFilasPlatillos(res.data.items);
  }).catch(function(error){
  
  });
}

const cargarCabeceraPlatillos = ()=> {
  cabecera.innerHTML = '';
  cabecera.innerHTML = `<th scope="col">#</th>
                        <th scope="col">Nombre</th>
                        <th scope="col">Descripción</th> 
                        <th scope="col">Precio</th> 
                        <th scope="col">Menu</th> 
                        <th scope="col">Tipo de Platillo</th> 
                        <th scope="col" style='text-align:center'>Acciones</th> 
              `;
}

const cargarFilasPlatillos = (items) => {

  filas.innerHTML = '';
  for (let i = 0; i < items.length; i++) {
    filas.innerHTML += `<tr>
    <th scope="row" id="rowId${items[i].idPlatillo}" abbr="${items[i].idPlatillo}">${items[i].idPlatillo}</th>
    <td id="rowNombre${items[i].idPlatillo}" abbr="${items[i].Nombre}">${items[i].Nombre}</td>
    <td id="rowDescripcion${items[i].idPlatillo}" abbr="${items[i].Descripcion}">${items[i].Descripcion}</td>
    <td id="rowPrecio${items[i].idPlatillo}" abbr="${items[i].Precio}">L. ${items[i].Precio} </td>
    <td id="rowMenu${items[i].idPlatillo}" abbr="${items[i].Menu_idMenu}">${obtenerNombreMenus(menus, items[i].Menu_idMenu )} </td>
    <td id="rowTipoPlatillo${items[i].idPlatillo}" abbr="${items[i].Tipo_Platillo_idTipo_Platillo}">${obtenerNombrePlatillos(tipoPlatillo, items[i].Tipo_Platillo_idTipo_Platillo )} </td>
    <td align='center'> 
    <a href="#" class=" btn btn-sm btn-primary shadow-sm" onclick="mostrarModalPlatillo(${items[i].idPlatillo})"><i class="fas fa-edit fa-sm text-white-50"></i> Editar </a>
    <a href="#" class=" btn btn-sm btn-primary shadow-sm" onclick="eliminarPlatillo(document.getElementById('rowId${items[i].idPlatillo}').abbr)"><i class="fas fa-trash-alt fa-sm text-white-50"></i> Eliminar </a>
    </td>

    </tr>`  
  }

}

function obtenerNombreMenus(lista, idMenu){
 
  for (let i = 0; i < lista.length; i++) {
    if(lista[i].idMenu==idMenu){
      
      return lista[i].Tipo_Menu
        } 
    }
}
function obtenerNombrePlatillos(lista, idPlatillo){
  for (let i = 0; i < lista.length; i++) {
    if(lista[i].idTipo_Platillo==idPlatillo){
      
      return lista[i].Nombre
        } 
    }
}
function cargarListaMenusPlatillos(lista, selectedValue=null){
  var opcionesMenu = document.getElementById('selPlatillo')
  opcionesMenu.innerHTML = '';
  if(selectedValue === null){
    for (let i = 0; i < lista.length; i++) {
      opcionesMenu.innerHTML += `<option value=${lista[i].idTipo_Platillo}>${lista[i].Nombre}</option>`
      }
  }
  else {
    for (let i = 0; i < lista.length; i++) {
      lista[i].idTipo_Platillo == selectedValue ?
      opcionesMenu.innerHTML += `<option value=${lista[i].idTipo_Platillo} selected>${lista[i].Nombre}</option>`:
      opcionesMenu.innerHTML += `<option value=${lista[i].idTipo_Platillo}>${lista[i].Nombre}</option>`
      }
  }
  
}
function cargarListaMenusPlatillosAgregar(lista, selectedValue=null){
  var opcionesMenu = document.getElementById('selPlatilloAgregar')
  opcionesMenu.innerHTML = '';
  if(selectedValue === null){
    for (let i = 0; i < lista.length; i++) {
      opcionesMenu.innerHTML += `<option value=${lista[i].idTipo_Platillo}>${lista[i].Nombre}</option>`
      }
  }
  else {
    for (let i = 0; i < lista.length; i++) {
      lista[i].idTipo_Platillo == selectedValue ?
      opcionesMenu.innerHTML += `<option value=${lista[i].idTipo_Platillo} selected>${lista[i].Nombre}</option>`:
      opcionesMenu.innerHTML += `<option value=${lista[i].idTipo_Platillo}>${lista[i].Nombre}</option>`
      }
  }
  
}
function cargarListaMenus(lista, selectedValue=null){
  var opcionesTipoPlatillo = document.getElementById('selMenu')
  opcionesTipoPlatillo.innerHTML = ''
  if (selectedValue===null){
    for (let i = 0; i < lista.length; i++) {
      opcionesTipoPlatillo.innerHTML += `<option value=${lista[i].idMenu}>${lista[i].Tipo_Menu}</option>`
      }
  } else {
    for (let i = 0; i < lista.length; i++) {
      lista[i].idMenu == selectedValue ? 
      opcionesTipoPlatillo.innerHTML += `<option value=${lista[i].idMenu} selected>${lista[i].Tipo_Menu}</option>` :
      opcionesTipoPlatillo.innerHTML += `<option value=${lista[i].idMenu}>${lista[i].Tipo_Menu}</option>`
     
      }
  }
}

  function cargarListaMenusAgregar(lista, selectedValue=null){
    var opcionesTipoPlatillo = document.getElementById('selMenuAgregar')
    opcionesTipoPlatillo.innerHTML = ''
    if (selectedValue===null){
      for (let i = 0; i < lista.length; i++) {
        opcionesTipoPlatillo.innerHTML += `<option value=${lista[i].idMenu}>${lista[i].Tipo_Menu}</option>`
        }
    } else {
      for (let i = 0; i < lista.length; i++) {
        lista[i].idMenu == selectedValue ? 
        opcionesTipoPlatillo.innerHTML += `<option value=${lista[i].idMenu} selected>${lista[i].Tipo_Menu}</option>` :
        opcionesTipoPlatillo.innerHTML += `<option value=${lista[i].idMenu}>${lista[i].Tipo_Menu}</option>`
       
        }
    }
    
 
}
function mostrarModalMenu(id){
  
  $('#editarMenu').modal('show')
 
  document.getElementById('hiddenIdMenu').value=id
  document.getElementById('nombreMenu').value = document.getElementById(("tipoMenu"+id)).abbr 

}

async function editarMenu(idMenu){
 
  let newNombreMenu = document.getElementById('nombreMenu').value;
  if(!newNombreMenu){
    alert_default.fire({
      icon:'error',
      title:'Un nuevo nombre de Menu es obligatorio'
    });
    $('#editarMenu').modal('hide')
    return;
  }

    await axios({
      method: 'POST',
      url: 'https://api-unahambre.herokuapp.com/api_propietario/admin_global_editar_menu',
      headers: { 'access-token': sessionStorage.getItem('token')},
      data : {
        idMenu: idMenu,
        nombre: newNombreMenu,
        foto : 'localhost' ,
        idCategoria: 0
      }
      
    }
   
    ).then(res=>{
      if(res.data.error[1][0].mensaje){
        alert_default.fire({
          icon:'error',
          title: res.data.error[1][0].mensaje
        });
      }
     else {
      alert_default.fire({
        icon:'success',
        title:'Accion realizada con exito'
      });
     }
    }).catch(function(error){
      
      alert_default.fire({
        icon:'error',
        title:'No se pudo completar la accion'
      });
    });
     /**TOAST AQUÍ */
  obtenerMenus()
}



const eliminarMenu = (idMenu) => {
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-danger'
    },
    buttonsStyling: false
  })
  
  swalWithBootstrapButtons.fire({
    title: '¿Desea eliminar el Menú?',
    text: "Esto eliminará también los platillos de este menú ",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Si',
    cancelButtonText: 'No',
    reverseButtons: true
  }).then((result) => {
    if (result.value) {
      swalWithBootstrapButtons.fire(
        'Menu eliminado',
        'Si desea recuperarlo contáctenos vía correo',
        'success',
        axios({
          method: 'POST',
          url: 'https://api-unahambre.herokuapp.com/api_propietario/eliminar-menu',
          headers: { 'access-token': sessionStorage.getItem('token')},
          data: {
            idMenu: idMenu
          }
        }).then(res=>{
         
          obtenerMenus()
        }).catch(function(error){
          
          alert_default.fire({
            icon:'error',
            title:'No se pudo completar la accion'
          });
        })

      )
    } else if (
      result.dismiss === Swal.DismissReason.cancel
    ) {
      swalWithBootstrapButtons.fire(
        '¡Cancelado!',
        'Se ha cancelado la acción',
        'error'   

      )
    }
  })
   /**TOAST AQUÍ */
  obtenerMenus()
}

const eliminarRestaurante = (idRestaurante) => {

  axios({
    method: 'PUT',
    url: 'https://api-unahambre.herokuapp.com/api_propietario/g-borrar-local',
    headers: { 'access-token': sessionStorage.getItem('token')},
    data: {
      idRestaurante: idRestaurante
    }
  }).then(res=>{
    alert_default.fire({
      icon:'success',
      title:'Accion realizada con exito'
    });
  }).catch(function(error){
   
    alert_default.fire({
      icon:'error',
      title:'No se pudo completar la accion'
    });
  })
   /**TOAST AQUÍ */
  obtenerRestaurantes()
}

const eliminarPlatillo = (idPlatillo) => {
  axios({
    method: 'POST',
    url: 'https://api-unahambre.herokuapp.com/api_propietario/g-eliminar-platillo',
    headers: { 'access-token': sessionStorage.getItem('token')},
    data: {
      idPlatillo : idPlatillo
    }
  }).then(res=>{
    obtenerPlatillos();
    alert_default.fire({
      icon:'success',
      title:'Accion realizada con exito'
    })
    obtenerPlatillos();;
  }).catch(function(error){
    alert_default.fire({
      icon:'error',
      title:'No se pudo completar la accion'
    });
  })
   /**TOAST AQUÍ */
  obtenerPlatillos();
}
const mostrarModalAgregarMenu = () => {
  $('#agregarMenu').modal('show')
}

const agregarMenu = async () => {
  let nombreMenu = document.getElementById('nombreMenuAgregar').value;
  if(!nombreMenu){
    alert_default.fire({
      icon:'error',
      title:'Un nombre de Menu es obligatorio'
    });
    $('#agregarMenu').modal('hide')
    return
  }
 await axios({
    method: 'POST',
    url: 'https://api-unahambre.herokuapp.com/api_propietario/insertar-menu',
    headers: { 'access-token': sessionStorage.getItem('token')},
    data :{
      tipoMenu: nombreMenu,
      idRestaurante: sessionStorage.getItem('idRestaurante'),
      fotoMenu: 'localhost/img',
      idCategoria: 0
    }
  }).then(res=>{
  
    if(res.data.error[1][0].mensaje){
      alert_default.fire({
        icon:'error',
        title: res.data.error[1][0].mensaje
      });
    }
   else {
    alert_default.fire({
      icon:'success',
      title:'Accion realizada con exito'
    });
   }
    
    $('#agregarMenu').modal('hide')
  }
  ).catch(err=>{
console.log(err)
    alert_default.fire({
      icon:'error',
      title:'No se pudo completar la accion'
    });
  })
 /**TOAST AQUÍ */
  obtenerMenus()
}

const mostrarModalAgregarPlatillo = () => {
  $('#agregarPlatillo').modal('show')
  cargarListaMenusAgregar(menus)
  obtenerTiposPlatillos()
  cargarListaMenusPlatillosAgregar(tipoPlatillo)
}

const validarCampo = (campo, nombre) => {
  
if(!campo ){
  alert_default.fire({
    icon:'error',
    title:'El campo '+nombre+' es obligatorio'
  });
  return false;
}
return true;
}

const agregarPlatillo = async () => {
 
  let nombrePlatillo = document.getElementById('nombrePlatilloAgregar').value;
  if(!validarCampo(nombrePlatillo, 'nombre')){
    $('#agregarPlatillo').modal('hide')
    return
  }
  let descripcionPlatillo = document.getElementById('descripcionPlatilloAgregar').value;
  if(!validarCampo(descripcionPlatillo, 'descripción')){
    $('#agregarPlatillo').modal('hide')
    return
  }
  
  let precioPlatillo = document.getElementById('precioPlatilloAgregar').value;
  if(!validarCampo(precioPlatillo, 'precio')){
    $('#agregarPlatillo').modal('hide')
    return
  }
  let newMenu = document.getElementById('selMenuAgregar', 'Menu').value;
  
  let newTipoPlatillo = document.getElementById('selPlatilloAgregar').value;
  
 await axios({
    method: 'POST',
    url: 'https://api-unahambre.herokuapp.com/api_propietario/insertar-platillo',
    headers: { 'access-token': sessionStorage.getItem('token')},
    data :{
      nombre: nombrePlatillo,
      descripcion: descripcionPlatillo,
      idMenu: newMenu,
      tipoPlatillo: newTipoPlatillo,
      precio: precioPlatillo

    }
  }).then(res=>{
    if(res.data.error[1][0].mensaje){
      alert_default.fire({
        icon:'error',
        title: res.data.error[1][0].mensaje
      });
    }
   else {
    alert_default.fire({
      icon:'success',
      title:'Accion realizada con exito'
    });
   }

    $('#agregarPlatillo').modal('hide')
    

  }
  ).catch(err=>{
    
    alert_default.fire({
      icon:'error',
      title:'No se pudo completar la accion'
    });
  })
   /**TOAST AQUÍ */
  obtenerPlatillos()
}

function mostrarModalPlatillo(rowId){
  let menuSeleccionado = document.getElementById('rowMenu'+rowId).abbr
  let tipoPlatilloSeleccionado = document.getElementById('rowTipoPlatillo'+rowId).abbr
  $('#editarPlatillo').modal('show')
  cargarListaMenus(menus, menuSeleccionado)
  obtenerTiposPlatillos()
  cargarListaMenusPlatillos(tipoPlatillo, tipoPlatilloSeleccionado)
  document.getElementById('hiddenIdPlatillo').value = document.getElementById(("rowId"+rowId)).abbr 
  document.getElementById('nombrePlatillo').value = document.getElementById(("rowNombre"+rowId)).abbr 
  document.getElementById('descripcionPlatillo').value = document.getElementById("rowDescripcion"+rowId).abbr
  document.getElementById('precioPlatillo').value = document.getElementById("rowPrecio"+rowId).abbr
  
  
}
async function editarPlatillo(){
  let idPlatillo  = document.getElementById('hiddenIdPlatillo').value;
  let newNombre = document.getElementById('nombrePlatillo').value;
  if(!validarCampo(newNombre, 'nombre')){
    $('#editarPlatillo').modal('hide')
    return
  }
  let newDescripcion = document.getElementById('descripcionPlatillo').value;
  if(!validarCampo(newDescripcion, 'descripción')){
    $('#editarPlatillo').modal('hide')
    return
  }
  let newPrecio = document.getElementById('precioPlatillo').value;
  if(!validarCampo(newPrecio, 'precio')){
    $('#editarPlatillo').modal('hide')
    return
  }

  let newMenu = document.getElementById('selMenu');
  let idMenu = newMenu.options[newMenu.selectedIndex].value;
  
  let newTipoPlatillo = document.getElementById('selPlatillo').value;
    await axios({
      method: 'PUT',
      url: 'https://api-unahambre.herokuapp.com/api_propietario/admin_local_modificar-platillo',
      headers: { 'access-token': sessionStorage.getItem('token')},
      data : {
        idPlatillo,
        nombrePlatillo: newNombre,
        descripcion: newDescripcion,
        precio : newPrecio,
        idMenu,
        idTipoPlatillo : newTipoPlatillo

      }
     
    }).then(res=>{
      

      $('#editarPlatillo').modal('hide')
      if(res.data.error[1][0].mensaje){
        alert_default.fire({
          icon:'error',
          title: res.data.error[1][0].mensaje
        });
      }
     else {
      alert_default.fire({
        icon:'success',
        title:'Accion realizada con exito'
      });
     }
    }).catch(function(error){
    
      alert_default.fire({
        icon:'error',
        title:'No se pudo completar la accion'
      });
    });
     /**TOAST AQUÍ */
  obtenerPlatillos()
}


/**<<<<<<<<<<<<<<<<  Manejo de imagenes  >>>>>>>>>>>>>>>>>>>>>> */
const imgUploader = document.getElementById('imgMenu-uploader')
const imgUploader_platillo = document.getElementById('imgPlatillo-uploader')

imgUploader.addEventListener('change', (e) => {

  const file = e.target.files[0]
   let fd = new FormData();
   fd.append("image", file);

   axios({
     url: 'https://api-unahambre.herokuapp.com/api_propietario/cambiar_foto_menu',
     method: 'POST',
     data: fd,
     headers: {
       'id-menu': document.getElementById('hiddenIdMenu').value,
       'access-token': sessionStorage.getItem('token')
     }
   }).then(res => {
     alert_default.fire({
       icon: 'success',
       title: 'Foto de menu cambiada'
     });
     obtenerMenus()
   }).catch(err => {
     console.log(err);
     alert_default.fire({
       icon: 'error',
       title: 'la foto del menu no ha sido cambiada'
     });
   });
})



imgUploader_platillo.addEventListener('change', (e) => {
  const file = e.target.files[0]
  let fd = new FormData();
  fd.append("image", file);

  axios({
    url: 'https://api-unahambre.herokuapp.com/api_propietario/cambiar_foto_platillo',
    method: 'POST',
    data: fd,
    headers: {
      'id-platillo': document.getElementById('hiddenIdPlatillo').value,
      'access-token': sessionStorage.getItem('token')
    }
  }).then(res => {
    alert_default.fire({
      icon: 'success',
      title: 'Foto de platillo cambiada'
    });
    obtenerPlatillos()
  }).catch(err => {
    console.log(err);
    alert_default.fire({
      icon: 'error',
      title: 'la foto del platillo no ha sido cambiada'
    });
  });
})