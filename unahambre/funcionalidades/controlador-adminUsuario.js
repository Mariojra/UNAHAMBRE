document.addEventListener("DOMContentLoaded",()=>{
  if(sessionStorage.getItem('token')==undefined){
      window.location.assign('index.html');
  } 
});

window.onload = function (){
  document.getElementById('userSession').innerHTML = sessionStorage.getItem('userName');
}

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

   // Scroll to top button appear
  //  $(document).on('scroll', function() {
  //    var scrollDistance = $(this).scrollTop();
  //    if (scrollDistance > 100) {
  //      $('.scroll-to-top').fadeIn();
  //    } else {
  //      $('.scroll-to-top').fadeOut();
  //    }
  //  });

   // Smooth scrolling using jQuery easing
   $(document).on('click', 'a.scroll-to-top', function(e) {
     var $anchor = $(this);
     $('html, body').stop().animate({
       scrollTop: ($($anchor.attr('href')).offset().top)
     }, 1000, 'easeInOutExpo');
     e.preventDefault();
   });

 })(jQuery); // End of use strict


function cerrarSesion(){
  sessionStorage.removeItem('token');
}


function ImprimirLocales(){
    axios({
      method:'GET',
      url:'http://localhost:3001/api/g_mostrar_restaurantes'
          }).then(res=>{
            
           
            cargarCabeceraTablaLocales();
            cargarFilasLocales(res.data.items);
          }).catch(function(error){
              console.log(error);
          });      
}

const cargarCabeceraTablaLocales = () =>{
  document.querySelector('#Tablas').innerHTML = '';
  document.querySelector('#Tablas').innerHTML  += `
                              <div class="col-xl-12">
                              <p class="h2 font-weight-bold text-primary py-2">Locales</p><hr class="separador">
                            </div>
                            <div class="col-xl-12">
                              <table class="table">
                                <thead class="thead-dark">
                                  <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Nombre Local</th>
                                    <th scope="col">Dueño</th>
                                    <th scope="col">Ubicacion</th>
                                    <th scope="col">Telefono</th>
                                    <th scope="col">Correo</th>
                                  </tr>
                                </thead>
                                <tbody id='DatosLocales'>
                                 
                                </tbody>
                              </table>
                            </div>
                  `;
}

const cargarFilasLocales = (datos) =>{
  let infoLocales = datos
  document.querySelector('#DatosLocales').innerHTML = '';

  for (let i = 0; i < infoLocales.length; i++) {
   document.querySelector('#DatosLocales').innerHTML += `
     <tr>
       <th>${i+1}</th>
       <td>${infoLocales[i].Nombre_Local}</td>
       <td>${infoLocales[i].Nombre_Usuario}</td>
       <td>${infoLocales[i].Ubicacion}</td>
       <td>${infoLocales[i].Telefono}</td>
       <td>${infoLocales[i].Correo}</td>
     </tr>
     `;
  }
  console.log("Datos de Locales cargados: ",infoLocales)
}

function ImprimirUsuarios(){
  axios({
    method:'GET',
    url:'http://localhost:3001/api/admin_global_mostrar_usuarios'
        }).then(res=>{
          cargarCabeceraTablaUsuarios();
          cargarFilasUsuarios(res.data.items);
           
        }).catch(function(error){
            console.log(error);
        });      
}


const cargarCabeceraTablaUsuarios = () =>{
  document.querySelector('#Tablas').innerHTML = '';
  document.querySelector('#Tablas').innerHTML  += `
                            <div class="col-xl-12">
                            <p class="h2 font-weight-bold text-success py-2">Usuarios</p><hr class="separador">
                          </div>
                          <div class="col-xl-12">
                            <table class="table">
                              <thead class="thead-dark">
                                <tr>
                                  <th scope="col">#</th>
                                  <th scope="col">Nombres</th>
                                  <th scope="col">Apellidos</th>
                                  <th scope="col">Celular</th>
                                  <th scope="col">Numero Identidad</th>
                                  <th scope="col">Correo</th>
                                  <th scope="col">Sexo</th>
                                  <th scope="col">Usuario</th>
                                  <th scope="col">Fecha Ingreso</th>
                                  <th scope="col">Foto Perfil</th>
                                </tr>
                              </thead>
                              <tbody id='DatosUsuarios'>
                               
                              </tbody>
                            </table>
                          </div>
                `;
}

const cargarFilasUsuarios = (datos) =>{
  let infoUsuarios = datos;
           document.querySelector('#DatosUsuarios').innerHTML = '';

            for (let i = 0; i < infoUsuarios.length; i++) {
             document.querySelector('#DatosUsuarios').innerHTML += `
               <tr>
                 <th>${i+1}</th>
                 <td>${infoUsuarios[i].Nombre}</td>
                 <td>${infoUsuarios[i].Apellidos}</td>
                 <td>${infoUsuarios[i].Celular}</td>
                 <td>${infoUsuarios[i].Numero_Identidad}</td>
                 <td>${infoUsuarios[i].Correo}</td>
                 <td>${infoUsuarios[i].Sexo}</td>
                 <td>${infoUsuarios[i].Nombre_Usuario}</td>
                 <td>${infoUsuarios[i].Fecha_Ingreso}</td>
                 <td><img src="${infoUsuarios[i].Foto_Perfil}" class="img_menu" alt="imagen perfil"></td>
               </tr>
               `;
            }
  console.log("Datos de Usuarios cargados :", infoUsuarios)
}

function ImprimirMenus(){
  axios({
    method:'GET',
    url:'http://localhost:3001/api/admin_global_menus_restaurante'
        }).then(res=>{
          
          cargarCabeceraTablaMenus();
          cargarFilasMenus(res.data.items);
        }).catch(function(error){
            console.log(error);
        });      

}

const cargarCabeceraTablaMenus = () =>{
  document.querySelector('#Tablas').innerHTML = '';
  document.querySelector('#Tablas').innerHTML  += `
                            <div class="col-xl-12">
                            <p class="h2 font-weight-bold text-info py-2">Menus</p><hr class="separador">
                          </div>
                          <div class="col-xl-12">
                            <table class="table">
                              <thead class="thead-dark">
                                <tr>
                                  <th scope="col">#</th>
                                  <th scope="col">Nombre Menu</th>
                                  <th scope="col">Nombre Local</th>
                                  <th scope="col">Dueño Local</th>
                                  <th scope="col">Fecha Registro</th>
                                  <th scope="col">Foto Menu</th>
                                </tr>
                              </thead>
                              <tbody id='DatosMenu'>
                               
                              </tbody>
                            </table>
                          </div>
                `;
}

const cargarFilasMenus = (datos) =>{
  let infoMenus = datos;
  document.querySelector('#DatosMenu').innerHTML = '';

   for (let i = 0; i < infoMenus.length; i++) {
    document.querySelector('#DatosMenu').innerHTML += `
      <tr>
        <th>${i+1}</th>
        <td>${infoMenus[i].Nombre_Menu}</td>
        <td>${infoMenus[i].Nombre_Local}</td>
        <td>${infoMenus[i].Dueño_Local}</td>
        <td>${infoMenus[i].Fecha_Registro}</td>
        <td><img src="${infoMenus[i].Foto_Menu}" class="img_menu" alt="imagen perfil"></td>
      </tr>
      `;
   }
  console.log("Datos de Menus cargados :" ,infoMenus);
}

function ImprimirPlatillos(){
  axios({
    method:'GET',
    url:'http://localhost:3001/api/admin_global_platillos_menu'
        }).then(res=>{
          cargarCabeceraTablaPlatillos();
          cargarFilasPlatillos(res.data.items);
            
        }).catch(function(error){
            console.log(error);
        });      
}

const cargarCabeceraTablaPlatillos = () =>{
  document.querySelector('#Tablas').innerHTML = '';
  document.querySelector('#Tablas').innerHTML  += `
                             <div class="col-xl-12">
                             <p class="h2 font-weight-bold text-warning py-2">Platillos</p><hr class="separador">
                           </div>
                           <div class="col-xl-12">
                             <table class="table">
                               <thead class="thead-dark">
                                 <tr>
                                   <th scope="col">#</th>
                                   <th scope="col">Nombre Platillo</th>
                                   <th scope="col">Descripcion</th>
                                   <th scope="col">Precio</th>
                                   <th scope="col">Fecha Registro</th>
                                   <th scope="col">Foto Menu</th>
                                   <th scope="col">Nombre Local</th>
                                 </tr>
                               </thead>
                               <tbody id='DatosPlatillo'>
                               
                               </tbody>
                             </table>
                           </div>
                 `;
}

const cargarFilasPlatillos = (datos) =>{
  let infoPlatillo = datos;
  document.querySelector('#DatosPlatillo').innerHTML = '';
  for (let i = 0; i < infoPlatillo.length; i++) {
      document.querySelector('#DatosPlatillo').innerHTML += `
                <tr>
                  <th>${i+1}</th>
                  <td>${infoPlatillo[i].Nombre}</td>
                  <td>${infoPlatillo[i].Descripcion}</td>
                  <td>${infoPlatillo[i].Precio}</td>
                  <td>${infoPlatillo[i].Fecha_Registro}</td>
                  <td><img src="${infoPlatillo[i].Foto_Menu}" class="img_menu" alt="imagen perfil"></td>
                  <td>${infoPlatillo[i].Nombre_Local}</td>
                </tr>
                `;
  }
  console.log("Datos de Platillos cargados :",infoPlatillo);
}

function CantidadLocales(){
  axios({
    method:'GET',
    url:'http://localhost:3001/api/g_mostrar_restaurantes'
        }).then(res=>{
          
          
          let infoLocales = res.data.items;
          
          document.querySelector('#local').innerHTML= `${infoLocales.length}  Locales`;


        }).catch(function(error){
            console.log(error);
        });      
}

CantidadLocales();

function CantidadUsuarios(){
  axios({
    method:'GET',
    url:'http://localhost:3001/api/admin_global_mostrar_usuarios'
        }).then(res=>{
          let infoUsuarios = res.data.items;
          
          document.querySelector('#usuario').innerHTML = `${infoUsuarios.length}  Usuarios`;
        }).catch(function(error){
            console.log(error);
        });    
}

CantidadUsuarios();

function  CantidadMenus(){
  axios({
    method:'GET',
    url:'http://localhost:3001/api/admin_global_menus_restaurante'
        }).then(res=>{
          let infoMenu = res.data.items;
          
          document.querySelector('#menu').innerHTML = `${infoMenu.length}  Menus`;
        }).catch(function(error){
            console.log(error);
        });  
}

CantidadMenus();

function CantidadPlatillos(){
  axios({
    method:'GET',
    url:'http://localhost:3001/api/admin_global_platillos_menu'
        }).then(res=>{
          
          let infoPlatillo = res.data.items;
          
          document.querySelector('#platillo').innerHTML = `${infoPlatillo.length}  Platillos`;
        }).catch(function(error){
            console.log(error);
        });   
}

CantidadPlatillos();

function ImprimirSolicitudes(){
  axios({
    method:'GET',
    url:'http://localhost:3001/api/admin_global_mostrar_solicitudes'
        }).then(res=>{
          cargarCabeceraTablaSolicitudes();
          cargarFilasSolicitudes(res.data.items)
        }).catch(function(error){
            console.log(error);
        });      
}
const cargarCabeceraTablaSolicitudes = () =>{
  document.querySelector('#Tablas').innerHTML = '';
  document.querySelector('#Tablas').innerHTML  += `
                             <div class="col-xl-12 navTabla">
                             <p class="h2 font-weight-bold text-danger py-2">Solicitudes</p>
                             <form class=" d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search">
                              <div class=" input-group ">
                                <input type="text" class="form-control bg-light border-0 small" placeholder="Buscar..." aria-label="Search" aria-describedby="basic-addon2">
                                <div class="input-group-append">
                                  <button class="btn btn-primary" type="button">
                                    <i class="fas fa-search fa-sm"></i>
                                  </button>
                                </div>
                              </div>
                            </form> 
                             <hr class="separador">
                            </form>
                           </div>
                           <div class="col-xl-12">
                             <table class="table">
                               <thead class="thead-dark">
                                 <tr>
                                   <th scope="col">#</th>
                                   <th scope="col">Estado Solicitud</th>
                                   <th scope="col">Nombre Local</th>
                                   <th scope="col">Nombre Dueño</th>
                                   <th scope="col">Telefono</th>
                                   <th scope="col">Ubicacion</th>
                                   <th scope="col">Fecha Solicitud</th>
                                 </tr>
                               </thead>
                               <tbody id='DatosSolicitud'>
                               
                               </tbody>
                             </table>
                           </div>
                 `;
}

const cargarFilasSolicitudes = (datos) =>{
  let infoSolicitudes = datos;
  document.querySelector('#DatosSolicitud').innerHTML = '';
  for (let i = 0; i < infoSolicitudes.length; i++) {
      document.querySelector('#DatosSolicitud').innerHTML += `
                <tr>
                  <th>${i+1}</th>
                  <td>${infoSolicitudes[i].EstadoSolicitud}</td>
                  <td>${infoSolicitudes[i].Nombre_Local}</td>
                  <td>${infoSolicitudes[i].Nombre_Usuario}</td>
                  <td>${infoSolicitudes[i].Telefono}</td>
                  <td>${infoSolicitudes[i].Ubicacion}</td>
                  <td>${infoSolicitudes[i].FechaSolicitud}</td>
                </tr>
                `;
  }
  console.log("Datos de Solicitud cargados :",infoSolicitudes);
}

function CantidadSolicitudes(){
  axios({
    method:'GET',
    url:'http://localhost:3001/api/admin_global_mostrar_solicitudes'
        }).then(res=>{
          
          let infoSolicitudes = res.data.items;
          document.querySelector('#solicitudes').innerHTML = `${infoSolicitudes.length}  Solicitudes`;
        }).catch(function(error){
            console.log(error);
        });   
}

CantidadSolicitudes();




/////////////////////////////////////////////////////

function GestionUsuarioAdmin(){
  
  axios({
    method:'POST',
    url:'http://localhost:3001/api/admin_global_usuario_filtro_rol',
    data:{
      "idRol":0
        }
    }).then(res=>{
      
      cargarCabeceraTablaEditarUsuarios()
      cargarFilasGestionUsuario(res.data.items[0]);
          
        }).catch(function(error){
            console.log(error);
        });      
}

function GestionUsuarioPropietario(){
  
  axios({
    method:'POST',
    url:'http://localhost:3001/api/admin_global_usuario_filtro_rol',
    data:{
      "idRol":1
        }
    }).then(res=>{
    
      cargarCabeceraTablaEditarUsuarios()
      cargarFilasGestionUsuario(res.data.items[0]);
          
        }).catch(function(error){
            console.log(error);
        });      
}
function GestionUsuarioComun(){
  
  axios({
    method:'POST',
    url:'http://localhost:3001/api/admin_global_usuario_filtro_rol',
    data:{
      "idRol":2
        }
    }).then(res=>{
      
      cargarCabeceraTablaEditarUsuarios()
      cargarFilasGestionUsuario(res.data.items[0]);
          
        }).catch(function(error){
            console.log(error);
        });      
}
const cargarCabeceraTablaEditarUsuarios = () =>{
  document.querySelector('#Tablas').innerHTML = '';
  document.querySelector('#Tablas').innerHTML  += `
                            <div class="col-xl-12">
                            <p class="h2 font-weight-bold text-success py-2">Usuarios</p><hr class="separador">
                          </div>
                          <div class="col-xl-12">
                            <table class="table">
                              <thead class="thead-dark">
                                <tr>
                                  <th scope="col">#</th>
                                  <th scope="col">Nombres</th>
                                  <th scope="col">Apellidos</th>
                                  <th scope="col">Nombre Usuario</th>
                                  <th scope="col">Rol</th>
                                  <th scope="col">Foto Perfil</th>
                                  <th scope="col"></th>
                                  <th scope="col"></th>
                                </tr>
                              </thead>
                              <tbody id='DatosUsuariosAdmin'>
                               
                              </tbody>
                            </table>
                          </div>
                `;
}

const cargarFilasGestionUsuario = (datos) =>{
  let infoUsuarios = datos;
  document.querySelector('#DatosUsuariosAdmin').innerHTML = '';
  for (let i = 0; i < infoUsuarios.length; i++) {              
      document.querySelector('#DatosUsuariosAdmin').innerHTML += `
                <tr id="tablaUsuario">
                  <td id="row${i}idUsuario">${i+1}</td>
                  <td id="row${i}Nombre">${infoUsuarios[i].Nombre}</td>
                  <td id="row${i}Apellidos">${infoUsuarios[i].Apellidos}</td> 
                  <td id="row${i}Nombre_Usuario">${infoUsuarios[i].Nombre_Usuario}</td>
                  <td id="row${i}Rol"></td>
                  <td id="row${i}Foto_Perfil"><img src="${infoUsuarios[i].Foto_Perfil}" class="img_menu" alt="imagen perfil"></td>
                  <td><button class="btn btn-primary" type="button" onclick="infoModalEditar(${i},${infoUsuarios[i].Rol_idRol})" data-toggle="modal" data-target="#ModalEditar">Editar</button></td>
                  <td id="row${i}BotonEliminar"></td>
                </tr>
                `;  
                if(infoUsuarios[i].Rol_idRol==0){
                  document.querySelector(`#row${i}Rol`).innerHTML = "Usuario Administrador";
                }else if(infoUsuarios[i].Rol_idRol == 1){
                  document.querySelector(`#row${i}Rol`).innerHTML = "Usuario Propietario";
                  document.querySelector(`#row${i}BotonEliminar`).innerHTML = `<button class="btn btn-primary" type="button" onclick="infoModalEliminar(${i},${infoUsuarios[i].Rol_idRol})" data-toggle="modal" data-target="#ModalEliminar">Eliminar</button>`;
                }else if(infoUsuarios[i].Rol_idRol == 2){
                  document.querySelector(`#row${i}Rol`).innerHTML = "Usuario Comun";
                  document.querySelector(`#row${i}BotonEliminar`).innerHTML = `<button class="btn btn-primary" type="button" onclick="infoModalEliminar(${i},${infoUsuarios[i].Rol_idRol})" data-toggle="modal" data-target="#ModalEliminar">Eliminar</button>`;
                }                       
  }
}

function infoModalEditar(fila,rol){
  cadenaFila =`#row${fila}`
  idUsuario = document.querySelector(`${cadenaFila}idUsuario`).innerHTML
  Nombre = document.querySelector(`${cadenaFila}Nombre`).innerHTML
  Apellidos = document.querySelector(`${cadenaFila}Apellidos`).innerHTML
  Nombre_Usuario = document.querySelector(`${cadenaFila}Nombre_Usuario`).innerHTML
  Administrador = document.querySelector(`${cadenaFila}Rol`).innerHTML
  Foto_Perfil = document.querySelector(`${cadenaFila}Foto_Perfil`).innerHTML
  idRol = rol;
  
  document.querySelector('#contenido_modal').innerHTML = '';

  document.querySelector('#contenido_modal').innerHTML = `
                        <div class="modal-header">
                          <h5 class="modal-title" id="exampleModalLabel">Editar Usuario Administrador</h5>
                          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                          </button>
                        </div>
                      <div class="modal-body" >
                        <!--FORMULARIO DE EDITAR USUARIO-->
                          <form>
                          <div class="row">
                            <div class="col">
                              <label for="Nombre">Nombres:</label>
                              <input type="text" id="NombreModal" class="form-control" name="Nombre">
                            </div>
                            <div class="col">
                              <label for="Apellidos">Apellidos:</label>
                              <input type="text" id="ApellidosModal" class="form-control" name="Apellidos">
                            </div>
                            <div class="col-12">
                              <label for="Usuario">Usuario:</label>
                              <input type="text" id="UsuarioModal" class="form-control" name="Usuario">
                            </div>
                          </div>
                        </form>

                      </div>
                      <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
                        <button type="button" class="btn btn-primary" onclick="editarUsuario(${idUsuario},${idRol})">Guardar Cambios</button>
                      </div>            
  `
  document.querySelector('#NombreModal').value =Nombre
  document.querySelector('#ApellidosModal').value =Apellidos
  document.querySelector('#UsuarioModal').value =Nombre_Usuario
  // document.querySelector('#prueba').value = Nombre_Usuario
   console.log("Fila:",cadenaFila,"  idUsuario: ",idUsuario,"  Nombres: ",Nombre,"  Apellidos: ",Apellidos,"  Nombre Usuario: ",Nombre_Usuario,"  Rol: ",Administrador,"  Foto Perfil: ",Foto_Perfil)
}

async function editarUsuario(id,rol){
  let nombres =document.querySelector('#NombreModal').value 
  let apellidos =document.querySelector('#ApellidosModal').value 
  let usuario =document.querySelector('#UsuarioModal').value
  
  await axios({
    method:'POST',
    url:'http://localhost:3001/api/admin_global_editar_usuario',
    data:{
      "idUsuario":id,
      "usuario":usuario,
      "nombre":nombres,
      "apellido":apellidos
    }
        }).then(res=>{
          console.log(res)
        }).catch(function(error){
            console.log(error);
        });  
  
  
  $('#ModalEditar').modal('hide')
  //AQUI DEBE IR LA ALERTA DE SE EDITO CORRECTAMENTE EL USUARIO
  alert_default.fire({
    icon:'success',
    title:'Se edito correctamente el usuario'
  })
  if(rol == 0){
    GestionUsuarioAdmin();
  }else if(rol == 1){
    GestionUsuarioPropietario();
  }else if(rol == 2){
    GestionUsuarioComun();
  }  

  console.log(id,nombres,apellidos,usuario)
}


function infoModalEliminar(fila,rol){
  cadenaFila =`#row${fila}`
  idUsuario = document.querySelector(`${cadenaFila}idUsuario`).innerHTML
  idRol = rol
  document.querySelector('#botonEliminar').innerHTML = '';
  document.querySelector('#botonEliminar').innerHTML = `  
      <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
      <button type="button" class="btn btn-primary" onclick="eliminarUsuario(${idUsuario},${idRol})">Eliminar</button>
  `;
}

async function eliminarUsuario(id,rol){
  console.log("id usuario a eliminar ",id,"rol del usuario que se eliminara ",rol);

  await axios({
    method:'POST',
    url:'http://localhost:3001/api/admin_global_eliminar_usuario',
    data:{
      "idUsuario":id
    }
        }).then(res=>{
          console.log("Se elimino el usuario")
        }).catch(function(error){
            console.log(error);
        });  
  
  
  
   $('#ModalEliminar').modal('hide')
   //AQUI DEBE IR LA ALERTA DE SE EDITO CORRECTAMENTE EL USUARIO
   alert_default.fire({
     icon:'success',
     title:'Se elimino correctamente el usuario'
   });
   if(rol == 0){
    GestionUsuarioAdmin();
  }else if(rol == 1){
    GestionUsuarioPropietario();
  }else if(rol == 2){
    GestionUsuarioComun();
  }     
      
}






