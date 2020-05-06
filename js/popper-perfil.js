



$("#menu-toggle").click(function(e) {
    e.preventDefault();
    $("#wrapper").toggleClass("toggled");
});


// $(document).ready(function(e) {
    $('#perfil').on('click', function(){
        $('#contenido-perfil').load('tablas-perfil.html', function(data) {
            // $(this).html(data);
        });

    })

// });

$("#pedidos").on('click',function () {
    $('#contenido-perfil').load('historial.html',function (data) {
        
    })
})


$("#pp-div").on('click',()=>{
    $("#file-img").click();
})

//-----------------INTENTO 2 --------------------------------
$("#file-img").change(function (e) {
    let img = e.target.files[0];
    // console.log(img);
    let fd = new FormData();
    fd.append("image",img);
    // console.log(fd);
    axios({
        url:'https://api-unahambre.herokuapp.com/api_usuario/upload-profile-pic',
        method: 'POST',
        data: fd,
        headers: {
            'idUsuario':sessionStorage.getItem('userID') ,
            'access-token':sessionStorage.getItem('token')
        }
    }).then(res=>{
        sessionStorage.setItem('userProfile', res.data)
        document.getElementById('imageUser').src = res.data
        document.getElementById('user_img').src = res.data
        document.getElementById('user_img2').src = res.data


        readURL(this);

        //CODIGO FUNCIONAL, PROBLEMA CON RECORRIDO ENTRE CARPETAS DE WINDOWS
        // let spdr = res.data.split('\\');
        // console.log(spdr);
        // let src = '../..';
        // for (let i = 7; i < spdr.length; i++) {
        //         src+='/'+spdr[i];
        // }
        // console.log(src);
        // $('#pp-img').attr('src',src);
    }).catch(err=>{
        console.log(err);
    });
});


//FUNCION UTILIZADA PARA PONER LA IMAGEN DE PERFIL
function readURL(input) {
    if (input.files && input.files[0]) {
      var reader = new FileReader();
      
      reader.readAsDataURL(input.files[0]);
      //esta funcion se ejecuta despues de que reader fue ejecutado como lector de url
      reader.onload = function(e) {
        $('#pp-img').attr('src', e.target.result);
      }
    }
  }