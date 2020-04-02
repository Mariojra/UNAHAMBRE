document.addEventListener("DOMContentLoaded", () => {
  if (sessionStorage.getItem('token') == undefined || sessionStorage.getItem('userID') == undefined) {
    // si el usuario no está logueado
    if (window.location.pathname == '/unahambre/login.html' || window.location.pathname == '/unahambre/principal.html' || window.location.pathname == '/unahambre/registro.html' || window.location.pathname == '/unahambre/index.html') {
    } else {
      // para las demas páginas que requieren que el usuario esté logueado   
        window.location.replace('login.html')      
    }
  } else {
    // SI EL USUARIO YA ESTÁ LOGUEADO 
    if (window.location.pathname == '/unahambre/login.html' || window.location.pathname == '/unahambre/recuperar.html' || window.location.pathname == '/unahambre/registro.html') {
      location.replace('principal.html')
      // el usuario ya está logueado
    } else if (window.location.pathname == '/unahambre/principal.html' || window.location.pathname == '/unahambre/index.html') {
      // no hace nada xD
      Verificar_storage_token()
    } else {
      // si ya está logueado
      // comprobar que el rol en el storage es el mismo que tiene el token
      if (window.location.pathname == '/unahambre/administracion-usuario.html') {
        if (sessionStorage.getItem('rol') != 0) {
          location.replace('index.html')
        }
      } else if (window.location.pathname == '/unahambre/administracion-negocio.html' || window.location.pathname == '/unahambre/registro-negocio.html') {
        if (sessionStorage.getItem('rol') != 1) {
          location.replace('index.html')
        }
      }
    }
    Verificar_storage_token()
  }
});


function Verificar_storage_token() {
  axios({
    method: 'POST',
    url: 'http://localhost:3001/api/g_verficar_datos_de_usuario_logueado',
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
      console.log('usuario verificado')
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

/*******************CERRAR SESION*************************/
function cerar_sesion() {
  sessionStorage.removeItem('token')
  sessionStorage.removeItem('userID')
  sessionStorage.removeItem('rol')
  sessionStorage.removeItem('userName')
  window.location.assign('login.html')
}