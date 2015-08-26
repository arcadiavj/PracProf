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
                $("#tituloModal").html("Nuevo Usuario");//Cambio el título del Modal
                $("#modalUsuario").modal({show: true});//lo muestro
                $("#accion").attr("value","guardar");//Cambio el nombre del boton
                $("#guardar").html("Agregar");
                $("#nombreUsuario").removeAttr("disabled");//elimino la propiedad "disabled" que usé para VER
                $("#apellidoUsuario").removeAttr("disabled");
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
                $("#id").val($(this).attr("data-id_usuario"));
                
                $('#fCrea').show();
                $('#fModi').show();
                $('#fUsuario').hide();
                
                $("#mHeader").removeClass();
                $("#mHeader").attr("class","modal-header bg-success");
                $("#nombreUsuario").val($(this).parent().parent().children().first().next().html());
                $("#apellidoUsuario").val($(this).parent().parent().children().first().next().next().html());
                
                $('#txtCreacion').val($(this).parent().parent().children().first().next().next().next().html());
                $('#txtCreacion').attr('disabled', 'true');
                $('#txtModificacion').val($(this).parent().parent().children().first().next().next().next().next().html());
                $('#txtModificacion').attr('disabled', 'true');
                $('#txtUsuario').val($(this).parent().parent().children().first().next().next().next().next().next().html());
                $('#txtUsuario').attr('disabled', 'true');
                
                $("#guardar").html("Modificar");
                $("#accion").attr("value","modificar");
                $("#tituloModal").html("Editar Usuario");
                $("#modalUsuario").modal({show: true});                
                $("#nombreUsuario").removeAttr("disabled");//elimino la propiedad "disabled" que usé para ver
                $("#apellidoUsuario").removeAttr("disabled");
                $("#guardar").show();
                $("#reporDetalle").hide();
                
            });
            
            $("#exampleBody").on('click', '.seleccionar', function(event) {
                event.preventDefault();
                $("#id").val($(this).attr("data-id_usuario"));
                $("#mHeader").removeClass();
                $("#mHeader").attr("class","modal-header bg-info");
                $('#fCrea').show();
                $('#fModi').show();
                $('#fUsuario').show();
                
                $("#nombreUsuario").val($(this).parent().parent().children().first().next().html());
                $("#nombreUsuario").attr('disabled', 'true');
                $("#apellidoUsuario").val($(this).parent().parent().children().first().next().next().html());
                $("#apellidoUsuario").attr('disabled', 'true');
                
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
                $("#modalUsuario").modal({show: true});
            });
            
            $("#exampleBody").on('click', '.eliminar', function() {
                app.eliminarUsuario($(this).attr("data-id_usuario"));
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
            
            
            
            $("#formUsuario").bootstrapValidator({
                excluded: []
            });
        };
        
        app.borrarCampos = function (){
            $("#nombreUsuario").val("").html();
            $("#apellidoUsuario").val("").html();
            $("#formUsuario").bootstrapValidator('resetForm', true);
        }; 
        
        app.guardarUsuarios = function() {
            
            var url = "../../controlador/ruteador/Ruteador.php"; //voy al ruteador a guardar Usuario (tanto para modific como para agregar)
            //data del formulario persona
            $('#txtCreacion').removeAttr('disabled');
            $('#txtModificacion').removeAttr('disabled');
            var data = $("#formUsuario").serialize();//convierto los datos del alumno en un array para enviarlos al ruteados
            $.ajax({
                url: url,//paso la url
                method: 'POST',//método que utilizo
                dataType: 'json',//tipo de datos
                data: data,//el formulario del usuario que estoy pasando
                success: function(datos) {//si todo salió bien 
                    $("#modalUsuario").modal('hide');//oculto el modal
                    app.actualizarDataTableAsistente(datos, $("#id").val());
                    $("#alertaA").show();  
                },
                error: function(data) {//si hay un error lo muestro por pantalla
                    alert(data);//mensaje de error
                }
            });
        };
        
        app.eliminarUsuario = function(id) {
            var confirmacion = confirm("Seguro que Desea Eliminar")
            {
                var url = "../../controlador/ruteador/Ruteador.php?accion=eliminar&nombreFormulario=Usuario&id=" + id; //cambiar url

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
                
            }
            

        };

        app.borrarFilaDataTable = function(id) {
            var fila = $("#exampleBody").find("a[data-id_usuario='" + id + "']").parent().parent().remove();

        };
        
        app.buscarUsuarios = function() {//función que se encarga de realizar la busqueda de los usuarios
            var url = "../../controlador/ruteador/Ruteador.php?accion=buscar&nombreFormulario=Usuario";//paso la dirección del 
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

            $.each(data, function(clave, usuario) {//recorro todos los datos devueltos con el JSon
                
                html += '<tr class="text-warning">' +//agrego cada uno de los datos correspondientes además habilito dos columnas para poder
                //después editar los datos que he recibido
                        '<td><a class="seleccionar" data-id_usuario="' + usuario.id_usuario + '"><button class="seleccionar btn btn-info btn-sm" id="usuarioVer" value="usuarioVer">'+
                            '<span class="glyphicon glyphicon-eye-open left">  Info</span>'+
                                '</button></a></td>' +                        
                        '<td>' + usuario.nombre_usuario + '</td>' +
                        '<td>' + usuario.apellido_usuario + '</td>' +
                        '<td>' + usuario.fch_creacion+ '</td>' +
                        '<td>' + usuario.fch_modificacion + '</td>' +
                        '<td>' + usuario.nombre_usuario+'  '+ usuario.apellido_usuario + '</td>' +
                        '<td>' +
                        '<a class="pull-left editar" data-id_usuario="' + usuario.id_usuario + '">'+
                        '<button class="btn btn-success btn-sm" id="editarUsuario" value="editarUsuario">'+
                            '<span class="glyphicon glyphicon-pencil"> Editar</span>'+
                                '</button></a>' +                                
                        '<a class="pull-right eliminar" data-id_usuario="' + usuario.id_usuario + '">'+
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
        
        
        app.actualizarDataTable= function(usuario, id) {
            if (id == 0) { //si entra acá es porque es agregar
                var html="";
                 html += '<tr class="text-warning">' +
                         ////agrego cada uno de los datos correspondientes además habilito dos columnas para poder
                //después editar los datos que he recibido
                        '<td><a class="seleccionar" data-id_usuario="' + usuario.id_usuario + '"><button class="seleccionar btn btn-info btn-sm" id="usuarioVer" value="usuarioVer">'+
                            '<span class="glyphicon glyphicon-eye-open left">  Info</span>'+
                                '</button></a></td>' +                        
                        '<td>' + usuario.nombre_usuario + '</td>' +
                        '<td>' + usuario.apellido_usuario + '</td>' +
                        '<td>' + usuario.fch_creacion+ '</td>' +
                        '<td>' + usuario.fch_modificacion + '</td>' +
                        //'<td>' + usuario.nombre_usuario+'  '+ usuario.apellido_usuario + '</td>' +
                        '<td>'+usuario.id_ususario+'</td>'+
                        '<td>' +
                        '<a class="pull-left editar" data-id_usuario="' + usuario.id_usuario + '">'+
                        '<button class="btn btn-success btn-sm" id="editarUsuario" value="editarUsuario">'+
                            '<span class="glyphicon glyphicon-pencil"> Editar</span>'+
                                '</button></a>' +                                
                        '<a class="pull-right eliminar" data-id_usuario="' + usuario.id_usuario + '">'+
                        '<button class="btn btn-danger btn-sm" id="eliminarUsuario" value="eliminarUsuario">'+
                            '<span class="glyphicon glyphicon-remove"> Eliminar</span>'+
                                '</button></a>' +
                        '</td>' +
                        '</tr>';
                        
                $("#exampleBody").append(html);
                
            } else {
                //busco la fila
                var html="";
                var fila = $("#exampleBody").find("a[data-id_usuario='" + id + "']").parent().parent();
                  html +='<td><a class="seleccionar" data-id_usuario="' + usuario.id_usuario + '"><button class="seleccionar btn btn-info btn-sm" id="usuarioVer" value="usuarioVer">'+
                            '<span class="glyphicon glyphicon-eye-open left">  Info</span>'+
                                '</button></a></td>' +                        
                        '<td>' + usuario.nombre_usuario + '</td>' +
                        '<td>' + usuario.apellido_usuario + '</td>' +
                        '<td>' + usuario.fch_creacion+ '</td>' +
                        '<td>' + usuario.fch_modificacion + '</td>' +
                        //'<td>' + ausuario.nombre_usuario+'  '+ usuario.apellido_usuario + '</td>' +
                        '<td>'+usuario.id_ususario+'</td>'+
                        '<td>' +
                        '<a class="pull-left editar" data-id_usuario="' + usuario.id_usuario + '">'+
                        '<button class="btn btn-success btn-sm" id="editarUsuario" value="editarUsuario">'+
                            '<span class="glyphicon glyphicon-pencil"> Editar</span>'+
                                '</button></a>' +                                
                        '<a class="pull-right eliminar" data-id_ausuario="' + usuario.id_usuario + '">'+
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