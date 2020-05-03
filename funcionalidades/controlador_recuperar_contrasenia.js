function validar_correo() {
    var correo = document.getElementById('correo').value
    if (correo.length > 12) {
        spinner('password', 120000)

        // alert(document.formulario.campo_correo.value)
         
        var obj_json = new Object()
        obj_json.correo = correo

        axios({
            method: 'POST',
            url: 'https://api-unahambre.herokuapp.com/api_usuario/recuperar_password',
            data: obj_json

        }).then(res => {
            if (res.data.success == true) {
                mostrar_modal(); 
            }else{
                document.getElementById('advertencia').style.display = 'block'
                document.getElementById('aviso').innerHTML = 'Correo no registrado'
                document.getElementById('spinner').style.display = 'none'
                document.getElementById('password').style.display = 'block'

            }

            
        }).catch(err => {
            console.log(err)
        })
  
    } else {
        
        spinner('password', 200)
        document.getElementById('advertencia').style.display = 'block'
        document.getElementById('aviso').innerHTML = 'Debes ingresar un correo valido'

    }
}

function ocultar_advertencia(){
    document.getElementById('advertencia').style.display = 'none'
}
function mostrar_modal(){
    $(document).ready(function () {
        $("#modal1").modal({
            backdrop:'static',
            keyboard:false,
            focus:false
        });
    });

}