<<<<<<< HEAD
$("#redireccionar-n").click(function(){
    sessionStorage.setItem('stepAnterior', 'btn-negocio' )  //Codigo sujeto a cambios
})

function cerrarSesion(){
    sessionStorage.removeItem('token'); 
}
=======
document.addEventListener('DOMContentLoaded',function(){
    if(sessionStorage.getItem('token') && sessionStorage.getItem('rol')=='2'){
        window.location.assign('principal.html');

    } else if(sessionStorage.getItem('token') && sessionStorage.getItem('rol')=='1'){
        window.location.assign('administracion-negocio.html');

    } else if(sessionStorage.getItem('token') && sessionStorage.getItem('rol')=='0'){
        window.location.getItem('administracion-usuario.html')
    }
});
>>>>>>> feature/afinamiento_registro_y_landing
