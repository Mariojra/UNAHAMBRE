window.onload = info_usuarios();

//CONFIGURACION PREDETERMINADA SWEETALERTS
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

//funcion al cargar pagina renderizada
function info_usuarios(){
  if (sessionStorage.getItem('userProfile') != undefined) {
    document.getElementById("imageUser").src = sessionStorage.getItem('userProfile')
  }
  console.log('se entro a la funcion');
    let i = 0;

    axios({
        method:'POST',
      url:'https://api-unahambre.herokuapp.com/api_usuario/informacion_usuario',
      data: {
          idUsuario: sessionStorage.getItem('userID')
      },
      headers: {
        'access-token': sessionStorage.getItem('token')
      }
    }).then(res=>{
        let div = $('#info-perfil');

        const datos_perfil =res.data.items;
            let tarjeta = `<div>
            <h2>INFORMACION PERSONAL</h2>
            <p></p>
            <div class="container-fluid foco">
              <div class="titulo">
                <h3>MI PERFIL</h3>
                <p>Mantené tu información siempre actualizada</p>
              </div>

              <div class="subcontenedor row justify-content-center align-items-center">
                <div class="parametros col-12 col-sm-4 col-md-4 col-lg-4 col-xl-4"><h3>NOMBRE</h3></div>
                <div class="col-12 col-sm-8 col-md-4 col-lg-4 col-xl-4" id="div-nombre">${datos_perfil[i].Nombre} ${datos_perfil[i].Apellidos} </div>

              </div>

              <div class="subcontenedor row justify-content-center align-items-center">
                <div class="parametros col-12 col-sm-4 col-md-4 col-lg-4 col-xl-4"><h3>usuario</h3></div>
                <div class="col-12 col-sm-8 col-md-4 col-lg-4 col-xl-4" id="div-usuario">${datos_perfil[i].Nombre_Usuario}</div>

              </div>

              <div class="subcontenedor row justify-content-center align-items-center">
                <div class="parametros col-12 col-sm-4 col-md-4 col-lg-4 col-xl-4"><h3>SEXO</h3></div>
                <div class="col-12 col-sm-8 col-md-4 col-lg-4 col-xl-4">${datos_perfil[i].Sexo}</div>

              </div>

              <div class="subcontenedor row justify-content-center align-items-center">
                <div class="parametros col-12 col-sm-4 col-md-4 col-lg-4 col-xl-4"><h3>CONTRASEÑA</h3></div>
                <div class="col-12 col-sm-8 col-md-4 col-lg-4 col-xl-4"> * * * * * * * * *</div>

              </div>
            </div>

            <div class="container-fluid foco">
              <div class="titulo">
                <h3>CONTACTOS</h3>
              </div>

              <div class="subcontenedor row justify-content-center align-items-center">
                <div class="parametros col-12 col-sm-4 col-md-4 col-lg-4 col-xl-4"><h3>correo</h3></div>
                <div class="col-12 col-sm-8 col-md-4 col-lg-4 col-xl-4">${datos_perfil[i].Correo}</div>

              </div>

              <div class="subcontenedor row justify-content-center align-items-center">
                <div class="parametros col-12 col-sm-4 col-md-4 col-lg-4 col-xl-4"><h3>telefono</h3></div>
                <div class="col-12 col-sm-8 col-md-4 col-lg-4 col-xl-4" id="div-celular">${datos_perfil[i].Celular}</div>

              </div>
            </div>

                </div>`;
        div.append(tarjeta);
        $("#modal-txt-user").attr('value',datos_perfil[i].Nombre_Usuario);
        $("#modal-txt-nombre").attr('value',datos_perfil[i].Nombre);
        $("#modal-txt-apellido").attr('value',datos_perfil[i].Apellidos);
        $("#modal-txt-tel").attr('value',datos_perfil[i].Celular);
        // console.log(datos_perfil);
    }).catch(function(error){
        console.log(error);
    });
};


// EJECUTAR LA VENTANA MODAL
$("#btn-editar-info").click(function(){
  console.log("ventana modal lanzada");
  $("#editar-info").modal("show");
})


//EDITAR INFO DE USUARIOS, BTN EN EL MODAL
$("#btn-conf-editar").click(function(){
  console.log("click en confirmar edicion");
  if(validarCampoVacio('#modal-txt-user')&&
      validarCampoVacio('#modal-txt-nombre')&&
      validarCampoVacio('#modal-txt-apellido')&&
      validarCampoVacio('#modal-txt-tel')){
    let data ={
      idUsuario: sessionStorage.getItem('userID'),//esto vendra en el sessionStorage.
      nombreUsuario:sessionStorage.getItem('userName'),//esto vendra en el sessionStorage.
      nuevoUsuario:$("#modal-txt-user").val(),
      celular:$("#modal-txt-tel").val(),
      nuevoNombre:$("#modal-txt-nombre").val(),
      nuevoApellido:$("#modal-txt-apellido").val()
    }
    // console.log("esta es la data"+data);
    axios({
      method:'PUT',
      url:'https://api-unahambre.herokuapp.com/api_usuario/cambiar_informacion_usuario',
      headers: {
        'access-token': sessionStorage.getItem('token')
      },
      data: data
    }).then(res=>{
      // console.log(res);
      document.getElementById('usuario_conten').innerHTML=$("#modal-txt-user").val();
      document.getElementById('div-usuario').innerHTML=$("#modal-txt-user").val();
      document.getElementById('div-nombre').innerHTML=$("#modal-txt-nombre").val() + ' ' + $("#modal-txt-apellido").val();
      document.getElementById('div-celular').innerHTML=$("#modal-txt-tel").val();
      $("#editar-info").modal("hide");
      alert_default.fire({
        icon:"success",
        title:"Informacion editada con exito."
      });
    }).catch(err=>{
      console.log(err)
    })
  }
});

//EJECUTAR VENTANA MODAL CAMBIAR CONTRASENA
$("#btn-cambiar-contrasena").click(function(){
  console.log("ventana modal lanzada");
  $("#cambiar-contrasena").modal("show");
});

$('#btn-conf-contrasena').click(function(){
  //usuario, contrasena, nueva_contrasena forma del json
  let datos = {
    usuario:sessionStorage.getItem('userID'),//con el sessionStorage
    contrasena: $('#modal-txt-contrasena').val(),
    nueva_contrasena: $('#modal-txt-RNcontrasena').val()
  };
  // console.log(datos);
  axios({
    method:'POST',
    url:'https://api-unahambre.herokuapp.com/api_usuario/cambiar-contrasena',
    headers: {
      'access-token': sessionStorage.getItem('token')
    },
    data: datos
  }).then(res=>{
    console.log(res);
    if(res.data.error[1][0].mensaje==null){
      console.log('contra cambiada');
      alert_default.fire({
        icon:'success',
        title:'Contraseña cambiada con exito'
      });
    } else {
      alert_default.fire({
        icon: 'error',
        title: res.data.error[1][0].mensaje
      });
    }
    console.log(res.data.error[1][0].mensaje);
  }).catch(err=>{
    console.log(err);
  });
})

//validar campos vacios
function validarCampoVacio(id){
  if ($(id).val()==""){
      $(id).addClass("is-invalid");
      $(id).removeClass("is-valid");
      return false;
  } else {
      $(id).addClass("is-valid");
      $(id).removeClass("is-invalid");
      return true;
  }
}

//VALIDANDO QUE LA CONTRASEÑA SEA FUERTE
function validarContrasena(pwd,id) {
  var rePassMedia= /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/;
  var rePassFuerte = /^(?=.*\d)(?=.*[\u0021-\u002b\u003c-\u0040])(?=.*[A-Z])(?=.*[a-z])\S{8,16}$/;
  if (rePassFuerte.test(pwd)) {
      document.getElementById(id).classList.remove("is-invalid");
      document.getElementById(id).classList.add("is-valid");
      document.getElementById(id).classList.remove("is-medium");
      return true;
  } else if (rePassMedia.test(pwd)) {
      document.getElementById(id).classList.remove("is-invalid");
      document.getElementById(id).classList.remove("is-valid");
      document.getElementById(id).classList.add("is-medium");
      return false;
  } else {
      document.getElementById(id).classList.remove("is-valid");
      document.getElementById(id).classList.add("is-invalid");
      document.getElementById(id).classList.remove("is-medium");
      return false;
  }
}

//COMPARANDO LAS NUEVAS CONTRASENAS
function compararContras(pwd2,id1,id2) {
  if (pwd2==document.getElementById(id1).value) {
      document.getElementById(id2).classList.add("is-valid");
      document.getElementById(id2).classList.remove("is-invalid");
      return true;
  } else {
      document.getElementById(id2).classList.add("is-invalid");
      document.getElementById(id2).classList.remove("is-valid");
      return false;
  }
}