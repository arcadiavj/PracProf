$(function() {

    var TallerAvanzada = {};

    (function(app) {

        app.init = function() {
            $("#reporDetalle").hide(); 
            $("#alertaA").hide();
            $("#alertaE").hide();
            $("#cerrarSesion").on('click', function(event) {
                document.location.href="../../CerrarSesion.php";
                event.preventDefault();
            });
            app.buscarUsuarios();  
            app.bindings();
            
        };
        
        app.bindings = function() {
            
            $("#agregar").on('click', function(event) {
                event.preventDefault();
                app.borrarCampos();
                $('#fCrea').hide();
                $('#fModi').hide();
                $('#fUsuario').hide();
                $("#id").val(0);
                $("#mHeader").removeClass();
                $("#mHeader").attr("class","modal-header bg-primary");
                $("#tituloModal").html("Nuevo Asistente");//Cambio el título del Modal
                $("#modalAsistente").modal({show: true});//lo muestro
                $("#accion").attr("value","guardar");//Cambio el nombre del boton
                $("#guardar").html("Agregar");
                $("#nombreAsistente").removeAttr("disabled");//elimino la propiedad "disabled" que usé para VER
                $("#apellidoAsistente").removeAttr("disabled");
                $("#guardar").show();//muestro el boton guardar
                $("#reporDetalle").hide();//
            });
            
            $("#reporteAlumno").on('click', function(event) {
                event.preventDefault();
                window.open('reporteAlumnos.php', '_blank'); //de esta forma abre en una nueva ventana o pestaña
                //document.location.href="reporteAlumnos.php";
            });

            $("#reporDetalle").on('click', function(event) {
                event.preventDefault();
                var idAl = $("#id").val();
                window.open('reporteDetalleAlumno.php?id=' + idAl,  '_blank'); //de esta forma abre en una nueva ventana o pestaña
                //document.location.href="reporteAlumnos.php";
            });
            
            $("#exampleBody").on('click', '.editar', function(event) {
                event.preventDefault();
                $("#id").val($(this).attr("data-id_asistente"));
                
                $('#fCrea').show();
                $('#fModi').show();
                $('#fUsuario').hide();
                
                $("#mHeader").removeClass();
                $("#mHeader").attr("class","modal-header bg-success");
                $("#nombreAsistente").val($(this).parent().parent().children().first().next().html());
                $("#apellidoAsistente").val($(this).parent().parent().children().first().next().next().html());
                
                $('#txtCreacion').val($(this).parent().parent().children().first().next().next().next().html());
                $('#txtCreacion').attr('disabled', 'true');
                $('#txtModificacion').val($(this).parent().parent().children().first().next().next().next().next().html());
                $('#txtModificacion').attr('disabled', 'true');
                $('#txtUsuario').val($(this).parent().parent().children().first().next().next().next().next().next().html());
                $('#txtUsuario').attr('disabled', 'true');
                
                $("#guardar").html("Modificar");
                $("#accion").attr("value","modificar");
                $("#tituloModal").html("Editar Asistente");
                $("#modalAsistente").modal({show: true});                
                $("#nombreAsistente").removeAttr("disabled");//elimino la propiedad "disabled" que usé para ver
                $("#apellidoAsistente").removeAttr("disabled");
                $("#guardar").show();
                $("#reporDetalle").hide();
                
            });
            
            $("#exampleBody").on('click', '.seleccionar', function(event) {
                event.preventDefault();
                $("#id").val($(this).attr("data-id_asistente"));
                $("#mHeader").removeClass();
                $("#mHeader").attr("class","modal-header bg-info");
                $('#fCrea').show();
                $('#fModi').show();
                $('#fUsuario').show();
                
                $("#nombreAsistente").val($(this).parent().parent().children().first().next().html());
                $("#nombreAsistente").attr('disabled', 'true');
                $("#apellidoAsistente").val($(this).parent().parent().children().first().next().next().html());
                $("#apellidoAsistente").attr('disabled', 'true');
                
                $('#txtCreacion').val($(this).parent().parent().children().first().next().next().next().html());
                $('#txtCreacion').attr('disabled', 'true');
                $('#txtModificacion').val($(this).parent().parent().children().first().next().next().next().next().html());
                $('#txtModificacion').attr('disabled', 'true');
                $('#txtUsuario').val($(this).parent().parent().children().first().next().next().next().next().next().html());
                $('#txtUsuario').attr('disabled', 'true');
                
                $("#guardar").hide();
                $("#reporDetalle").show();
                $("#guardar").html("Modificar");
                $("#guardar").attr("value","Modificar");
                $("#tituloModal").html("Detalles Usuario");
                $("#modalAsistente").modal({show: true});
            });
            
            $("#exampleBody").on('click', '.eliminar', function() {
                app.eliminarUsuario($(this).attr("data-id_asistente"));
            });
            
            $("#cancelar").on("click", function(event) {
                event.preventDefault();
                app.borrarCampos();
                $("#modalUsuario").modal('hide');
            });

            $("#guardar").on("click", function(event) {
                event.preventDefault();
                app.guardarUsuarios();
            });
            
            
            
            $("#formAsistente").bootstrapValidator({
                excluded: []
            });
        };
        
        app.borrarCampos = function (){
            $("#nombreAsistente").val("").html();
            $("#apellidoAsistente").val("").html();
            $("#formAsistente").bootstrapValidator('resetForm', true);
        }; 
        
        app.guardarUsuarios = function() {
            
            var url = "../../controlador/ruteador/Ruteador.php"; //voy al ruteador a guardar Usuario (tanto para modific como para agregar)
            //data del formulario persona
            $('#txtCreacion').removeAttr('disabled');
            $('#txtModificacion').removeAttr('disabled');
            var data = $("#formAsistente").serialize();//convierto los datos del alumno en un array para enviarlos al ruteados
            $.ajax({
                url: url,//paso la url
                method: 'POST',//método que utilizo
                dataType: 'json',//tipo de datos
                data: data,//el formulario del usuario que estoy pasando
                success: function(datos) {//si todo salió bien 
                    $("#modalAsistente").modal('hide');//oculto el modal
                    app.actualizarDataTableAsistente(datos, $("#id").val());
                    $("#alertaA").show();  
                },
                error: function(data) {//si hay un error lo muestro por pantalla
                    alert(data);//mensaje de error
                }
            });
        };
        
        app.eliminarUsuario = function(id) {

            var url = "../../controlador/ruteador/Ruteador.php?accion=eliminar&nombreFormulario=Asistente&id=" + id; //cambiar url

            $.ajax({
                url: url,
                method: "GET",
                dataType: 'json',
                success: function(data) {
                    app.borrarFilaDataTable(id);
                    $("#alertaE").show();
                },
                error: function(data) {
                    alert('error');
                }
            });

        };

        app.borrarFilaDataTable = function(id) {
            var fila = $("#exampleBody").find("a[data-id_asistente='" + id + "']").parent().parent().remove();

        };
        
        app.buscarUsuarios = function() {//función que se encarga de realizar la busqueda de los usuarios
            var url = "../../controlador/ruteador/Ruteador.php?accion=buscar&nombreFormulario=Asistente";//paso la dirección del 
            //ruteador para obtener los datos de la BD
            $.ajax({//ajax para realizar la petición de los datos
                url: url,
                method: 'GET',
                dataType: 'json',
                success: function(data) {//si todo sale bien llamo a la funcion correspondiente
                    app.rellenarDataTable(data);//esta es la función encargada de rellenar la tabla conlos datos de los usuarios del sistema
                },
                error: function() {//si algo sale mal muestra un mensaje de error
                    alert('error');
                }

            });
        };
        
        
         app.rellenarDataTable = function(data) {//función para rellenar la tabla
            var html = "";//variable que voy a utilizar para rellenar la tabla

            $.each(data, function(clave, asistente) {//recorro todos los datos devueltos con el JSon
                
                html += '<tr class="text-warning">' +//agrego cada uno de los datos correspondientes además habilito dos columnas para poder
                //después editar los datos que he recibido
                        '<td><a class="seleccionar" data-id_asistente="' + asistente.id_asistente + '"><button class="seleccionar btn btn-info btn-sm" id="usuarioVer" value="usuarioVer">'+
                            '<span class="glyphicon glyphicon-eye-open left">  Info</span>'+
                                '</button></a></td>' +                        
                        '<td>' + asistente.nombre_asistente + '</td>' +
                        '<td>' + asistente.apellido_asistente + '</td>' +
                        '<td>' + asistente.fch_creacion+ '</td>' +
                        '<td>' + asistente.fch_modificacion + '</td>' +
                        '<td>' + asistente.nombre_usuario+'  '+ asistente.apellido_usuario + '</td>' +
                        '<td>' +
                        '<a class="pull-left editar" data-id_asistente="' + asistente.id_asistente + '">'+
                        '<button class="btn btn-success btn-sm" id="editarUsuario" value="editarUsuario">'+
                            '<span class="glyphicon glyphicon-pencil"> Editar</span>'+
                                '</button></a>' +                                
                        '<a class="pull-right eliminar" data-id_asistente="' + asistente.id_asistente + '">'+
                        '<button class="btn btn-danger btn-sm" id="eliminarUsuario" value="eliminarUsuario">'+
                            '<span class="glyphicon glyphicon-remove"> Eliminar</span>'+
                                '</button></a>' +
                        '</td>' +
                        '</tr>';
            });
            $("#exampleBody").html(html);//meto los datos en la tabla que corresponde
            $("#example").dataTable({       //transforma la tabla en dataTable
                "sPagiationType":"full_numbers", //activa la paginación con números
                "language":{ //cambia el lenguaje de la dataTable
                    "url":"../js/dataTable-es.json" //este es el archivo json del lenguaje español
                }
            });
        };
        
        
        app.actualizarDataTableAsistente= function(asistente, id) {
            if (id == 0) { //si entra acá es porque es agregar
                var html="";
                 html += '<tr class="text-warning">' +
                         ////agrego cada uno de los datos correspondientes además habilito dos columnas para poder
                //después editar los datos que he recibido
                        '<td><a class="seleccionar" data-id_asistente="' + asistente.id_asistente + '"><button class="seleccionar btn btn-info btn-sm" id="usuarioVer" value="usuarioVer">'+
                            '<span class="glyphicon glyphicon-eye-open left">  Info</span>'+
                                '</button></a></td>' +                        
                        '<td>' + asistente.nombre_asistente + '</td>' +
                        '<td>' + asistente.apellido_asistente + '</td>' +
                        '<td>' + asistente.fch_creacion+ '</td>' +
                        '<td>' + asistente.fch_modificacion + '</td>' +
                        //'<td>' + asistente.nombre_usuario+'  '+ asistente.apellido_usuario + '</td>' +
                        '<td>'+asistente.id_ususario+'</td>'+
                        '<td>' +
                        '<a class="pull-left editar" data-id_asistente="' + asistente.id_asistente + '">'+
                        '<button class="btn btn-success btn-sm" id="editarUsuario" value="editarUsuario">'+
                            '<span class="glyphicon glyphicon-pencil"> Editar</span>'+
                                '</button></a>' +                                
                        '<a class="pull-right eliminar" data-id_asistente="' + asistente.id_asistente + '">'+
                        '<button class="btn btn-danger btn-sm" id="eliminarUsuario" value="eliminarUsuario">'+
                            '<span class="glyphicon glyphicon-remove"> Eliminar</span>'+
                                '</button></a>' +
                        '</td>' +
                        '</tr>';
                        
                $("#exampleBody").append(html);
                
            } else {
                //busco la fila
                var html="";
                var fila = $("#exampleBody").find("a[data-id_asistente='" + id + "']").parent().parent();
                  html +='<td><a class="seleccionar" data-id_asistente="' + asistente.id_asistente + '"><button class="seleccionar btn btn-info btn-sm" id="usuarioVer" value="usuarioVer">'+
                            '<span class="glyphicon glyphicon-eye-open left">  Info</span>'+
                                '</button></a></td>' +                        
                        '<td>' + asistente.nombre_asistente + '</td>' +
                        '<td>' + asistente.apellido_asistente + '</td>' +
                        '<td>' + asistente.fch_creacion+ '</td>' +
                        '<td>' + asistente.fch_modificacion + '</td>' +
                        //'<td>' + asistente.nombre_usuario+'  '+ asistente.apellido_usuario + '</td>' +
                        '<td>'+asistente.id_ususario+'</td>'+
                        '<td>' +
                        '<a class="pull-left editar" data-id_asistente="' + asistente.id_asistente + '">'+
                        '<button class="btn btn-success btn-sm" id="editarUsuario" value="editarUsuario">'+
                            '<span class="glyphicon glyphicon-pencil"> Editar</span>'+
                                '</button></a>' +                                
                        '<a class="pull-right eliminar" data-id_asistente="' + asistente.id_asistente + '">'+
                        '<button class="btn btn-danger btn-sm" id="eliminarUsuario" value="eliminarUsuario">'+
                            '<span class="glyphicon glyphicon-remove"> Eliminar</span>'+
                                '</button></a>' +
                        '</td>';
                fila.html(html);
            }
        };
        
        
       /* app.recargarPagina = function(){
            
            $("#btnAlerta").on('click', function(event) {                
            window.location="usuarios.html";
            });
            
        }*/
        
       
        
        app.init();

    })(TallerAvanzada);


});