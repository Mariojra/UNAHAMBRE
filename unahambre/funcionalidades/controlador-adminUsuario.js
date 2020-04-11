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
//////////////////////////TODO LO DE USUARIOS/////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////



/////////////////////////MOSTRAR TODOS LOS USUARIOS SIN CRUD////////////////////////////////////
function ImprimirUsuarios(){
  axios({
    method:'GET',
    url:'https://api-unahambre.herokuapp.com/api_admin/admin_global_mostrar_usuarios',
    headers: {
          'access-token': sessionStorage.getItem('token')
        }
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
                            <div class="col-xl-12 navTabla">
                            <p class="h2 font-weight-bold text-success py-2">Usuarios</p>
                            <form class=" d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search">
                                <div class=" input-group ">
                                  <input type="text" id="formulario" onkeyup="filtrarUsuarios()" class="form-control bg-light border-0 small" placeholder="Buscar..." aria-label="Search" aria-describedby="basic-addon2"> 
                                </div>
                            </form>
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

//////////////////////////////////FILTRO DE USUARIOS////////////////////////////////////////////
function filtrarUsuarios(){
  axios({
    method:'GET',
    url:'https://api-unahambre.herokuapp.com/api_admin/admin_global_mostrar_usuarios',
    headers: {
          'access-token': sessionStorage.getItem('token')
        }
        }).then(res=>{
          cargarFiltroUsuario(res.data.items);
          
        }).catch(function(error){
            console.log(error);
        });      
}

const cargarFiltroUsuario = (data) =>{
  let formulario = document.querySelector('#formulario');
  let resultado = document.querySelector('#DatosUsuarios')
  let texto = formulario.value.toLowerCase();

  resultado.innerHTML = '';
  let cont = 0;
  for(let usuario of data){
  
    let nombres = usuario.Nombre.toLowerCase();
    let apellidos = usuario.Apellidos.toLowerCase();
    let celular = usuario.Celular.toLowerCase();
    let num_id = usuario.Numero_Identidad.toLowerCase();
    let correo = usuario.Correo.toLowerCase();
    let sexo = usuario.Sexo.toLowerCase();
    let nombre_usuario = usuario.Nombre_Usuario.toLowerCase();
    if((nombres.indexOf(texto) !==-1)||(apellidos.indexOf(texto) !==-1)||(celular.indexOf(texto) !==-1)||(num_id.indexOf(texto) !==-1)||(correo.indexOf(texto) !==-1)||(sexo.indexOf(texto) !==-1)||(nombre_usuario.indexOf(texto) !==-1)){
      resultado.innerHTML += `
      <tr>
        <th>${cont+1}</th>
        <td>${usuario.Nombre}</td>
        <td>${usuario.Apellidos}</td>
        <td>${usuario.Celular}</td>
        <td>${usuario.Numero_Identidad}</td>
        <td>${usuario.Correo}</td>
        <td>${usuario.Sexo}</td>
        <td>${usuario.Nombre_Usuario}</td>
        <td>${usuario.Fecha_Ingreso}</td>
        <td><img src="${usuario.Foto_Perfil}" class="img_menu" alt="imagen perfil"></td>
      </tr>
      `;
    }
    cont++;
  }
}

const cargarFiltroGestionUsuario = (data) =>{
  let formulario = document.querySelector('#formularioGestionUsuario');
  let resultado = document.querySelector('#DatosUsuariosAdmin')
  let texto = formulario.value.toLowerCase();
  let infoUsuarios = data;
  resultado.innerHTML = '';
  
  for(let i = 0; i < infoUsuarios.length; i++){
  
    let nombres = infoUsuarios[i].Nombre.toLowerCase();
    let apellidos = infoUsuarios[i].Apellidos.toLowerCase();
    let nombre_usuario = infoUsuarios[i].Nombre_Usuario.toLowerCase();
    if((nombres.indexOf(texto) !==-1)||(apellidos.indexOf(texto) !==-1)||(nombre_usuario.indexOf(texto) !==-1)){
      resultado.innerHTML += `
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
}
///////////////////////////////////CRUD DE USUARIOS EDITAR ELIMINAR Y BUSCAR /////////////////////////////////////////////////////////////

function GestionUsuarioAdmin(){
  
  axios({
    method:'POST',
    url:'https://api-unahambre.herokuapp.com/api_admin/admin_global_usuario_filtro_rol',
    data:{
      "idRol":0
        },
        headers: {
              'access-token': sessionStorage.getItem('token')
            }
    }).then(res=>{
      
      cargarCabeceraGestionUsuariosAdmin();
      cargarFilasGestionUsuario(res.data.items[0]);
      
        }).catch(function(error){
            console.log(error);
        });      
}
function GestionUsuarioPropietario(){
  
  axios({
    method:'POST',
    url:'https://api-unahambre.herokuapp.com/api_admin/admin_global_usuario_filtro_rol',
    data:{
      "idRol":1
        },
        headers: {
              'access-token': sessionStorage.getItem('token')
            }
    }).then(res=>{
    
      cargarCabeceraGestionUsuariosPropietario();
      cargarFilasGestionUsuario(res.data.items[0]);
        
        }).catch(function(error){
            console.log(error);
        });      
}
function GestionUsuarioComun(){
  
  axios({
    method:'POST',
    url:'https://api-unahambre.herokuapp.com/api_admin/admin_global_usuario_filtro_rol',
    data:{
      "idRol":2
        },
        headers: {
              'access-token': sessionStorage.getItem('token')
            }
    }).then(res=>{
      
      cargarCabeceraGestionUsuariosComun()
      cargarFilasGestionUsuario(res.data.items[0]);
       
        }).catch(function(error){
            console.log(error);
        });      
}

//////////////////////////////////////////METODO BUSCAR POR CADA UNO DE LOS TIPOS DE USUARIOS//////////////////////////////////////////////
function filtrarUsuariosAdmin(){
  axios({
    method:'POST',
    url:'https://api-unahambre.herokuapp.com/api_admin/admin_global_usuario_filtro_rol',
    data:{
      "idRol":0
        },
        headers: {
              'access-token': sessionStorage.getItem('token')
            }
    }).then(res=>{
      cargarFiltroGestionUsuario(res.data.items[0]);
    }).catch(function(error){
      console.log(error);
    });
}

function filtrarUsuariosComun(){
  axios({
    method:'POST',
    url:'https://api-unahambre.herokuapp.com/api_admin/admin_global_usuario_filtro_rol',
    data:{
      "idRol":2
        },
        headers: {
              'access-token': sessionStorage.getItem('token')
            }
    }).then(res=>{
      cargarFiltroGestionUsuario(res.data.items[0]);
    }).catch(function(error){
      console.log(error);
    });
}

function filtrarUsuariosPropietarios(){
  axios({
    method:'POST',
    url:'https://api-unahambre.herokuapp.com/api_admin/admin_global_usuario_filtro_rol',
    data:{
      "idRol":1
        },
        headers: {
              'access-token': sessionStorage.getItem('token')
            }
    }).then(res=>{
      cargarFiltroGestionUsuario(res.data.items[0]);
    }).catch(function(error){
      console.log(error);
    });
}

/////////////////////////////////////////////////////TABLAS POR USUARIO EN EL CRUD/////////////////////////////////////////////////////////

////////////CABECERA DE CADA TABLA POR USUARIO////////////////////////////////////
const cargarCabeceraGestionUsuariosAdmin = () =>{
  document.querySelector('#Tablas').innerHTML = '';
  document.querySelector('#Tablas').innerHTML  += `
                            <div class="col-xl-12 navTabla">
                            <p class="h2 font-weight-bold text-success py-2">Usuarios Administradores</p>
                            <form class=" d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search">
                                <div class=" input-group ">
                                  <input type="text" id="formularioGestionUsuario" onkeyup="filtrarUsuariosAdmin()" class="form-control bg-light border-0 small" placeholder="Buscar..." aria-label="Search" aria-describedby="basic-addon2"> 
                                </div>
                            </form>
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

const cargarCabeceraGestionUsuariosPropietario = () =>{
  document.querySelector('#Tablas').innerHTML = '';
  document.querySelector('#Tablas').innerHTML  += `
                            <div class="col-xl-12 navTabla">
                            <p class="h2 font-weight-bold text-success py-2">Usuarios Propietarios</p>
                            <form class=" d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search">
                                <div class=" input-group ">
                                  <input type="text" id="formularioGestionUsuario" onkeyup="filtrarUsuariosPropietarios()" class="form-control bg-light border-0 small" placeholder="Buscar..." aria-label="Search" aria-describedby="basic-addon2"> 
                                </div>
                            </form>
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

const cargarCabeceraGestionUsuariosComun = () =>{
  document.querySelector('#Tablas').innerHTML = '';
  document.querySelector('#Tablas').innerHTML  += `
                            <div class="col-xl-12 navTabla">
                            <p class="h2 font-weight-bold text-success py-2">Usuarios Comunes</p>
                            <form class=" d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search">
                                <div class=" input-group ">
                                  <input type="text" id="formularioGestionUsuario" onkeyup="filtrarUsuariosComun()" class="form-control bg-light border-0 small" placeholder="Buscar..." aria-label="Search" aria-describedby="basic-addon2"> 
                                </div>
                            </form>
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

//////////////////FILA CARGADAS POR TIPO DE USUARIO///////////////////////////////


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
                  <td><button class="btn btn-primary" type="button" onclick="infoModalEditarUsuario(${i},${infoUsuarios[i].Rol_idRol},${infoUsuarios[i].idUsuario})" data-toggle="modal" data-target="#ModalEditarUsuario">Editar</button></td>
                  <td id="row${i}BotonEliminar"></td>
                </tr>
                `;  
                if(infoUsuarios[i].Rol_idRol==0){
                  document.querySelector(`#row${i}Rol`).innerHTML = "Usuario Administrador";
                }else if(infoUsuarios[i].Rol_idRol == 1){
                  document.querySelector(`#row${i}Rol`).innerHTML = "Usuario Propietario";
                  document.querySelector(`#row${i}BotonEliminar`).innerHTML = `<button class="btn btn-primary" type="button" onclick="infoModalEliminarUsuario(${i},${infoUsuarios[i].Rol_idRol},${infoUsuarios[i].idUsuario})" data-toggle="modal" data-target="#ModalEliminarUsuario">Eliminar</button>`;
                }else if(infoUsuarios[i].Rol_idRol == 2){
                  document.querySelector(`#row${i}Rol`).innerHTML = "Usuario Comun";
                  document.querySelector(`#row${i}BotonEliminar`).innerHTML = `<button class="btn btn-primary" type="button" onclick="infoModalEliminarUsuario(${i},${infoUsuarios[i].Rol_idRol},${infoUsuarios[i].idUsuario})" data-toggle="modal" data-target="#ModalEliminarUsuario">Eliminar</button>`;
                }                       
  }
}

/////////////////MODALES PARA EDITAR Y ELIMINAR USUARIOS//////////////////////////
function infoModalEditarUsuario(fila,rol,id){
  cadenaFila =`#row${fila}`
  idUsuario = id
  Nombre = document.querySelector(`${cadenaFila}Nombre`).innerHTML
  Apellidos = document.querySelector(`${cadenaFila}Apellidos`).innerHTML
  Nombre_Usuario = document.querySelector(`${cadenaFila}Nombre_Usuario`).innerHTML
  Administrador = document.querySelector(`${cadenaFila}Rol`).innerHTML
  Foto_Perfil = document.querySelector(`${cadenaFila}Foto_Perfil`).innerHTML
  idRol = rol;
  
  document.querySelector('#contenido_modal_editar_usuario').innerHTML = '';

  document.querySelector('#contenido_modal_editar_usuario').innerHTML = `
                        <div class="modal-header">
                          <h5 class="modal-title" id="exampleModalLabel">Editar Usuario</h5>
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

function infoModalEliminarUsuario(fila,rol,id){
  cadenaFila =`#row${fila}`
  idUsuario = id
  idRol = rol
  document.querySelector('#botonEliminarUsuario').innerHTML = '';
  document.querySelector('#botonEliminarUsuario').innerHTML = `  
      <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
      <button type="button" class="btn btn-primary" onclick="eliminarUsuario(${idUsuario},${idRol})">Eliminar</button>
  `;
}

//////////////////////METODOS PARA ELIMINAR USUARIO Y EDITAR USUARIO/////////////

async function eliminarUsuario(id,rol){
  
  await axios({
    method:'POST',
    url:'https://api-unahambre.herokuapp.com/api_admin/admin_global_eliminar_usuario',
    data:{
      "idUsuario":id
    },
    headers: {
          'access-token': sessionStorage.getItem('token')
        }
        }).then(res=>{
          console.log("Se elimino el usuario")
        }).catch(function(error){
            console.log(error);
        });  
  
  
  
   $('#ModalEliminarUsuario').modal('hide')
   //AQUI DEBE IR LA ALERTA DE SE EDITO CORRECTAMENTE EL USUARIO
   alert_default.fire({
     icon:'success',
     title:'Se elimino correctamente el usuario'
   });
   if(rol == 0){
    GestionUsuarioAdmin();
  }else if(rol == 1){
    GestionUsuarioPropietario();
    CantidadUsuarios();
  }else if(rol == 2){
    GestionUsuarioComun();
    CantidadUsuarios();
  }     
      
}

async function editarUsuario(id,rol){
  let nombres =document.querySelector('#NombreModal').value 
  let apellidos =document.querySelector('#ApellidosModal').value 
  let usuario =document.querySelector('#UsuarioModal').value
  await axios({
    method:'POST',
    url:'https://api-unahambre.herokuapp.com/api_admin/admin_global_editar_usuario',
    data:{
      "idUsuario":id,
      "usuario":usuario,
      "nombre":nombres,
      "apellido":apellidos
    },
    headers: {
          'access-token': sessionStorage.getItem('token')
        }
        }).then(res=>{
          console.log(res)
        }).catch(function(error){
            console.log(error);
        });  
  
  
  $('#ModalEditarUsuario').modal('hide')
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



/////////////////////////////////////////////FIN DE TODO LO INVOLUCRADO CON USUARIOS/////////////////////////////////////////////////////

////////////////////////////////////////******************************************************//////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////TODO LO QUE INVOLUCRE LOCALES//////////////////////////////////////////////////

function ImprimirLocales(){
    axios({
      method:'GET',
      url:'https://api-unahambre.herokuapp.com/api_admin/g_mostrar_restaurantes',
      headers: {
            'access-token': sessionStorage.getItem('token')
          }
      
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
                              <div class="col-xl-12 navTabla">
                              <p class="h2 font-weight-bold text-primary py-2">Locales</p>
                              <form class=" d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search">
                                <div class=" input-group ">
                                  <input type="text" id="formularioLocales" onkeyup="filtrarLocales()" class="form-control bg-light border-0 small" placeholder="Buscar..." aria-label="Search" aria-describedby="basic-addon2"> 
                                </div>
                              </form>
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

/////////////////////////////////////////FILTROS DE LOCALES///////////////////////////////////////////////
function filtrarLocales(){
  axios({
    method:'GET',
    url:'https://api-unahambre.herokuapp.com/api_admin/g_mostrar_restaurantes',
    headers: {
          'access-token': sessionStorage.getItem('token')
        }
        }).then(res=>{
          cargarFiltroLocal(res.data.items);
        }).catch(function(error){
            console.log(error);
        });      
}

const cargarFiltroLocal= (data) =>{
  let formulario = document.querySelector('#formularioLocales');
  let resultado = document.querySelector('#DatosLocales')
  let texto = formulario.value.toLowerCase();

  resultado.innerHTML = '';
  let cont = 0;
  for(let local of data){
    let nombre_local = local.Nombre_Local.toLowerCase();
    let nombre_usuario = local.Nombre_Usuario.toLowerCase();
    let ubicacion = local.Ubicacion.toLowerCase();
    let telefono = local.Telefono.toLowerCase();
    if((nombre_local.indexOf(texto) !==-1)||(nombre_usuario.indexOf(texto) !==-1)||(ubicacion.indexOf(texto) !==-1)||(telefono.indexOf(texto) !==-1)){
      resultado.innerHTML += `
      <tr>
       <th>${cont+1}</th>
       <td>${local.Nombre_Local}</td>
       <td>${local.Nombre_Usuario}</td>
       <td>${local.Ubicacion}</td>
       <td>${local.Telefono}</td>
       <td>${local.Correo}</td>
     </tr>
     `;
    }
    cont++;
  }
  
}

function filtrarGestionLocales(){
  axios({
    method:'GET',
    url:'https://api-unahambre.herokuapp.com/api_admin/g_mostrar_restaurantes',
    headers: {
          'access-token': sessionStorage.getItem('token')
        }
        }).then(res=>{
          cargarFiltroGestionLocales(res.data.items);
        }).catch(function(error){
            console.log(error);
        }); 
}

const cargarFiltroGestionLocales =(data)=>{
  let formulario = document.querySelector('#formularioGestionLocales');
  let resultado = document.querySelector('#DatosGestionLocales')
  let texto = formulario.value.toLowerCase();
  let infoLocales = data;
  resultado.innerHTML = '';
  let cont = 0;
  for(let i=0;i<infoLocales.length;i++){
    let nombre_local = infoLocales[i].Nombre_Local.toLowerCase();
    let nombre_usuario = infoLocales[i].Nombre_Usuario.toLowerCase();
    let ubicacion = infoLocales[i].Ubicacion.toLowerCase();
    let telefono = infoLocales[i].Telefono.toLowerCase();
    if((nombre_local.indexOf(texto) !==-1)||(nombre_usuario.indexOf(texto) !==-1)||(ubicacion.indexOf(texto) !==-1)||(telefono.indexOf(texto) !==-1)){
      resultado.innerHTML += `
      <tr>
       <td id="row${i}idLocal">${i+1}</th>
       <td id="row${i}NombreLocal">${infoLocales[i].Nombre_Local}</td>
       <td id="row${i}NombreUsuario">${infoLocales[i].Nombre_Usuario}</td>
       <td id="row${i}Ubicacion">${infoLocales[i].Ubicacion}</td>
       <td id="row${i}Telefono">${infoLocales[i].Telefono}</td>
       <td id="row${i}Correo">${infoLocales[i].Correo}</td>
       <td><button class="btn btn-primary" type="button" data-toggle="modal" data-target="#edi">Editar</button></td>
       <td><button class="btn btn-primary" type="button" data-toggle="modal" data-target="#eli">Eliminar</button></td>
       <td><button class="btn btn-primary" type="button" data-toggle="modal" data-target="#agre">Agregar Menu</button></td>
     </tr>
     `;
    }
    cont++;
  }
}
///////////////////////////////////////////GESTION LOCALES CRUD////////////////////////////////////////////////
function GestionLocales(){
  axios({
    method:'GET',
    url:'https://api-unahambre.herokuapp.com/api_admin/g_mostrar_restaurantes',
    headers: {
          'access-token': sessionStorage.getItem('token')
        }
        }).then(res=>{
          cargarCabeceraGestionLocales();
          cargarFilasGestionLocales(res.data.items);
        }).catch(function(error){
            console.log(error);
        });  
}

const cargarCabeceraGestionLocales = () =>{
  document.querySelector('#Tablas').innerHTML = '';
  document.querySelector('#Tablas').innerHTML  += `
                              <div class="col-xl-12 navTabla">
                              <p class="h2 font-weight-bold text-primary py-2">Locales</p>
                              <form class=" d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search">
                                <div class=" input-group ">
                                  <input type="text" id="formularioGestionLocales" onkeyup="filtrarGestionLocales()" class="form-control bg-light border-0 small" placeholder="Buscar..." aria-label="Search" aria-describedby="basic-addon2"> 
                                </div>
                              </form>
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
                                    <th></th>
                                    <th></th>
                                    <th></th>
                                  </tr>
                                </thead>
                                <tbody id='DatosGestionLocales'>
                                 
                                </tbody>
                              </table>
                            </div>
                  `;
}

const cargarFilasGestionLocales = (datos) =>{
  let infoLocales = datos
  document.querySelector('#DatosGestionLocales').innerHTML = '';

  for (let i = 0; i < infoLocales.length; i++) {
   document.querySelector('#DatosGestionLocales').innerHTML += `
     <tr>
       <td id="row${i}idLocal">${i+1}</th>
       <td id="row${i}NombreLocal">${infoLocales[i].Nombre_Local}</td>
       <td id="row${i}NombreUsuario">${infoLocales[i].Nombre_Usuario}</td>
       <td id="row${i}Ubicacion">${infoLocales[i].Ubicacion}</td>
       <td id="row${i}Telefono">${infoLocales[i].Telefono}</td>
       <td id="row${i}Correo">${infoLocales[i].Correo}</td>
       <td><button class="btn btn-primary" type="button" data-toggle="modal"onclick="infoModalEditarLocal(${i},${infoLocales[i].idRestaurante})" data-target="#ModalEditarLocal">Editar</button></td>
       <td><button class="btn btn-primary" type="button" data-toggle="modal" data-target="#modalAgregarMenu"onclick="infoModalAgregarMenu(${infoLocales[i].idRestaurante})">Menu</button></td>      
       <td><button class="btn btn-primary" type="button" data-toggle="modal" data-target="#ModalEliminarLocal" onclick="infoModalEliminarLocal(${infoLocales[i].idRestaurante})">Eliminar</button></td>
     </tr>
     `;
  }
  console.log("Datos de Locales cargados: ",infoLocales)
}
/////////////////MODALES PARA EDITAR Y ELIMINAR USUARIOS//////////////////////////
function infoModalEditarLocal(fila,id){
  cadenaFila =`#row${fila}`
  idRestaurante = id
  let restaurante = document.querySelector(`${cadenaFila}NombreLocal`).innerHTML;
  let ubicacion = document.querySelector(`${cadenaFila}Ubicacion`).innerHTML;
  let telefono = document.querySelector(`${cadenaFila}Telefono`).innerHTML;
  let correo = document.querySelector(`${cadenaFila}Correo`).innerHTML;

  document.querySelector('#contenido_modal_editar_local').innerHTML = '';

  document.querySelector('#contenido_modal_editar_local').innerHTML = `
                        <div class="modal-header">
                          <h5 class="modal-title" id="exampleModalLabel">Editar Local</h5>
                          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                          </button>
                        </div>
                      <div class="modal-body" >
                        <!--FORMULARIO DE EDITAR LOCAL-->
                          <form>
                          <div class="row">
                            <div class="col">
                              <label for="Restaurante">Restaurante:</label>
                              <input type="text" id="NombreRestaurante" class="form-control" name="Restaurante">
                            </div>
                            <div class="col">
                              <label for="TelefonoRestaurante">Telefono:</label>
                              <input type="text" id="TelefonoRestaurante" class="form-control" name="TelefonoRestaurante" onkeyup="validarTelefono(this)">
                            </div>
                            <div class="col-12">
                              <label for="UbicacionRestaurante">Ubicacion:</label>
                              <input type="text" id="UbicacionRestaurante" class="form-control" name="UbicacionRestaurante">
                            </div>
                            <div class="col-12">
                              <label for="CorreoRestaurante">Correo:</label>
                              <input type="text" id="CorreoRestaurante" class="form-control" name="CorreoRestaurante" onkeyup="validarCorreo(this)">
                            </div>
                          </div>
                        </form>

                      </div>
                      <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
                        <button type="button" id="boton"  class="btn btn-primary" onclick="editarLocal(${idRestaurante})">Guardar Cambios</button>
                      </div>            
  `;
  document.querySelector('#NombreRestaurante').value = restaurante;
  document.querySelector('#UbicacionRestaurante').value = ubicacion;
  document.querySelector('#CorreoRestaurante').value = correo;
  document.querySelector('#TelefonoRestaurante').value = telefono;
  
  console.log(fila,id)
}

function infoModalEliminarLocal(id){
  let idLocal = id
  document.querySelector('#botonEliminarLocal').innerHTML = '';
  document.querySelector('#botonEliminarLocal').innerHTML = `  
      <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
      <button type="button" class="btn btn-primary" onclick="eliminarLocal(${idLocal})">Eliminar</button>
  `;
}

function infoModalAgregarMenu(idRestaurante){
  document.querySelector('#contenido_modal_agregar_menu').innerHTML='';
  document.querySelector('#contenido_modal_agregar_menu').innerHTML=`
  <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Agregar Menu al Restaurante</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <form>
            <div class="row">
              <div class="col">
                <label for="NombreMenu">Nombre Menu:</label>
                <input type="text" id="NombreMenu" class="form-control" name="NombreMenu" onkeyup="validarCampoVacio(this)">
              </div>
              <div class="col">
                <label for="Foto">Foto:</label>
                <input type="text" id="FotoMenu" class="form-control" name="Foto">
              </div>
              <div class="col-12"><br>
                <label for="UbicacionRestaurante">Categoria:</label>
                <select class="form-control" name="" id="categoriaMenu" onMouseMove="validarSelect(this)" required>
                  <option value="0">Seleccione una categoria</option>
                  <option value="1">Desayuno</option>
                  <option value="2">Almuerzo</option>
                  <option value="3">Cena</option>
                  <option value="4">Antojos</option>
                  <option value="5">Bebidas</option>
                  <option value="6">Grupal</option>
                </select>
              </div>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
          <button type="button" id="boton" class="btn btn-primary" onclick="agregarMenu(${idRestaurante})">Agregar Menu</button>
        </div>
  `;
}
async function agregarMenu(id){
  let nombreRestaurante = document.querySelector('#NombreMenu').value;
  let foto = document.querySelector('#FotoMenu').value;
  let idcategoria = document.querySelector('#categoriaMenu').value;
  console.log(id,nombreRestaurante,foto,idcategoria);
  await axios({
    method:'POST',
    url:'https://api-unahambre.herokuapp.com/api_admin/admin_global_agregar_menu',
    data:{
      "nombreMenu":  nombreRestaurante,
      "idRestaurante":id,
      "foto":  foto,
      "idCategoria":idcategoria 
      },
    headers: {
          'access-token': sessionStorage.getItem('token')
        }
        }).then(res=>{
          console.log(res)
        }).catch(function(error){
            console.log(error);
        });  
  
  $('#modalAgregarMenu').modal('hide')
  //AQUI DEBE IR LA ALERTA DE SE EDITO CORRECTAMENTE EL USUARIO
  alert_default.fire({
    icon:'success',
    title:'Se agrego correctamente el menu'
  }) 
  GestionLocales();
  CantidadMenus();
}

async function editarLocal(id){
  
  let restaurante =document.querySelector('#NombreRestaurante').value;
  let telefono = document.querySelector('#TelefonoRestaurante').value;
  let ubicacion = document.querySelector('#UbicacionRestaurante').value;
  let correo = document.querySelector('#CorreoRestaurante').value;
  console.log(restaurante,id)
  await axios({
    method:'POST',
    url:'https://api-unahambre.herokuapp.com/api_admin/modificar-local',
    data:{  
    "idRestaurante": id, 
    "nombreRestaurante": restaurante, 
    "telefono": telefono, 
    "ubicacion": ubicacion, 
     "correo": correo 
    },
    headers: {
          'access-token': sessionStorage.getItem('token')
        }
        }).then(res=>{
          console.log(res)
        }).catch(function(error){
            console.log(error);
        });  
  
  
  $('#ModalEditarLocal').modal('hide')
  //AQUI DEBE IR LA ALERTA DE SE EDITO CORRECTAMENTE EL USUARIO
  alert_default.fire({
    icon:'success',
    title:'Se edito correctamente el local'
  }) 
  GestionLocales();
}

async function eliminarLocal(id){
  
  await axios({
    method:'POST',
    url:'https://api-unahambre.herokuapp.com/api_admin/admin_global_eliminar_restaurante',
    data:{
      "idRestaurante":id
    },
    headers: {
          'access-token': sessionStorage.getItem('token')
        }
        }).then(res=>{
          console.log("Se elimino el usuario")
        }).catch(function(error){
            console.log(error);
        });  
  
  
  
   $('#ModalEliminarLocal').modal('hide')
   //AQUI DEBE IR LA ALERTA DE SE EDITO CORRECTAMENTE EL USUARIO
   alert_default.fire({
     icon:'success',
     title:'Se elimino correctamente el local'
   });
   GestionLocales();
   CantidadLocales();
}

function validarSelect(etiqueta){
  console.log(etiqueta.value);
  if(etiqueta.value == 0){
    document.getElementById('boton').disabled=true;
  }else{
    document.getElementById('boton').disabled=false;
  }
}

function validarCampoVacio(etiqueta){
  if(etiqueta.value ==''){
    document.getElementById('boton').disabled = true;
  }else{
    document.getElementById('boton').disabled = false;
  }
}

function validarCorreo(etiqueta){
  console.log(etiqueta.value);
  let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if(re.test(etiqueta.value) || (etiqueta.value.trim()  == "")){
    document.getElementById('boton').disabled=false;
  }else{
    document.getElementById('boton').disabled=true;
  }
}

function validarTelefono(etiqueta){
  let telefono = etiqueta.value;
  let digito = parseInt(telefono);
  let re = /^([0-9])*$/
  console.log(Number.isInteger(digito),digito);
  if((telefono.length>=8 && !isNaN(digito) && Number.isInteger(digito) && re.test(telefono)) || (telefono.trim() =="")){
    document.getElementById('boton').disabled=false;
  }else{
    document.getElementById('boton').disabled=true;
  }
}

















///////////////////////////////////////////////FIN DE TODO LO INVOLUCRADO CON LOCALES//////////////////////////////////////////////////////////
////////////////////////////////////////////////***********************************************////////////////////////////////////////////////



/////////////////////////////////////////////////////////TODO LO QUE INVOLUCRE MENUS//////////////////////////////////////////////////
/////////////////////////////////////MOSTRAR TODOS LOS LOCALES////////////////////////////////////////
function ImprimirMenus(){
  axios({
    method:'GET',
    url:'https://api-unahambre.herokuapp.com/api_admin/admin_global_menus_restaurante',
    headers: {
          'access-token': sessionStorage.getItem('token')
        }
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
                            <div class="col-xl-12 navTabla">
                            <p class="h2 font-weight-bold text-info py-2">Menus</p>
                            <form class=" d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search">
                                <div class=" input-group ">
                                  <input type="text" id="formulario" onkeyup="filtrarMenus()" class="form-control bg-light border-0 small" placeholder="Buscar..." aria-label="Search" aria-describedby="basic-addon2"> 
                                </div>
                            </form>
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
////////////////////////////////FILTRO MENUS///////////////////////////////////
function filtrarMenus(){
  axios({
    method:'GET',
    url:'https://api-unahambre.herokuapp.com/api_admin/admin_global_menus_restaurante',
    headers: {
          'access-token': sessionStorage.getItem('token')
        }
        }).then(res=>{
          cargarFiltroMenu(res.data.items);
        }).catch(function(error){
            console.log(error);
        });      

}

const cargarFiltroMenu = (data) =>{
  let formulario = document.querySelector('#formulario');
  let resultado = document.querySelector('#DatosMenu')
  let texto = formulario.value.toLowerCase();

  resultado.innerHTML = '';
  let cont = 0;
  for(let menu of data){
  
    let nombre_menu = menu.Nombre_Menu.toLowerCase();
    let nombre_local = menu.Nombre_Local.toLowerCase();
    let nombre_propietario = menu.Dueño_Local.toLowerCase();
    if((nombre_menu.indexOf(texto) !==-1)||(nombre_local.indexOf(texto) !==-1)||(nombre_propietario.indexOf(texto) !==-1)){
      resultado.innerHTML += `
      <tr>
        <th>${cont+1}</th>
        <td>${menu.Nombre_Menu}</td>
        <td>${menu.Nombre_Local}</td>
        <td>${menu.Dueño_Local}</td>
        <td>${menu.Fecha_Registro}</td>
        <td><img src="${menu.Foto_Menu}" class="img_menu" alt="imagen perfil"></td>
      </tr>
      `;
    }
    cont++;
  }
}

//////////////////////////////////////////*********************************************************////////////////////////////////////
/////////////////////////////////////////////////////////TODO LO QUE INVOLUCRE PLATILLOS//////////////////////////////////////////////////
/////////////////////////////////////MOSTRAR TODOS LOS LOCALES////////////////////////////////////////
function ImprimirPlatillos(){
  axios({
    method:'GET',
    url:'https://api-unahambre.herokuapp.com/api_admin/admin_global_platillos_menu',
    headers: {
          'access-token': sessionStorage.getItem('token')
        }
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
                             <div class="col-xl-12 navTabla">
                             <p class="h2 font-weight-bold text-warning py-2">Platillos</p>
                             <form class=" d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search">
                                <div class=" input-group ">
                                  <input type="text" id="formulario" onkeyup="filtrarPlatillos()" class="form-control bg-light border-0 small" placeholder="Buscar..." aria-label="Search" aria-describedby="basic-addon2"> 
                                </div>
                            </form>
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

////////////////////////////////FILTRO PLATILLOS///////////////////////////////////

function filtrarPlatillos(){
  axios({
    method:'GET',
    url:'https://api-unahambre.herokuapp.com/api_admin/admin_global_platillos_menu',
    headers: {
          'access-token': sessionStorage.getItem('token')
        }
        }).then(res=>{
          cargarFiltroPlatillo(res.data.items);
        }).catch(function(error){
            console.log(error);
        });      
}

const cargarFiltroPlatillo = (data) =>{
  let formulario = document.querySelector('#formulario');
  let resultado = document.querySelector('#DatosPlatillo')
  let texto = formulario.value.toLowerCase();

  resultado.innerHTML = '';
  let cont = 0;
  for(let platillo of data){
  
    let nombre_platillo = platillo.Nombre.toLowerCase();
    let descripcion = platillo.Descripcion.toLowerCase();
    let precio = platillo.Precio
    let nombre_local = platillo.Nombre_Local.toLowerCase();
    if((nombre_platillo.indexOf(texto) !==-1)||(descripcion.indexOf(texto) !==-1)||(precio == texto)||(nombre_local.indexOf(texto) !==-1)){
      resultado.innerHTML += `
      <tr>
        <th>${cont+1}</th>
        <td>${platillo.Nombre}</td>
        <td>${platillo.Descripcion}</td>
        <td>${platillo.Precio}</td>
        <td>${platillo.Fecha_Registro}</td>
        <td><img src="${platillo.Foto_Menu}" class="img_menu" alt="imagen perfil"></td>
        <td>${platillo.Nombre_Local}</td>
      </tr>
      `;
    }
    cont++;
  }
}
/////////////////////////////////////////////////////////TODO LO QUE INVOLUCRE SOLICITUDES//////////////////////////////////////////////////
/////////////////////////////////////MOSTRAR TODAS LAS SOLICITUDES////////////////////////////////////////
function ImprimirSolicitudes(){
  axios({
    method:'GET',
    url:'https://api-unahambre.herokuapp.com/api_admin/admin_global_mostrar_solicitudes',
    headers: {
          'access-token': sessionStorage.getItem('token')
        }
        }).then(res=>{
          cargarCabeceraTablaSolicitudes();
          cargarFilasSolicitudes(res.data.items);
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
                                <input type="text" id="formulario" onkeyup="filtrarSolicitudes()" class="form-control bg-light border-0 small" placeholder="Buscar..." aria-label="Search" aria-describedby="basic-addon2"> 
                              </div>
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
////////////////////////////////FILTRO SOLICITUDES///////////////////////////////////
function filtrarSolicitudes(){
  axios({
    method:'GET',
    url:'https://api-unahambre.herokuapp.com/api_admin/admin_global_mostrar_solicitudes',
    headers: {
          'access-token': sessionStorage.getItem('token')
        }
        }).then(res=>{
          cargarFiltroSolicitudes(res.data.items);
        }).catch(function(error){
            console.log(error);
        });      
}

const cargarFiltroSolicitudes = (data) =>{
  let formulario = document.querySelector('#formulario');
  let resultado = document.querySelector('#DatosSolicitud')
  let texto = formulario.value.toLowerCase();

  resultado.innerHTML = '';
  let cont = 0;
  for(let soli of data){
  
    let nombre_dueno = soli.Nombre_Usuario.toLowerCase();
    let telefono = soli.Telefono.toLowerCase();
    let ubicacion = soli.Ubicacion.toLowerCase();
    if((nombre_dueno.indexOf(texto) !==-1) || (telefono.indexOf(texto) !==-1)||(ubicacion.indexOf(texto)!==-1)){
      resultado.innerHTML += `
      <tr>
        <th>${cont+1}</th>
        <td>${soli.EstadoSolicitud}</td>
        <td>${soli.Nombre_Local}</td>
        <td>${soli.Nombre_Usuario}</td>
        <td>${soli.Telefono}</td>
        <td>${soli.Ubicacion}</td>
        <td>${soli.FechaSolicitud}</td>
      </tr>
      `;
    }
    cont++;
  }
}

//////////////////////////////////////////********************************************************/////////////////////////////////////////



///////////// CANTIDAD DE LOS LOCALES,USUARIOS,MENUS,PLATILLOS,SOLICITUDES/////////////
function CantidadLocales(){
  axios({
    method:'GET',
    url:'https://api-unahambre.herokuapp.com/api_admin/g_mostrar_restaurantes',
    headers: {
          'access-token': sessionStorage.getItem('token')
        }
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
    url:'https://api-unahambre.herokuapp.com/api_admin/admin_global_mostrar_usuarios',
    headers: {
          'access-token': sessionStorage.getItem('token')
        }
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
    url:'https://api-unahambre.herokuapp.com/api_admin/admin_global_menus_restaurante',
    headers: {
          'access-token': sessionStorage.getItem('token')
        }
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
    url:'https://api-unahambre.herokuapp.com/api_admin/admin_global_platillos_menu',
    headers: {
          'access-token': sessionStorage.getItem('token')
        }
        }).then(res=>{
          
          let infoPlatillo = res.data.items;
          
          document.querySelector('#platillo').innerHTML = `${infoPlatillo.length}  Platillos`;
        }).catch(function(error){
            console.log(error);
        });   
}

CantidadPlatillos();



function CantidadSolicitudes(){
  axios({
    method:'GET',
    url:'https://api-unahambre.herokuapp.com/api_admin/admin_global_mostrar_solicitudes',
    headers: {
          'access-token': sessionStorage.getItem('token')
        }
        }).then(res=>{
          
          let infoSolicitudes = res.data.items;
          document.querySelector('#solicitudes').innerHTML = `${infoSolicitudes.length}  Solicitudes`;
        }).catch(function(error){
            console.log(error);
        });   
}

CantidadSolicitudes();
//////////////////////////////////////////////////////////////////////////////////////////////







////////////////////////////////////////////////////////////////////////////////////////





