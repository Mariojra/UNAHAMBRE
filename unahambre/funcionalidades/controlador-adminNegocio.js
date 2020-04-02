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

window.onload = obtenerPlatillos();

var cabecera = document.getElementById('table-cabeceras');
var filas = document.getElementById('table-filas');


document.getElementById('userDropdown').text = sessionStorage.getItem('userName')
function obtenerRestaurantes(){
  axios({
    method:'GET',
    url:'http://localhost:3001/api/restaurantes'
}).then(res=>{
  cargarCabeceraRestaurantes();
  cargarFilasResturantes(res.data.items);
  
}).catch(function(error){
    console.log(error);
});  
}


const cargarCabeceraRestaurantes = () => {
    cabecera.innerHTML = '';
    cabecera.innerHTML = `<th scope="col">#</th>
                          <th scope="col">Nombre</th>
                          <th scope="col">Teléfono</th> 
                          <th scope="col">Ubicación</th> 
                          <th scope="col" style='text-align:center'>Acciones</th> 
                `;
    
}

const cargarFilasResturantes = (items) => {
  filas.innerHTML = '';
  for (let i = 0; i < items.length; i++) {
    filas.innerHTML += `<tr>
    <th scope="row" id="row${items[i].idRestaurante}" abbr="${items[i].idRestaurante}">${items[i].idRestaurante}</th>
    <td>${items[i].Nombre_Local}</td>
    <td>${items[i].Telefono}</td>
    <td>${items[i].Ubicacion}</td>
    <td align='center'> <a href="#" class=" btn btn-sm btn-primary shadow-sm" id=><i class="fas fa-plus fa-sm text-white-50"></i> Agregar </a> 
    <a href="#" class=" btn btn-sm btn-primary shadow-sm" id=><i class="fas fa-edit fa-sm text-white-50"></i> Editar </a>
    <a href="#" class=" btn btn-sm btn-primary shadow-sm" onclick="eliminarRestaurante(document.getElementById('row${items[i].idRestaurante}').abbr)"><i class="fas fa-trash-alt fa-sm text-white-50"></i> Eliminar </a>
    </td>
    </tr>`  
  }
}

function obtenerMenus(){
  document.getElementById('tablero').innerHTML = 'Lista de Menus'
  document.getElementById('btnAgregar').setAttribute( "onClick", "mostrarModalAgregarMenu()");
  document.getElementById('btnAgregar').text = 'Agregar Menu'
 
  axios({

method: 'GET',
url : 'http://localhost:3001/api/menus'
}).then(res=>{
  cargarCabeceraMenu();
  cargarFilasMenu(res.data.items);

}).catch(function(error){
    console.log(error);
});  

}
const cargarCabeceraMenu = () => {
  cabecera.innerHTML = '';
  cabecera.innerHTML = `<th scope="col">#</th>
                        <th scope="col">Tipo de Menú</th>
                        <th scope="col">Fecha de registro</th> 
                       
                        <th scope="col" style='text-align:center'>Acciones</th> 
                        `;
}

const cargarFilasMenu = (items) => {
  filas.innerHTML = '';
  for (let i = 0; i < items.length; i++) {
    filas.innerHTML += `<tr>
    <th scope="row" id="row${items[i].idMenu}" abbr="${items[i].idMenu}">${items[i].idMenu}</th>
    <td >${items[i].Tipo_Menu}</td>
    <td>${items[i].Fecha_Registro}</td>
    
    <td align='center'> 
    <a href="#" class=" btn btn-sm btn-primary shadow-sm" onclick="mostrarModalMenu(document.getElementById('row${items[i].idMenu}').abbr)" ><i class="fas fa-edit fa-sm text-white-50" ></i> Editar </a>
    <a href="#" class=" btn btn-sm btn-primary shadow-sm" onclick="eliminarMenu(document.getElementById('row${items[i].idMenu}').abbr)"><i class="fas fa-trash-alt fa-sm text-white-50"></i> Eliminar </a>
    </td>
    </tr>`  
  }
}

function obtenerPlatillos(){
  document.getElementById('tablero').innerHTML = 'Lista de Platillos'
  document.getElementById('btnAgregar').setAttribute( "onClick", "mostrarModalAgregarPlatillo()");
  document.getElementById('btnAgregar').text = 'Agregar Platillo'
  axios({
    method: 'GET',
    url: 'http://localhost:3001/api/platillos'
  }).then(res=>{
    cargarCabeceraPlatillos();
    cargarFilasPlatillos(res.data.items);
  }).catch(function(error){
    console.log(error)
  });
}

const cargarCabeceraPlatillos = ()=> {
  cabecera.innerHTML = '';
  cabecera.innerHTML = `<th scope="col">#</th>
                        <th scope="col">Nombre</th>
                        <th scope="col">Descripción</th> 
                        <th scope="col">Precio</th> 
                        <th scope="col" style='text-align:center'>Acciones</th> 
              `;
}

const cargarFilasPlatillos = (items) => {
  filas.innerHTML = '';
  for (let i = 0; i < items.length; i++) {
    filas.innerHTML += `<tr>
    <th scope="row" id="row${items[i].idPlatillo}" abbr="${items[i].idPlatillo}">${items[i].idPlatillo}</th>
    <td>${items[i].Nombre}</td>
    <td>${items[i].Descripcion}</td>
    <td>L. ${items[i].Precio} </td>
    <td align='center'> 
    <a href="#" class=" btn btn-sm btn-primary shadow-sm" onclick="mostrarModalPlatillo()" id=><i class="fas fa-edit fa-sm text-white-50"></i> Editar </a>
    <a href="#" class=" btn btn-sm btn-primary shadow-sm" onclick="eliminarPlatillo(document.getElementById('row${items[i].idPlatillo}').abbr)"><i class="fas fa-trash-alt fa-sm text-white-50"></i> Eliminar </a>
    </td>

    </tr>`  
  }

}

function mostrarModalMenu(id){
  $('#editarMenu').modal('show')
  document.getElementById('hiddenIdMenu').value=id

}

async function editarMenu(idMenu){
 
  let newNombreMenu = document.getElementById('nombreMenu').value;
  

    await axios({
      method: 'PUT',
      url: 'http://localhost:3001/api/admin/modificar_menus',
      data : {
        idMenu: idMenu,
        nombreMenu: newNombreMenu,
        foto : 'localhost' 
      }
    }).then(res=>{
      console.log(res)
      alert_default.fire({
        icon:'success',
        title:'Accion realizada con exito'
      });
    }).catch(function(error){
      console.log(error)
      alert_default.fire({
        icon:'error',
        title:'No se pudo completar la accion'
      });
    });
     /**TOAST AQUÍ */
  obtenerMenus()
}

const eliminarMenu = (idMenu) => {

  axios({
    method: 'POST',
    url: 'http://localhost:3001/api/eliminar-menu',
    data: {
      idMenu: idMenu
    }
  }).then(res=>{
    console.log(res)
    alert_default.fire({
      icon:'success',
      title:'Accion realizada con exito'
    });
  }).catch(function(error){
    console.log(error)
    alert_default.fire({
      icon:'error',
      title:'No se pudo completar la accion'
    });
  })
   /**TOAST AQUÍ */
  obtenerMenus()
}

const eliminarRestaurante = (idRestaurante) => {

  axios({
    method: 'PUT',
    url: 'http://localhost:3001/api/admin-borrar-local',
    data: {
      idRestaurante: idRestaurante
    }
  }).then(res=>{
    console.log(res)
    alert_default.fire({
      icon:'success',
      title:'Accion realizada con exito'
    });
  }).catch(function(error){
    console.log(error)
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
    url: 'http://localhost:3001/api/eliminar-platillo',
    data: {
      idPlatillo : idPlatillo
    }
  }).then(res=>{
    console.log(res)
    alert_default.fire({
      icon:'success',
      title:'Accion realizada con exito'
    });
  }).catch(function(error){
    console.log(error)
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
 await axios({
    method: 'POST',
    url: 'http://localhost:3001/api/insertar-menu',
    data :{
      tipoMenu: nombreMenu,
      idRestaurante: 4,
      fotoMenu: 'localhost/img',
      idCategoria: 0

    }
  }).then(res=>{
    console.log(res)
    alert_default.fire({
      icon:'success',
      title:'Accion realizada con exito'
    });
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
}

const agregarPlatillo = async () => {
  let nombrePlatillo = document.getElementById('nombrePlatilloAgregar').value;
  let descripcionPlatillo = document.getElementById('descripcionPlatilloAgregar').value;
  let precioPlatillo = document.getElementById('precioPlatilloAgregar').value;
 await axios({
    method: 'POST',
    url: 'http://localhost:3001/api/insertar-platillo',
    data :{
      nombre: nombrePlatillo,
      descripcion: descripcionPlatillo,
      idMenu: 2,
      tipoPlatillo: 7,
      precio: precioPlatillo

    }
  }).then(res=>{
    console.log(res)
    alert_default.fire({
      icon:'success',
      title:'Accion realizada con exito'
    });
  }
  ).catch(err=>{
    console.log(err)
    alert_default.fire({
      icon:'error',
      title:'No se pudo completar la accion'
    });
  })
   /**TOAST AQUÍ */
  obtenerPlatillos()
}

function mostrarModalPlatillo(){
  $('#editarPlatillo').modal('show')
 
  
}
async function editarPlatillo(){
 
  let newNombre = document.getElementById('nombrePlatillo').value;
  let newDescripcion = document.getElementById('descripcionPlatillo').value;
  let newPrecio = document.getElementById('precioPlatillo').value;

    await axios({
      method: 'PUT',
      url: 'http://localhost:3001/api/admin/modificar-platillo',
      data : {
        nombrePlatillo: newNombre,
        descripcion: newDescripcion,
        precio : newPrecio,
        idMenu : 2,
        idTipoPlatillo : 7


      }
    }).then(res=>{
      console.log(res)
      alert_default.fire({
        icon:'success',
        title:'Accion realizada con exito'
      });
    }).catch(function(error){
      console.log(error)
      alert_default.fire({
        icon:'error',
        title:'No se pudo completar la accion'
      });
    });
     /**TOAST AQUÍ */
  obtenerPlatillos()
}


