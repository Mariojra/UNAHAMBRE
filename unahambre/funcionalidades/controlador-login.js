const Toast = Swal.mixin({
    toast: true,
    position: 'top',
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
    width:'40rem',
    customClass:{
        popup:'swal-toastCustomPopup',
        title:'swal-toastCustomTitle'
    },
    onOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
});

const alert_defaults = Swal.mixin({
    timer: 2000,
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

$("#btn-login").click( () => {
    if(validarCampoVacio("#txt-usuario"),
        validarCampoVacio("#txt-pass")){
        // console.log("estas en el link y validando");
         let datos = {
             usuario:$("#txt-usuario").val(),
             contrasena:$("#txt-pass").val()
         };

        // console.log(datos);
        axios({
            method: 'POST',
            url:'http://localhost:3001/api/login',
            data: datos
        }).then(res=>{
            // console.log(res);
            if(res.data.item!=null){
                Toast.fire({
                   icon: 'success',
                   title: 'Signed in successfully'
                })
                // console.log(res.data.items[1][0].id);
                // console.log(res.data.item);
                sessionStorage.setItem('token',res.data.item);
                sessionStorage.setItem('userID',res.data.items[1][0].id);
                console.log(sessionStorage.getItem('token'));
                console.log(sessionStorage.getItem('userID'));
                setTimeout(()=>window.location.assign("principal.html"),3000);
                
            } else {
                alert_defaults.fire({
                    icon:"error",
                    title: res.data.error,
                    timer: 2000
                });
            }
        }).catch(err=>{
            console.log(err);
        })
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
        // $(id).addClass("is-invalid");
        // $(id).removeClass("is-valid");
        alert_defaults.fire({
            icon: "error",
            title: "No se permiten campos vacios"
        });
        return false;
    } else {
        // $(id).addClass("is-valid");
        // $(id).removeClass("is-invalid");
        return true;
    }
}


// sessionStorage.setItem('token', response.token)

// const token = sessionStorage.getItem('token')