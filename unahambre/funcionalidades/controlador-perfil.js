window.onload = info_usuarios();

function info_usuarios(){
  console.log('se entro a la funcion');
    let i = 0;

    axios({
        method:'POST',
        url:'http://localhost:3001/api/info-user',
        data: {
          idUsuario: 7
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
                <div class="col-12 col-sm-8 col-md-4 col-lg-4 col-xl-4">${datos_perfil[i].Nombre} ${datos_perfil[i].Apellidos} </div>

              </div>

              <div class="subcontenedor row justify-content-center align-items-center">
                <div class="parametros col-12 col-sm-4 col-md-4 col-lg-4 col-xl-4"><h3>usuario</h3></div>
                <div class="col-12 col-sm-8 col-md-4 col-lg-4 col-xl-4">${datos_perfil[i].Nombre_Usuario}</div>

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
                <div class="col-12 col-sm-8 col-md-4 col-lg-4 col-xl-4">${datos_perfil[i].Celular}</div>

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


//EDITAR INFO DE USUARIOS, BTN EN MODAL
$("#btn-conf-editar").click(function(){
  console.log("click en confirmar edicion");
  let data ={
    idUsuario: 7,//esto vendra en el sessionStorage.
    nombreUsuario:"Mario Rosales",//esto vendra en el sessionStorage.
    nuevoUsuario:$("#modal-txt-user").val(),
    celular:$("#modal-txt-tel").val(),
    nuevoNombre:$("#modal-txt-nombre").val(),
    nuevoApellido:$("#modal-txt-apellido").val()
  }
  console.log("esta es la data"+data);
  axios({
    method:'PUT',
    url:'http://localhost:3001/api/cambiar-info-usuario',
    data: data
  }).then(res=>{
    console.log(res);
    $("#editar-info").modal("hide");
  }).catch(err=>{
    console.log(err)
  })
});

$("#btn-cambiar-contrasena").click(function(){
  console.log("ventana modal lanzada");
  $("#cambiar-contrasena").modal("show");
});