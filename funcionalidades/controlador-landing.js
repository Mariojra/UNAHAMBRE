// $(document).ready(function(){
    
// });

$("#redireccionar-n").click(function(){
    sessionStorage.setItem('stepAnterior', 'btn-negocio' )  //Codigo sujeto a cambios
})
document.addEventListener("DOMContentLoaded", () => {
    axios({
        method: 'GET',
        url: 'https://api-unahambre.herokuapp.com/api_producto/pop_ups'
    }).then(res => {
        setTimeout(function(){
            $.colorbox({
            href: res.data.items.Foto_Pop_ups,
            
            className: "cta",
            width: 500,
            scalePhotos: true,
            height: 500,
            reposition: true,
            maxWidth: "70%",
            maxHeight: "70%"
    
    
            });
        }, 8000);
        console.log(res.data.items.Foto_Pop_ups)
    }).catch(err => {
        console.log(err)
    })

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
})

function redireccionar() {
    location.replace('principal.html');
}

