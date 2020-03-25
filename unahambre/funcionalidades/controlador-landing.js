$("#redireccionar-n").click(function(){
    sessionStorage.setItem('stepAnterior', 'btn-negocio' )  //Codigo sujeto a cambios
})

function cerrarSesion(){
    sessionStorage.removeItem('token'); 
}
