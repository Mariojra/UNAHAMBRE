function info_usuarios(){
    i = 0;

    axios({
        method:'POST',
        url:'http://localhost:3001/api/info-user',
        data: {
            idUsuario: 5
        }
    }).then(res=>{
        var div = $('#informacion-perfil');

        const datos_perfil =res.data.items;
            var tarjeta = `<div>
            <h2>INFORMACION PERSONAL</h2>
            <p></p>
            <div class="container-fluid foco">
              <div class="titulo">
                <h3>MI PERFIL</h3>
                <p>Mantené tu información siempre actualizada</p>
              </div>
        
              <div class="subcontenedor row justify-content-center align-items-center">
                <div class="parametros col-4"><h3>NOMBRE</h3></div>
                <div class="col-4">${datos_perfil[i].Nombre} ${datos_perfil[i].Apellidos} </div>
                <div class="col-4"><a href=""><i class="fas fa-edit"></i></a> </div>
              </div>
        
              <div class="subcontenedor row justify-content-center align-items-center">
                <div class="parametros col-4"><h3>usuario</h3></div>
                <div class="col-4">${datos_perfil[i].Nombre_Usuario}</div>
                <div  class="col-4"><a href=""><i class="fas fa-edit"></i></a> </div>
              </div>
        
              <div class="subcontenedor row justify-content-center align-items-center">
                <div class="parametros col-4"><h3>SEXO</h3></div>
                <div class="col-4">${datos_perfil[i].Sexo}</div>
                <div class="col-4"><a href=""><i class="fas fa-edit"></i></a> </div>
              </div>
        
              <div class="subcontenedor row justify-content-center align-items-center">
                <div class="parametros col-4"><h3>CONTRASEÑA</h3></div>
                <div class="col-4"> * * * * * * * * *</div>
                <div  class="col-4"><a href=""><i class="fas fa-edit"></i></a> </div>
              </div>
            </div>
            
            <div class="container-fluid foco">
              <div class="titulo">
                <h3>CONTACTOS</h3>
              </div>
        
              <div class="subcontenedor row justify-content-center align-items-center">
                <div class="parametros col-4"><h3>correo</h3></div>
                <div class="col-4">${datos_perfil[i].Correo}</div>
                <div class="col-4"><a href=""><i class="fas fa-edit"></i></a> </div>
              </div>
        
              <div class="subcontenedor row justify-content-center align-items-center">
                <div class="parametros col-4"><h3>telefono</h3></div>
                <div class="col-4">${datos_perfil[i].Celular}</div>
                <div class="col-4"><a href=""><i class="fas fa-edit"></i></a> </div>
              </div>
            </div>

                </div>`;
        div.append(tarjeta);
        console.log(datos_perfil);
    }).catch(function(error){
        console.log(error);
    });                 
}

info_usuarios();



{/* <div >
<p> ${datos_perfil.Nombre}</p> 
<p> ${datos_perfil.Apellidos}</p>
<p> ${datos_perfil.Nombre_Usuario}</p> 
<p> ${datos_perfil.Celular}</p> 
<p> ${datos_perfil.Sexo}</p> 
<p> ${datos_perfil.Numero_Identidad}</p> 
<p> ${datos_perfil.Correo}</p> 
</div> */}