
//configuracion sweetalert
const alert_default = Swal.mixin({
    closeOnClickOutside: false,
    allowOutsideClick: false,
    timer: 3000,
    timerProgressBar: true,
    onOpen: (modal) => {
        modal.addEventListener('mouseenter', Swal.stopTimer)
        modal.addEventListener('mouseleave', Swal.resumeTimer)
        // modal.addEventListener('onclick', location.replace('principal.html'))
    },
    showClass: {
        popup: 'animated fadeInDown'
    },
    hideClass: {
        popup: 'animated fadeOutUp'
    }
});
// addEventListener('DOMContentLoaded', async () => {
//     await alert_default.fire({
//         icon: 'success',
//         title: 'Procesando..'
//     });
//     location.replace('principal.html')
// })

function contratar_plan_basico() {
    axios({
        method: 'POST',
        url: 'https://api-unahambre.herokuapp.com/api_pago/contratar_plan',
        headers: {
            'access-token': sessionStorage.getItem('token')
        },
        data: {
            "idPlan": 0
        }

    }).then(res => {
        if (res.data.error[1][0].mensaje == null) {
            alert_default.fire({
                icon: 'success',
                title: 'Plan contratado con éxito.'
            });
            // location.replace('principal.html')
        } else {
            alert_default.fire({
                icon: 'success',
                title: res.data.error[1][0].mensaje
            });
        }
    }).catch(function (error) {
        alert_default.fire({
            icon: 'success',
            title: 'Error al contratar el plan, vuelve a intentarlo más tarde.'
        });
        console.log(error);
    })
}
function contratar_plan_intermedio() {
    axios({
        method: 'POST',
        url: 'https://api-unahambre.herokuapp.com/api_pago/contratar_plan',
        headers: {
            'access-token': sessionStorage.getItem('token')
        },
        data: {
            "idPlan": 1
        }

    }).then(res => {
        if (res.data.error[1][0].mensaje == null) {
            alert_default.fire({
                icon: 'success',
                title: 'Plan contratado con éxito.'
            });
            // location.replace('principal.html')
        } else {
            alert_default.fire({
                icon: 'success',
                title: res.data.error[1][0].mensaje
            });
        }
    }).catch(function (error) {
        alert_default.fire({
            icon: 'success',
            title: 'Error al contratar el plan, vuelve a intentarlo más tarde.'
        });
        console.log(error);
    })
}

function contratar_plan_premiun() {
    axios({
        method: 'POST',
        url: 'https://api-unahambre.herokuapp.com/api_pago/contratar_plan',
        headers: {
            'access-token': sessionStorage.getItem('token')
        },
        data: {
            "idPlan": 2
        }

    }).then(res => {
        if (res.data.error[1][0].mensaje == null) {
            alert_default.fire({
                icon: 'success',
                title: 'Plan contratado con éxito.'
            });
            // location.replace('principal.html')
        } else {
            alert_default.fire({
                icon: 'success',
                title: res.data.error[1][0].mensaje
            });
        }
    }).catch(function (error) {
        alert_default.fire({
            icon: 'success',
            title: 'Error al contratar el plan, vuelve a intentarlo más tarde.'
        });
        console.log(error);
    })
}

function mostrar_modal(plan) {
    document.getElementById('botones-modal').innerHTML = ` <button class="btn btn-secondary tex-center " data-dismiss="modal">
                                                            Cancelar
                                                        </button>
                                                        <button class="btn btn-primary tex-center" onclick="${plan}" data-dismiss="modal">
                                                            Continuar
                                                        </button>`
    $(document).ready(function () {
        $("#modal1").modal({
            backdrop: 'static',
            keyboard: false,
            focus: false
        });
    });

}