$(function() {

    var TallerAvanzada = {};

    (function(app) {

        app.init = function() {
           
            $("#cerrarSesion").on('click', function(event) {
                $("#logedUser").html("flaco");
                document.location.href="CerrarSesion.php";
                event.preventDefault();
            });
        };
        
        app.init();

    })(TallerAvanzada);


});
