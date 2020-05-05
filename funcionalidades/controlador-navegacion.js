document.addEventListener("DOMContentLoaded", () => {
  var pagina_actual = window.location.pathname
  var pagina_actual_split = pagina_actual.split('/')
  pagina_actual = pagina_actual_split[pagina_actual_split.length - 1]
  
  // 
  if (sessionStorage.getItem('token') == undefined || sessionStorage.getItem('userID') == undefined) {
    // si el usuario no está logueado
    
    if (pagina_actual == 'login.html' || pagina_actual == 'principal.html' || pagina_actual == 'recuperar.html' || pagina_actual === 'registro.html' || pagina_actual === 'index.html') {
    } else {
      // para las demas páginas que requieren que el usuario esté logueado   
      window.location.replace('login.html')
    }
  } else {
    // SI EL USUARIO YA ESTÁ LOGUEADO
    if (pagina_actual == 'login.html' || pagina_actual == 'recuperar.html' || pagina_actual == 'registro.html') {
      location.replace('principal.html')
      // el usuario ya está logueado
    } else if (pagina_actual == 'principal.html' || pagina_actual == 'index.html') {
      // no hace nada xD
      Verificar_storage_token()
      
    } else {
      // si ya está logueado
      // comprobar que el rol en el storage es el mismo que tiene el token
      if (pagina_actual == 'administracion-usuario.html') {
        if (sessionStorage.getItem('rol') != 0) {
          location.replace('index.html')
        }
      } else if (pagina_actual == 'administracion-negocio.html') {
        if (sessionStorage.getItem('rol') != 1) {
          location.replace('index.html')
        }
      } if (pagina_actual == 'registro-negocio.html') {
        if (sessionStorage.getItem('rol') == 0) {
          location.replace('index.html')
        }
      }
    }
    usuario_log()
    Verificar_storage_token()

  }
});


function Verificar_storage_token() {
  axios({
    method: 'POST',
    url: 'https://api-unahambre.herokuapp.com/api_control/g_verficar_datos_de_usuario_logueado',
    headers: {
      'access-token': sessionStorage.getItem('token')
    },
    data: {
      id: sessionStorage.getItem('userID'),
      rol: sessionStorage.getItem('rol')
    }

  }).then(res => {
    if (res.data.mensaje != null) {
      sessionStorage.removeItem('token')
      sessionStorage.removeItem('userID')
      sessionStorage.removeItem('rol')
      sessionStorage.removeItem('userName')
      location.replace('login.html')
    } else {
      // console.log('usuario verificado')
    }
  }).catch(function (error) {
    console.log(error);
  })
}

/** *********************PRELOADER ********************************/
window.addEventListener("load", () => {
  $('#cargado').hide();
  $('body').removeClass('hide_scroll')

})

/****************Se carga el dropdonw user************************* */
function usuario_log() {
  try {
    document.getElementById('ocultar_login').style.display = 'none'
    document.getElementById('ocultar_registro').style.display = 'none'   
  } catch (error) {

  }
  // Carga los datos si el usuario esta logueado
  var nombre
  var foto = "img/perfil.png"
  var mostrar = 'none'
  var mostrar_0 = 'none'
  var mostrar_1 = 'none'
  var mostrar_2 = 'none'

  if (sessionStorage.getItem('userName') != undefined) {
    // document.getElementById('nombreUsuario_log').innerHTML = sessionStorage.getItem('userName')
    nombre = sessionStorage.getItem('userName')
  }
  if (sessionStorage.getItem('userProfile') != 'null') {
    // document.getElementById('user_img').src = sessionStorage.getItem('userProfile')
    // document.getElementById('user_img2').src = sessionStorage.getItem('userProfile')
    foto = sessionStorage.getItem('userProfile')

  }

  if (sessionStorage.getItem('rol') == 2) {
    mostrar = 'block'
  } else if (sessionStorage.getItem('rol') == 1) {
    mostrar_1 = 'block'
    mostrar = 'block'
  } else if (sessionStorage.getItem('rol') == 0) {
    mostrar_0 = 'block'
  }


  var drop_user = `
                     <div class="dropdown" style="float:right; display: block; margin-top: 10px;" id="log_user">
        <button class="dropbtn">
            <img class="user_img" id="user_img" src="${foto}" alt="" width="50" height="50">
            ${nombre}
        </button>
        <div class="dropdown-content" style="text-decoration: block;">
            <div class="info_user" >
                <img class="user_img2" id="user_img2" src="${foto}" alt="" width="50" height="50">
                <p id="nombreUsuario_log">${nombre}</p>
                <p id="correo_log"></p>
                <hr>
            </div>
            <a class="ancla" href="index.html">Inicio</a>
            <a class="ancla" href="informacion-perfil.html">Perfil</a>            
            <a class="ancla" style="display: ${mostrar_1};" id="mi_local_op" href="administracion-negocio.html">Mi local</a>            
            <a class="ancla" style="display: ${mostrar_0};" id="administracion_op" href="administracion-usuario.html">Administración</a>
            <a class="ancla" href="principal.html">Menus</a>
            <a class="ancla" href="#">Mi historial</a>
            <a class="ancla" style="display: ${mostrar};"  id="registrar_negocio_op" href="registro-negocio.html">Registrar negocio</a>
            <a class="ancla" href="#" onclick="cerrar_sesion()">Cerrar Sesión</a>   
        </div>         
    </div>
                  `
  document.getElementById('mostrar_drop_user').innerHTML = drop_user

}

/*******************CERRAR SESION*************************/
function cerrar_sesion() {
  sessionStorage.removeItem('token')
  sessionStorage.removeItem('userID')
  sessionStorage.removeItem('rol')
  sessionStorage.removeItem('userName')
  sessionStorage.removeItem('userProfile')
  window.location.assign('login.html')
}