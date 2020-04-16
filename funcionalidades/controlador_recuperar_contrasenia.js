function validar_correo() {

    // document.getElementById('spinner').style.display = 'block'
    // document.getElementById('password').style.display = 'none'

    var correo = document.getElementById('correo').value
    console.log('Este es el varlor de la variable correo: ' + correo)
    if (correo.length > 12) {
        spinner('password', 120000)

        console.log("Correo ingresado: " + document.formulario.campo_correo.value)
        // alert(document.formulario.campo_correo.value)
         
        var obj_json = new Object()
        obj_json.correo = correo

        axios({
            method: 'POST',
            url: 'https://api-unahambre.herokuapp.com/api_usuario/recuperar_password',
            data: obj_json

        }).then(res => {
            console.log(res.data)
            if (res.data == 1) {
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
        // setTimeout(() => {spinner(p,advertencia ,aviso,con) }, 2000);
        // setTimeout(() => {
        //     document.getElementById('spinner').style.display = 'none'
        //     document.getElementById('password').style.display = 'block'
        //     
        //     

        // }, 2000)
        console.log("Goodbye!");

       


    }
    // document.formulario.submit()
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