
//configuracion sweetalert
const alert_defaults = Swal.mixin({
    timer: 3000,
    timerProgressBar: true,
    onOpen: (modal)=>{
        modal.addEventListener('mouseenter', Swal.stopTimer)
        modal.addEventListener('mouseleave', Swal.resumeTimer)
    },
    customClass:{
        popup:'swal-customPopup',
        title:'swal-customTitle',
        icon: 'swal-customIcon',
        confirmButton: 'swal-customButton'
    },
    showClass: {
        popup: 'animated zoomInDown'
      },
      hideClass: {
        popup: 'animated zoomOutUp'
      }
});

//peticion registrar usuario
$("#btn-registro").click(function() {
    console.log("el click funciona correctamente");
    if (
        validarCampoVacio("#txt-nombres")&&
        validarCampoVacio("#txt-apellidos")&&
        validarCampoVacio("#txt-email")&&
        validarRadioVacio("#label-m","#label-f")&&
        validarCampoVacio("#txt-usuario")&&
        validarCampoVacio("#txt-pwd")&&
        validarCampoVacio("#txt-pwdRe")&&
        validarCampoVacio("#txt-idcuenta")&&
        validarCampoVacio("#txt-numTel")
        // validarEmail()&&
        // validarContrasena()&&
        // compararContras()
        ) {
            let datos = {
                nombre:$("#txt-nombres").val(),
                apellido:$("#txt-apellidos").val(),
                celular: $("#txt-numTel").val(),
                sexo: $('input[name="sexo"]').val(),
                numeroIdentidad: $("#txt-idcuenta").val(),
                nombreUsuario:$("#txt-usuario").val(),
                contrasena:$("#txt-pwd").val(),
                correo:$("#txt-email").val()
            };
            console.log(datos);
            axios({
                method:'POST',
                url:'https://api-unahambre.herokuapp.com/api_usuario/registrar_usuario',
                data:datos

            }).then(res=>{
                console.log(res.data)
                // alert("Usuario registrado con exito");
                alert_defaults.fire({
                    icon:'success',
                    title: 'Usuario registrado con exito'
                });
                location.replace('login.html')
            }).catch(err=>{
                console.log(err)
                alert_defaults.fire({
                    icon:'error',
                    title:res.data.error
                });
            })
    }
});

function validarCampoVacio(id) {
    if ($(id).val()=="") {
        $(id).addClass("is-invalid");
        $(id).removeClass("is-valid");
        return false;
    } else {
        $(id).addClass("is-valid");
        $(id).removeClass("is-invalid");
        return true;
    }
}

function validarRadioVacio(id1,id2) {
    if ($('input[name="sexo"]').is(':checked')) {
        // console.log("estas en el if");
        $(id1).addClass("radio-isvalid");
        $(id1).removeClass("radio-isinvalid");
        $(id2).addClass("radio-isvalid");
        $(id2).removeClass("radio-isinvalid");
        return true;
    } else {
        $(id1).addClass("radio-isinvalid");
        $(id1).removeClass("radio-isvalid");
        $(id2).addClass("radio-isinvalid");
        $(id2).removeClass("radio-isvalid");
        return false;
    }
}


function validarEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(email)) {
        document.getElementById("txt-email").classList.remove("is-invalid");
        document.getElementById("txt-email").classList.add("is-valid");
        return true;
    } else{
        document.getElementById("txt-email").classList.remove("is-valid");
        document.getElementById("txt-email").classList.add("is-invalid");
        return false;
    }
}

function validarContrasena(pwd,id) {
    // console.log(id);
    var rePassMedia= /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/;
    var rePassFuerte = /^(?=.*\d)(?=.*[\u0021-\u002b\u003c-\u0040])(?=.*[A-Z])(?=.*[a-z])\S{8,16}$/;
    if (rePassFuerte.test(pwd)) {
        document.getElementById(id).classList.remove("is-invalidP");
        document.getElementById(id).classList.add("is-validP");
        document.getElementById(id).classList.remove("is-medium");
        return true;
    } else if (rePassMedia.test(pwd)) {
        document.getElementById(id).classList.remove("is-invalidP");
        document.getElementById(id).classList.remove("is-validP");
        document.getElementById(id).classList.add("is-medium");
        return false;
    } else {
        // console.log("estas en el else");
        document.getElementById(id).classList.remove("is-validP");
        document.getElementById(id).classList.add("is-invalidP");
        document.getElementById(id).classList.remove("is-medium");
        return false;
    }
}

function compararContras(pwd2,id1,id2) {
    // console.log("esta funcionando el onclick");
    // var pass1 = document.getElementById(id1).value;
    // console.log(pass1);
    if (pwd2==document.getElementById(id1).value) {
        document.getElementById(id2).classList.add("is-validR");
        document.getElementById(id2).classList.remove("is-invalidR");
        return true;
    } else {
        document.getElementById(id2).classList.add("is-invalidR");
        document.getElementById(id2).classList.remove("is-validR");
        return false;
    }
}