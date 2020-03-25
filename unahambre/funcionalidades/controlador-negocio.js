$(document).ready(function(){

    $("#smartwizard").on("showStep", function(e, anchorObject, stepNumber, stepDirection){
        if(stepNumber == 0 || stepNumber == 1){ 
        $("#smartwizard .btn-toolbar .btn-info").hide()
        $("#smartwizard .btn-toolbar .btn-danger").hide()
        }else{
        $("#smartwizard .btn-toolbar .btn-info").show()
        $("#smartwizard .btn-toolbar .btn-danger").show()
        }

        if( stepNumber == 2){
            $("#smartwizard .btn-toolbar .sw-btn-next").hide()
            $("#smartwizard .btn-toolbar .sw-btn-prev").hide()
    
        }else{
        $("#smartwizard .btn-toolbar .sw-btn-next").show()
        $("#smartwizard .btn-toolbar .sw-btn-prev").show()
        }


    });

    

    // Toolbar extra buttons
    var btnFinish = $('<button></button>').text('FINALIZAR')
                                     .addClass('btn btn-info')
                                     .on('click', function(){
                                            if( !$(this).hasClass('disabled')){
                                                var elmForm = $("#formuRegistro");
                                                if(elmForm){
                                                    elmForm.validator('validate');
                                                    var elmErr = elmForm.find('.has-error');
                                                    if(elmErr && elmErr.length > 0){
                                                        alert('COMPLETE TODOS LOS CAMPOS REQUERIDOS');
                                                        return false;
                                                    }else{

                                                        var informacion ={
                                                            idUsuario: sessionStorage.getItem('userID'),
                                                            rolUsuario: sessionStorage.getItem('rol'),
                                                            nombreRestaurante:$("#n-local").val(),
                                                            telefono: $("#n-telefono").val(),
                                                            correo: $('#n-correo').val(),
                                                            ubicacion:$("#n-direccion").val(),
                                                            
                                                           
                                                        };
                                                        console.log(informacion);
                                                        axios({
                                                            url:'http://localhost:3001/api/insert-restaurante',
                                                            method:'POST',
                                                            data: informacion
                                                        }).then(res=>{
                                                            console.log(res);
                                                        })

                                                        alert('SOLICITUD ENVIADA CORRECTAMENTE');
                                                        return false;
                                                    }
                                                }
                                            }
                                        });
    var btnCancel = $('<button></button>').text('CANCELAR')
                                     .addClass('btn btn-danger')
                                     .on('click', function(){
                                            $('#smartwizard').smartWizard("reset");
                                            $('#myForm').find("input, textarea").val("");
                                        });



    // Smart Wizard
    $('#smartwizard').smartWizard({
            selected: 0,
            theme: 'arrows',
            transitionEffect:'slide',
            lang: { 
                next: 'SIGUIENTE', 
                previous: 'ANTERIOR'
            },
            toolbarSettings: {toolbarPosition: 'bottom',
                              toolbarExtraButtons: [btnFinish, btnCancel]
                            },
            anchorSettings: {
                        markDoneStep: true, // add done css
                        markAllPreviousStepsAsDone: true, // When a step selected by url hash, all previous steps are marked done
                        removeDoneStepOnNavigateBack: true, // While navigate back done step after active step will be cleared
                        enableAnchorOnDoneStep: true // Enable/Disable the done steps navigation
                    }
         });

    $("#smartwizard").on("leaveStep", function(e, anchorObject, stepNumber, stepDirection) {
        var elmForm = $("#form-step-" + stepNumber);
        // stepDirection === 'forward' :- this condition allows to do the form validation
        // only on forward navigation, that makes easy navigation on backwards still do the validation when going next
        if(stepDirection === 'forward' && elmForm){
            elmForm.validator('validate');
            var elmErr = elmForm.children('.has-error');
            if(elmErr && elmErr.length > 0){
                // Form validation failed
                return false;
            }
        }
        return true;
    });

    $("#smartwizard").on("showStep", function(e, anchorObject, stepNumber, stepDirection) {
        // Enable finish button only on last step
        if(stepNumber == 3){
            $('.btn-finish').removeClass('disabled');
        }else{
            $('.btn-finish').addClass('disabled');
        }
    });

});