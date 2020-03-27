info_usuarios();
info_username();

function info_usuarios(){
    i = 0;

    axios({
        method:'POST',
        url:'http://localhost:3001/api/info-user',
        data: {
          idUsuario: sessionStorage.getItem('userID')
        }
    }).then(res=>{
        var div2 = $('#contenido-perfil');

        const datos_perfil2 =res.data.items;
            var contenido2 = `<div>
            <h3 class="mt-4">Bienvenido, ${datos_perfil2[i].Nombre} ${datos_perfil2[i].Apellidos}</h3>
            <p>Aquí podés gestionar toda tu información personal, ademas de consultar el historial de pedidos y los servicios de membresía.</p>
            <img src="img/profile.svg" width="500px" height="500px" alt="">
            
                </div>`;
        div2.html(contenido2);
        return datos_perfil2;
    }).catch(function(error){
        console.log(error);
    });                 
}

function info_username(){
    i = 0;

    axios({
        method:'POST',
        url:'http://localhost:3001/api/info-user',
        data: {
          idUsuario: sessionStorage.getItem('userID')
        }
    }).then(res=>{
        var div3 = $('#usuario_conten');

        const datos_perfil3 =res.data.items;
            var contenido3 = `<div>
            <p>${datos_perfil3[i].Nombre_Usuario}</p>
            
            </div>`;
        div3.html(contenido3);
        return datos_perfil3;
    }).catch(function(error){
        console.log(error);
    });                 
}