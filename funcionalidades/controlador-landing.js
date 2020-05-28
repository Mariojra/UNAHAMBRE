$(document).ready(function(){
    axios({
        method:'GET',
        url:'https://api-unahambre.herokuapp.com/api_producto/banners'
    }).then(res=>{
        console.log(res);
        let img_banner=`<img src="img/banner.png" class="img-banner" onclick="redireccionar()" data-plan="${res.data.items.Plan_idPlan}">`
        document.getElementById('banner').innerHTML= img_banner;
    }).catch(err=>{
        console.log(err);
    });
});

$("#redireccionar-n").click(function(){
    sessionStorage.setItem('stepAnterior', 'btn-negocio' )  //Codigo sujeto a cambios
})


function redireccionar() {
    location.replace('principal.html');
}

