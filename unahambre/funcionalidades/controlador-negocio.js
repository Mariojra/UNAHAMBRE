$(document).ready(function(){
    console.log("Cargando documento...");
    
    // Step show event
    $("#smartwizard").on("showStep", function(e, anchorObject, stepNumber, stepDirection, stepPosition) {
       //alert("You are on step "+stepNumber+" now");
       if(stepPosition === 'first'){
           $(".sw-btn-prev").addClass('disabled');
           $(".btn-fin").addClass('display');
           $(".btn-cancel").addClass('display');
           console.log(stepNumber);
       }else if(stepPosition === 'final'){
           $("#next-btn").addClass('disabled');
           $(".btn-fin").removeClass('display');
           $(".btn-cancel").removeClass('display');
           $(".sw-btn-prev").addClass('display');
           $(".sw-btn-next").addClass('display');
           console.log(stepNumber);
       }else{
           $("#prev-btn").removeClass('disabled');
           $("#next-btn").removeClass('disabled');
           $(".btn-fin").addClass('display');
           $(".btn-cancel").addClass('display');
           console.log(stepNumber);
       }
    });


    // Toolbar extra buttons
    var btnFinish = $('<button></button>').text('Finalizar').addClass('btn btn-info btn-fin').on('click',function(){
        console.log("click funciona");
        var informacion ={
            idUsuario: 1,
            rolUsuario: 1,
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
        alert('SOLICITUD ENVIADA')
    });

    var btnCancel = $('<button></button>').text('Cancelar')
                                     .addClass('btn btn-danger btn-cancel')
                                     .on('click', function(){ $('#smartwizard').smartWizard("reset"); });


    // Smart Wizard
    $('#smartwizard').smartWizard({
            selected: 0,
            theme: 'arrows',
            lang: { 
                next: 'Siguiente', 
                previous: 'Anterior'
            },
            transitionEffect:'slide',
            enableFinishButton: false,
            hideButtonsOnDisabled: false,
            transitionSpeed: 400,
            showStepURLhash: true,
            autoAdjustHeight: true,
            toolbarSettings: {toolbarPosition: 'down',
                              toolbarButtonPosition: 'end',
                              toolbarExtraButtons: [btnFinish, btnCancel
                            // Agrefar un nuevo boton
                                // ,
                                //  $('<button></button>').text('SIguiente').addClass('btn btn-info').on('click', function(){ 
                                // alert('Your button click');
                                //   })
                            
                            ]
                            },
    });
});

