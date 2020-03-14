$("#btn-login").click(function () {
    if(validarCampoVacio("#txt-usuario"),
        validarCampoVacio("#txt-pass")){
            console.log("estas en el link y validando");
    }else{
        console.log();
    }
});

let mostrarC = 0;

$("#btn-login-ojo").click(function () {
    if (mostrarC==0) {
        $("#ojo").removeClass('fa-eye');
        $("#ojo").addClass('fa-eye-slash');
        $("#txt-pass").attr('type','text');
        $("#txt-pass").focus();
        mostrarC=1;
    } else {
        $("#ojo").removeClass('fa-eye-slash');
        $("#ojo").addClass('fa-eye');
        $("#txt-pass").attr('type','password');
        $("#txt-pass").focus();
        mostrarC=0;
    }
})


function validarCampoVacio(id){
    if ($(id).val()==""){
        $(id).addClass("is-invalid");
        $(id).removeClass("is-valid");
    } else {
        $(id).addClass("is-valid");
        $(id).removeClass("is-invalid");
    }
}


// sessionStorage.setItem('token', response.token)

// const token = sessionStorage.getItem('token')