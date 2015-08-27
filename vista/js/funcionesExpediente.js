$(function() {
    var TallerAvanzada = {};
    (function(app) {
        app.init = function() {
            var rta = confirm("Esta seguro?");
            if (rta) {
                alert("Respuesta: OK");
            }else{
                alert("Respuesta: CANCEL");
            }
        };
        app.init();
    })(TallerAvanzada);
});
