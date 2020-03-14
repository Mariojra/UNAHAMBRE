$(document).ready(function(){
    console.log("se cargo el doc");
    // Step show event
    $("#smartwizard").on("showStep", function(e, anchorObject, stepNumber, stepDirection, stepPosition) {
       //alert("You are on step "+stepNumber+" now");
       if(stepPosition === 'first'){
           $(".sw-btn-prev").addClass('disabled');
           $(".btn-fin").addClass('display');
           $(".btn-cancel").addClass('display');
           console.log("estas en el if first");
       }else if(stepPosition === 'final'){
           $("#next-btn").addClass('disabled');
           $(".btn-fin").removeClass('display');
           $(".btn-cancel").removeClass('display');
           $(".sw-btn-prev").addClass('display');
           $(".sw-btn-next").addClass('display');
           console.log("estas en el if final");
       }else{
           $("#prev-btn").removeClass('disabled');
           $("#next-btn").removeClass('disabled');
           $(".btn-fin").addClass('display');
           $(".btn-cancel").addClass('display');
           console.log("estas en el if else");
       }
    });

    $("#smartwizard").on("endReset", function() {
      $("#next-btn").removeClass('disabled');
    });

    // Toolbar extra buttons
    var btnFinish = $('<button></button>').text('Finalizar')
                                     .addClass('btn btn-info btn-fin').on('click',function(){
                                        console.log('estas en el click de finalizar');
                                        axios({
                                            url:'http://localhost:3001/api/menus',
                                            method:'GET'
                                        }).then(res=>{
                                            console.log(res);
                                        })
                                    });
                                    //  .on('click', function(){ alert('SOLICITUD ENVIADA'); });
    var btnCancel = $('<button></button>').text('Cancelar')
                                     .addClass('btn btn-danger btn-cancel')
                                     .on('click', function(){ $('#smartwizard').smartWizard("reset"); });
//     $('.btn-fin').on('click',function(){
//     console.log('estas en el click de finalizar');
//     axios({
//         url:'http://localhost:3001/api/menus',
//         method:'GET'
//     }).then(res=>{
//         console.log(res);
//     })
// });


    // Smart Wizard
    $('#smartwizard').smartWizard({
            selected: 0,
            theme: 'arrows',
            lang: {  // Language variables
                next: 'Siguiente', 
                previous: 'Anterior'
            },
            transitionEffect:'slide',
            enableFinishButton: false,
            hideButtonsOnDisabled: false,
            transitionSpeed: 400,
            showStepURLhash: true,
            toolbarSettings: {toolbarPosition: 'down',
                              toolbarButtonPosition: 'end',
                              toolbarExtraButtons: [btnFinish, btnCancel
                            // Agrefar un nuevo boton
                                // ,
                                //  $('<button></button>').text('SIguiente').addClass('btn btn-info').on('click', function(){ 
                                // alert('Your button click');
                                //   })
                            
                            ],
                            },
    });

    $("#prev-btn").on("click", function() {
        // Navigate previous
        $('#smartwizard').smartWizard("prev");
        return true;
    });

    $("#next-btn").on("click", function() {
        // Navigate next
        $('#smartwizard').smartWizard("next");
        return true;
    });
    
    // $('#wizard').smartWizard({
    //     onFinish: function() {
    //        $("form").submit();
    //     }
    // });
    
    // $("form").validate({
    //     rules: {
    //         username: "required"
    //     }
    // });

});

