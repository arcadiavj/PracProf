$(function() {

    var TallerAvanzada = {};

    (function(app) {

        app.init = function() {
            $("#reporDetalle").hide();
            $("#cerrarSesion").on('click', function(event) {
                document.location.href="../../CerrarSesion.php";
                event.preventDefault();
            });
            app.buscarAlumnos();  
            app.bindings();
            
        };
        
        app.bindings = function() {

            $("#agregar").on('click', function(event) {
                event.preventDefault();
                app.borrarCampos();
                $("#id").val(0);
                $("#tituloModal").html("Nuevo Alumno");
                $("#modalAlumno").modal({show: true});
                $("#guardar").attr("value","Agregar");
                $("#guardar").html("Agregar");
                $("#nombre").removeAttr("disabled");//elimino la propiedad "disabled" que usé para VER
                $("#apellido").removeAttr("disabled");
                $("#legajo").removeAttr("disabled");
                $("#calle").removeAttr("disabled");
                $("#numero").removeAttr("disabled");
                $("#guardar").show();
                $("#reporDetalle").hide();
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

                $("#id").val($(this).attr("data-id_alumno"));

                $("#nombre").val($(this).parent().parent().children().first().next().html());
                $("#apellido").val($(this).parent().parent().children().first().next().next().html());
                $("#legajo").val($(this).parent().parent().children().first().next().next().next().html());
                $("#calle").val($(this).parent().parent().children().first().next().next().next().next().html());
                $("#numero").val($(this).parent().parent().children().first().next().next().next().next().next().html());
                $("#guardar").html("Modificar");
                $("#guardar").attr("value","Modificar");
                $("#tituloModal").html("Editar Alumno");
                $("#modalAlumno").modal({show: true});
                
                $("#nombre").removeAttr("disabled");//elimino la propiedad "disabled" que usé para ver
                $("#apellido").removeAttr("disabled");
                $("#legajo").removeAttr("disabled");
                $("#calle").removeAttr("disabled");
                $("#numero").removeAttr("disabled");
                $("#guardar").show();
                $("#reporDetalle").hide();
                
            });
            
            $("#exampleBody").on('click', '.seleccionar', function(event) {

                $("#id").val($(this).attr("data-id_alumno"));

                $("#nombre").val($(this).parent().parent().children().first().next().html());
                $("#nombre").attr('disabled', 'true');
                $("#apellido").val($(this).parent().parent().children().first().next().next().html());
                $("#apellido").attr('disabled', 'true');
                $("#legajo").val($(this).parent().parent().children().first().next().next().next().html());
                $("#legajo").attr('disabled', 'true');
                $("#calle").val($(this).parent().parent().children().first().next().next().next().next().html());
                $("#calle").attr('disabled', 'true');
                $("#numero").val($(this).parent().parent().children().first().next().next().next().next().next().html());
                $("#numero").attr('disabled', 'true');
                $("#guardar").hide();
                $("#reporDetalle").show();
                //$("#guardar").html("Modificar");
                //$("#guardar").attr("value","Modificar");
                $("#tituloModal").html("Detalles Alumno");
                $("#modalAlumno").modal({show: true});
            });
            
            $("#exampleBody").on('click', '.eliminar', function() {
                app.eliminarAlumno($(this).attr("data-id_alumno"));
            });
            
            $("#cancelar").on("click", function(event) {
                event.preventDefault();
                app.borrarCampos();
                $("#modalAlumno").modal('hide');
            });

            $("#guardar").on("click", function(event) {
                event.preventDefault();
                app.guardarAlumno();
            });
            
            
            
            $("#formAlumno").bootstrapValidator({
                excluded: []
            });
        };
        
        app.borrarCampos = function (){
            $("#nombre").val("").html();
            $("#apellido").val("").html();
            $("#legajo").val("").html();
            $("#calle").val("").html();
            $("#numero").val("").html();
            $("#formAlumno").bootstrapValidator('resetForm', true);
        }; 
        
        app.guardarAlumno = function() {
            
            var url = "../../controlador/ruteador/Ruteador.php"; //voy al ruteador a guardar alumno (tanto para modific como para agregar)
            //data del formulario persona
            var data = $("#formAlumno").serialize();
            $.ajax({
                url: url,
                method: 'POST',
                dataType: 'json',
                data: data,
                success: function(datos) {
                    $("#modalAlumno").modal('hide');
                    app.actualizarDataTable(datos, $("#id").val());
                },
                error: function(data) {
                    alert(data);
                }
            });
        };
        app.eliminarAlumno = function(id) {

            var url = "../../controlador/ruteador/Ruteador.php?accion=eliminar&nombreFormulario=Alumno&id=" + id; //cambiar url

            $.ajax({
                url: url,
                method: "GET",
                dataType: 'json',
                success: function(data) {
                    app.borrarFilaDataTable(id);
                },
                error: function(data) {
                    alert('error');
                }
            });

        };

        app.borrarFilaDataTable = function(id) {
            var fila = $("#exampleBody").find("a[data-id_alumno='" + id + "']").parent().parent().remove();

        };
        
        app.buscarAlumnos = function() {

            var url = "../../controlador/ruteador/Ruteador.php?accion=buscar&nombreFormulario=Alumno";

            $.ajax({
                url: url,
                method: 'GET',
                dataType: 'json',
                success: function(data) {
                    app.rellenarDataTable(data);
                },
                error: function() {
                    alert('error');
                }

            });
        };

        
        app.actualizarDataTable = function(alumno, id) {
            if (id == 0) { //si entra acá es porque es agregar
                var html = '<tr>' +
                        '<td><a class="center-block seleccionar" data-id_alumno="' + alumno.id + '"><span class="glyphicon glyphicon-eye-open"></span>Ver</a></td>' +
                        '<td>' + alumno.nombre + '</td>' +
                        '<td>' + alumno.apellido + '</td>' +
                        '<td>' + alumno.legajo + '</td>' +
                        '<td>' + alumno.calle + '</td>' +
                        '<td>' + alumno.numero + '</td>' +
                        '<td>' +
                        '<a class="pull-left editar" data-id_alumno="' + alumno.id + '"><span class="glyphicon glyphicon-pencil"></span>Editar</a>' +
                        '<a class="pull-right eliminar" data-id_alumno="' + alumno.id + '"><span class="glyphicon glyphicon-remove"></span>Eliminar</a>' +
                        '</td>' +
                        '</tr>';
                $("#exampleBody").append(html);
                
            } else {
                //busco la fila
                var fila = $("#exampleBody").find("a[data-id_alumno='" + id + "']").parent().parent();
                var html = '<td>' + 
                        '<a class="center-block seleccionar" data-id_alumno="' + alumno.id + '"><span class="glyphicon glyphicon-eye-open"></span>Ver</a></td>' +
                        '<td>' + alumno.nombre + '</td>' +
                        '<td>' + alumno.apellido + '</td>' +
                        '<td>' + alumno.legajo + '</td>' +
                        '<td>' + alumno.calle + '</td>' +
                        '<td>' + alumno.numero + '</td>' +
                        '<td>' +
                        '<a class="pull-left editar" data-id_alumno="' + alumno.id + '"><span class="glyphicon glyphicon-pencil"></span>Editar</a>' +
                        '<a class="pull-right eliminar" data-id_alumno="' + alumno.id + '"><span class="glyphicon glyphicon-remove"></span>Eliminar</a>' +
                        '</td>';
                fila.html(html);
            }
        };
        
        
        
        
        
        app.rellenarDataTable = function(data) {
            var html = "";

            $.each(data, function(clave, persona) {
                html += '<tr>' +
                        '<td><a class="center-block seleccionar" data-id_alumno="' + persona.id + '"><span class="glyphicon glyphicon-eye-open">Ver</span></a></td>' +
                        '<td>' + persona.nombre + '</td>' +
                        '<td>' + persona.apellido + '</td>' +
                        '<td>' + persona.legajo + '</td>' +
                        '<td>' + persona.calle + '</td>' +
                        '<td>' + persona.numero + '</td>' +
                        '<td>' +
                        '<a class="pull-left editar" data-id_alumno="' + persona.id + '"><span class="glyphicon glyphicon-pencil"></span>Editar</a>' +
                        '<a class="pull-right eliminar" data-id_alumno="' + persona.id + '"><span class="glyphicon glyphicon-remove"></span>Eliminar</a>' +
                        '</td>' +
                        '</tr>';
            });
            $("#exampleBody").html(html);
            $("#example").dataTable({       //transforma la tabla en dataTable
                "sPagiationType":"full_numbers", //activa la paginación con números
                "language":{ //cambia el lenguaje de la dataTable
                    "url":"../js/dataTable-es.json" //este es el archivo json del lenguaje español
                }
            });
        };
        
        app.init();

    })(TallerAvanzada);


});
