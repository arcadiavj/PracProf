$(function() {
    var TallerAvanzada = {};
    (function(app) {
        app.init = function() {
            app.verificarSesion();
        };
        app.bindings = function() {
            $("#divTablaClientes").hide();
            app.cargarComboAno();
            $("#agregar").on('click', function(event) {
                event.preventDefault();
                $("#id").val(0);
                $("#tituloModal").html("Nuevo Caso");
                $("#modalCaso").modal({show: true});
                $("#guardar").attr("value","Agregar");
                $("#guardar").html("Agregar");
                $("#anoAcc").removeAttr("disabled");
                $("#mesAcc").removeAttr("disabled");
                $("#diaAcc").removeAttr("disabled");
                $("#salario").removeAttr("disabled");
                $("#fotocopiaDNI").removeAttr("disabled");
                $("#firmaPacto").removeAttr("disabled");
                $("#firmaPoder").removeAttr("disabled");
                $("#guardar").show();
                $("#reporDetalle").hide();
            });
            
            $("#selecCliente").on('click', function() {
                $("#divTablaClientes").toggle();
            });
            $("#cuerpoTablaClientes").on('click', '.seleccionar', function(event) {
                var cliente = $(this).parent().parent().children().first().next().html() + ', ' + 
                        $(this).parent().parent().children().first().next().next().html();
                $("#idCliente").val($(this).attr("data-id_cliente"));
                $("#nombreCliente").val(cliente);
                $("#divTablaClientes").hide();
            });
            
            $("#tablaCasos").on('click', '.eliminar', function() {
                app.eliminarCaso($(this).attr("data-id_caso"));
            });
            
            $("#anoAcc").on('click', function(event) {
                app.cargarComboMeses();
                app.cargarComboDias();
            });
            
            $("#mesAcc").on('click', function(event) {
                var m = $("#mesAcc").val();
                var mes = parseInt(m);
                switch (mes) {
                    case 1:
                        //días debe estar entre 1 y 31
                        app.cargarComboDias(31);
                    break;

                    case 2: 
                        //días debe estar entre 1 y 28-29
                        var an = $("#anoAcc").val();
                        var anyo = parseInt(an);
                        if ((((anyo%100)!=0)&&((anyo%4)==0))||((anyo%400)==0)){
                             app.cargarComboDias(29);
                        }else{
                            app.cargarComboDias(28);
                        }
                    break;
                    case 3:
                        //días debe estar entre 1 y 31
                        app.cargarComboDias(31);
                    break;

                    case 4: 
                        //días debe estar entre 1 y 30
                        app.cargarComboDias(30);
                    break;
                    case 5:
                        //días debe estar entre 1 y 31
                        app.cargarComboDias(31);
                    break;

                    case 6: 
                        //días debe estar entre 1 y 30
                        app.cargarComboDias(30);
                    break;
                    case 7:
                        //días debe estar entre 1 y 31
                        app.cargarComboDias(31);
                    break;

                    case 8: 
                        //días debe estar entre 1 y 31
                        app.cargarComboDias(31);
                    break;
                    case 9:
                        //días debe estar entre 1 y 30
                        app.cargarComboDias(30);
                    break;

                    case 10: 
                        //días debe estar entre 1 y 31
                        app.cargarComboDias(31);
                    break;
                    case 11:
                        //días debe estar entre 1 y 30
                        app.cargarComboDias(30);
                    break;

                    case 12: 
                        //días debe estar entre 1 y 31
                        app.cargarComboDias(31);
                    break;
                }      
            });
            $("#cuerpoTablaCasos").on('click', '.editar', function(event) {
                $("#id_caso").val($(this).attr("data-id_caso"));
                app.editarCaso();
                
                
                app.cargarComboAno();
                app.cargarComboArt();
                app.cargarComboAsistente();
                app.cargarComboMeses();
                app.cargarComboProfesional();
                //ape nom dni, art, asist, fecha, in itin, poder, desccrip, profes, 
                var fechaStr = ($(this).parent().parent().children().first().next().next().next().next().next().next().html());
                var fechaArray = fechaStr.split("-");
                var cArt = $(this).parent().parent().children().first().next().next().next().next().html();
                var cAsist =$(this).parent().parent().children().first().next().next().next().next().next().html();
                var cProf = $(this).parent().parent().children().first().next().next().next().next().next().next().next().next().next().next().html();
                var nomCliente = $(this).parent().parent().children().first().next().html() + ", " + $(this).parent().parent().children().first().next().next().html();
                alert("Art: " + cArt + ". \nAsist: " + cAsist + ". \nProf: " + cProf);
                var inIti = $(this).parent().parent().children().first().next().next().next().next().next().next().next().html();
                var poder = $(this).parent().parent().children().first().next().next().next().next().next().next().next().next().html();
                $("#comboArt option").each(function() { this.selected = (this.text == cArt); });
                if (inIti == "SI") {
                    $("#inItinere").attr('checked', true);
                }else{
                    $("#inItinere").attr('checked', false);
                }
                $("#comboAsistente option").each(function() { this.selected = (this.text == cAsist); });
                $("#comboProfesional option").each(function() { this.selected = (this.text == cProf); });
                $("#nombreCliente").val(nomCliente);
                
                
                $("#anoAcc option").each(function() { this.selected = (this.text == fechaArray[0]); });
                $("#mesAcc option").each(function() { 
                    switch (fechaArray[1]) {
                    case "01":
                        //días debe estar entre 1 y 31
                        app.cargarComboDias(31);
                        this.selected = (this.text == "Enero");
                    break;
                    case "02":
                        //días debe estar entre 1 y 28 ó 29
                        var an = $("#anoAcc").val();
                        var anyo = parseInt(an);
                        if ((((anyo%100)!=0)&&((anyo%4)==0))||((anyo%400)==0)){
                             app.cargarComboDias(29);
                        }else{
                            app.cargarComboDias(28);
                        }
                        this.selected = (this.text == "Febrero");
                    break;
                    case "03":
                        //días debe estar entre 1 y 31
                        app.cargarComboDias(31);
                        this.selected = (this.text == "Marzo");
                    break;
                    case "04":
                        //días debe estar entre 1 y 30
                        app.cargarComboDias(30);
                        this.selected = (this.text == "Abril");
                    break;
                    case "05":
                        //días debe estar entre 1 y 31
                        app.cargarComboDias(31);
                        this.selected = (this.text == "Mayo");
                    break;
                    case "06":
                        //días debe estar entre 1 y 30
                        app.cargarComboDias(30);
                        this.selected = (this.text == "Junio");
                    break;
                    case "07":
                        //días debe estar entre 1 y 31
                        app.cargarComboDias(31);
                        this.selected = (this.text == "Julio");
                    break;
                    case "08":
                        //días debe estar entre 1 y 31
                        app.cargarComboDias(31);
                        this.selected = (this.text == "Agosto");
                    break;
                    case "09":
                        //días debe estar entre 1 y 30
                        app.cargarComboDias(30);
                        this.selected = (this.text == "Septiembre");
                    break;
                    case "10":
                        //días debe estar entre 1 y 31
                        app.cargarComboDias(31);
                        this.selected = (this.text == "Octubre");
                    break;
                    case "11":
                        //días debe estar entre 1 y 30
                        app.cargarComboDias(30);
                        this.selected = (this.text == "Noviembre");
                    break;
                    case "12":
                        //días debe estar entre 1 y 31
                        app.cargarComboDias(31);
                        this.selected = (this.text == "Diciembre");
                    break;
                    }
                });
                $("#diaAcc option").each(function() { this.selected = (this.text == fechaArray[2]); });
                
//              $("#salario")
//                if (true) {
//                    $("#fotocopiaDNI").attr('checked', true);
//                }else{
//                    $("#fotocopiaDNI").attr('checked', false);
//                }
//                if (true) {
//                    $("#firmaPacto").attr('checked', true);
//                }else{
//                    $("#firmaPacto").attr('checked', false);
//                }
                if (poder == "SI") {
                    $("#firmaPoder").attr('checked', true);
                }else{
                    $("#firmaPoder").attr('checked', false);
                }
                //$("#estado").val($(this).parent().parent().children().first().next().next().next().next().next().html());
                //$("#etapa").val($(this).parent().parent().children().first().next().next().next().next().next().html());
                $("#descripcion").val($(this).parent().parent().children().first().next().next().next().next().next().next().next().next().next().html());
                
                
                
                
//                var fechaStr = ($(this).parent().parent().children().first().next().next().next().next().next().html());
//                var fechaArray = fechaStr.split("-");
//                //alert("Año:" + fechaArray[0] + "\nMes: " + fechaArray[1] + "\nDía: " + fechaArray[2]);
//                app.cargarComboAno();
//                $("#anoAcc option").each(function() { this.selected = (this.text == fechaArray[0]); });
//                app.cargarComboMeses();
//                $("#mesAcc option").each(function() { 
//                    switch (fechaArray[1]) {
//                    case "01":
//                        //días debe estar entre 1 y 31
//                        app.cargarComboDias(31);
//                        this.selected = (this.text == "Enero");
//                    break;
//                    case "02":
//                        //días debe estar entre 1 y 28 ó 29
//                        var an = $("#anoAcc").val();
//                        var anyo = parseInt(an);
//                        if ((((anyo%100)!=0)&&((anyo%4)==0))||((anyo%400)==0)){
//                             app.cargarComboDias(29);
//                        }else{
//                            app.cargarComboDias(28);
//                        }
//                        this.selected = (this.text == "Febrero");
//                    break;
//                    case "03":
//                        //días debe estar entre 1 y 31
//                        app.cargarComboDias(31);
//                        this.selected = (this.text == "Marzo");
//                    break;
//                    case "04":
//                        //días debe estar entre 1 y 30
//                        app.cargarComboDias(30);
//                        this.selected = (this.text == "Abril");
//                    break;
//                    case "05":
//                        //días debe estar entre 1 y 31
//                        app.cargarComboDias(31);
//                        this.selected = (this.text == "Mayo");
//                    break;
//                    case "06":
//                        //días debe estar entre 1 y 30
//                        app.cargarComboDias(30);
//                        this.selected = (this.text == "Junio");
//                    break;
//                    case "07":
//                        //días debe estar entre 1 y 31
//                        app.cargarComboDias(31);
//                        this.selected = (this.text == "Julio");
//                    break;
//                    case "08":
//                        //días debe estar entre 1 y 31
//                        app.cargarComboDias(31);
//                        this.selected = (this.text == "Agosto");
//                    break;
//                    case "09":
//                        //días debe estar entre 1 y 30
//                        app.cargarComboDias(30);
//                        this.selected = (this.text == "Septiembre");
//                    break;
//                    case "10":
//                        //días debe estar entre 1 y 31
//                        app.cargarComboDias(31);
//                        this.selected = (this.text == "Octubre");
//                    break;
//                    case "11":
//                        //días debe estar entre 1 y 30
//                        app.cargarComboDias(30);
//                        this.selected = (this.text == "Noviembre");
//                    break;
//                    case "12":
//                        //días debe estar entre 1 y 31
//                        app.cargarComboDias(31);
//                        this.selected = (this.text == "Diciembre");
//                    break;
//                    }
//                });
//                
//                $("#diaAcc option").each(function() { this.selected = (this.text == fechaArray[2] || (this.text) == fechaArray[2]); }); 
//                $("#masTelefonos").hide();
                $("#guardar").attr("value","Modificar");
                $("#guardar").html("Modificar");
                $("#tituloModal").html("Editar Caso");
                $("#modalCaso").modal({show: true});
//                
//                $("#nombre").removeAttr("disabled");//elimino la propiedad "disabled" que usé para ver
//                $("#apellido").removeAttr("disabled");
//                $("#dni").removeAttr("disabled");
//                $("#direccion").removeAttr("disabled");
//                $("#anoAcc").removeAttr("disabled");
//                $("#mesAcc").removeAttr("disabled");
//                $("#diaAcc").removeAttr("disabled");
                $("#guardar").show();
                $("#reporDetalle").hide();
                //app.traerTelefonos();
            });
            
            
        };
        app.editarCaso = function (){
            var url = "../../controlador/ruteador/Ruteador.php?accion=buscar&nombreFormulario=Art";
            $.ajax({
                url: url,
                method: 'GET',
                dataType: 'json',
                success: function(data) {
                    app.rellenarComboArt(data);
                },
                error: function() {
                    alert('error');
                }
            });
        }
        app.cargarComboMeses= function () {
            $("#mesAcc").html("<option value=\"0\">Mes</option>");
            $("#mesAcc").append("<option value=\"1\">Enero</option>");
            $("#mesAcc").append("<option value=\"2\">Febrero</option>");
            $("#mesAcc").append("<option value=\"3\">Marzo</option>");
            $("#mesAcc").append("<option value=\"4\">Abril</option>");
            $("#mesAcc").append("<option value=\"5\">Mayo</option>");
            $("#mesAcc").append("<option value=\"6\">Junio</option>");
            $("#mesAcc").append("<option value=\"7\">Julio</option>");
            $("#mesAcc").append("<option value=\"8\">Agosto</option>");
            $("#mesAcc").append("<option value=\"9\">Septiembre</option>");
            $("#mesAcc").append("<option value=\"10\">Octubre</option>");
            $("#mesAcc").append("<option value=\"11\">Noviembre</option>");
            $("#mesAcc").append("<option value=\"12\">Diciembre</option>");
        };
        app.cargarComboDias = function (dias) {
            $("#diaAcc").html("<option value=\"0\">D&iacute;a</option>");
            for (var i = 1, max = dias; i <= max; i++) {
                if (i>=1 && i <=9) {
                    $("#diaAcc").append("<option value=\"0"+ i +"\">0" + i + "</option>");
                }else{
                    $("#diaAcc").append("<option value=\""+ i +"\">" + i + "</option>");
                }    
            }
        };
        app.cargarComboAno = function (){
            $("#anoAcc").html("<option value=\"0\">Año</option>");
            var today = new Date();
                var yyyy = today.getFullYear(); 
                for (var i = yyyy, min = 1900; i >= min; i--) {
                    $("#anoAcc").append("<option value=\""+ i +"\">" + i + "</option>");
                }
        };
        app.cargarComboArt = function () {
            var url = "../../controlador/ruteador/Ruteador.php?accion=buscar&nombreFormulario=Art";
            $.ajax({
                url: url,
                method: 'GET',
                dataType: 'json',
                success: function(data) {
                    app.rellenarComboArt(data);
                },
                error: function() {
                    alert('error');
                }
            });
        };
        app.cargarComboAsistente = function () {
            var url = "../../controlador/ruteador/Ruteador.php?accion=buscar&nombreFormulario=Asistente";
            $.ajax({
                url: url,
                method: 'GET',
                dataType: 'json',
                success: function(data) {
                    app.rellenarComboAsistente(data);
                },
                error: function() {
                    alert('error al intentar cargar asistentes');
                }
            });
        };
        app.cargarComboProfesional = function () {
            var url = "../../controlador/ruteador/Ruteador.php?accion=buscar&nombreFormulario=Profesional";
            $.ajax({
                url: url,
                method: 'GET',
                dataType: 'json',
                success: function(data) {
                    app.rellenarComboProfesional(data);
                },
                error: function() {
                    alert('error al intentar cargar profesionales');
                }
            });
        };
        app.eliminarCaso = function(id) {
            var rta = confirm("Se va a eliminar el CASO seleccionado. Esta seguro?");
            if (rta) {
                var url = "../../controlador/ruteador/Ruteador.php?accion=eliminar&nombreFormulario=Caso&id=" + id; 
                $.ajax({
                    url: url,
                    method: "GET",
                    dataType: 'json',
                    success: function(data) {
                        app.borrarFilaDataTable(id);
                    },
                    error: function(data) {
                        alert('error en app.eliminarCaso');
                    }
                });
            }
        };
        app.rellenarComboArt = function(data){
            $("#comboArt").html("<option value=\"0\">ART</option>");
            $.each(data, function(clave, art) {
                $("#comboArt").append("<option value=\"" + art.id_art + "\">"+ art.nombre_art +"</option>");
            });
        };
        app.rellenarComboAsistente = function(data){
            $("#comboAsistente").html("<option value=\"0\">Asistente</option>");
            $.each(data, function(clave, asistente) {
                $("#comboAsistente").append("<option value=\"" + asistente.id_asistente + "\">"+ asistente.apellido_asistente + ", " + asistente.nombre_asistente +"</option>");
            });
        };
        app.rellenarComboProfesional = function(data){
            $("#comboProfesional").html("<option value=\"0\">Profesional</option>");
            $.each(data, function(clave, profesional) {
                $("#comboProfesional").append("<option value=\"" + profesional.id_profesional + "\">"+ profesional.apellido_profesional + ", " + profesional.nombre_profesional +"</option>");
            });
        };
        app.borrarCampos = function (){
            $("#comboArts").html("ART");
            $("#comboAsistente").html("Asistente");
            $("#comboProfesional").html("Profesional");
            $("#inItinere").attr("checked", false);
            $("#idCliente").val("").html();
            $("#nombreCliente").val("").html();
            $("#anoAcc").html("Año");
            $("#mesAcc").html("Mes");
            $("#diaAcc").html("Día");
            app.cargarComboAno();
            app.cargarComboArt();
            app.cargarComboAsistente();
            app.cargarComboProfesional();
            $("#salario").val("").html();
            $("#fotocopiaDNI").attr("checked", false);
            $("#firmaPacto").attr("checked", false);
            $("#firmaPoder").attr("checked", false);
            $("#estado").val("").html();
            $("#etapa").val("").html();
            $("#descripcion").val("").html();
            $("#formCliente").bootstrapValidator('resetForm', true);
        }; 
        $("#reporteCliente").on('click', function(event) {
            event.preventDefault();
            window.open('reporteClientes.php', '_blank'); //cambiar por Cliente, hacer el reporte de clientes
        });
        $("#reporDetalle").on('click', function(event) {
            event.preventDefault();
            var idAl = $("#id").val();
            window.open('reporteDetalleCliente.php?id=' + idAl,  '_blank'); //cambiar por Cliente, hacer el reporte de clientes
        });
        $("#cancelar").on("click", function(event) {
            event.preventDefault();
            app.borrarCampos();
            $("#modalCaso").modal('hide');
        });
        $("#guardar").on("click", function(event) {
            event.preventDefault();
            //app.guardarAlumno();
        });
        $("#formCliente").bootstrapValidator({
            excluded: []
        });

        app.borrarFilaDataTable = function(id) {
            var fila = $("#cuerpoTablaCasos").find("a[data-id_caso='" + id + "']").parent().parent().remove();

        };
        
        app.buscarCasos = function() {

            var url = "../../controlador/ruteador/Ruteador.php?accion=buscar&nombreFormulario=Caso";

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
        
        app.buscarClientes = function() {

            var url = "../../controlador/ruteador/Ruteador.php?accion=buscar&nombreFormulario=Cliente";

            $.ajax({
                url: url,
                method: 'GET',
                dataType: 'json',
                success: function(data) {
                    app.rellenarDataTableClientes(data);
                },
                error: function() {
                    alert('error al intentar buscar clientes');
                }

            });
        };
//
//        
//        app.actualizarDataTable = function(cliente, id) {
//            if (id == 0) { //si entra acá es porque es agregar
//                var html = '<tr>' +
//                        '<td><a class="center-block seleccionar" data-id_cliente="' + cliente.id + '"><span class="glyphicon glyphicon-eye-open"></span>Ver</a></td>' +
//                        '<td>' + cliente.apellido + '</td>' +
//                        '<td>' + cliente.nombre + '</td>' +
//                        '<td>' + cliente.direccion + '</td>' +
//                        '<td>' + cliente.art + '</td>' +
//                        '<td>' + cliente.asistente + '</td>' +
//                        '<td>' +
//                        '<a class="pull-left editar" data-id_cliente="' + cliente.id + '"><span class="glyphicon glyphicon-pencil"></span>Editar</a>' +
//                        '<a class="pull-right eliminar" data-id_cliente="' + cliente.id + '"><span class="glyphicon glyphicon-remove"></span>Eliminar</a>' +
//                        '</td>' +
//                        '</tr>';
//                $("#cuerpoTablaClientes").append(html);
//                
//            } else {
//                //busco la fila
//                var fila = $("#cuerpoTablaClientes").find("a[data-id_cliente='" + id + "']").parent().parent();
//                var html = '<td>' + 
//                        '<a class="center-block seleccionar" data-id_cliente="' + cliente.id + '"><span class="glyphicon glyphicon-eye-open"></span>Ver</a></td>' +
//                        '<td>' + cliente.apellido + '</td>' +
//                        '<td>' + cliente.nombre + '</td>' +
//                        '<td>' + cliente.direccion + '</td>' +
//                        '<td>' + cliente.art + '</td>' +
//                        '<td>' + cliente.asistente + '</td>' +
//                        '<td>' +
//                        '<a class="pull-left editar" data-id_cliente="' + cliente.id + '"><span class="glyphicon glyphicon-pencil"></span>Editar</a>' +
//                        '<a class="pull-right eliminar" data-id_cliente="' + cliente.id + '"><span class="glyphicon glyphicon-remove"></span>Eliminar</a>' +
//                        '</td>';
//                fila.html(html);
//            }
//        };
//        
//        
//        
//        
//        
        app.rellenarDataTable = function(data) {
            var html = "";

            $.each(data, function(clave, caso) {
                html += '<tr>' +
                        '<td><a class="center-block seleccionar" data-id_caso="' + caso.id_caso + '"><span class="glyphicon glyphicon-eye-open">Ver</span></a></td>' +
                        '<td>' + caso.apellido_cliente + '</td>' +
                        '<td>' + caso.nombre_cliente + '</td>' +
                        '<td>' + caso.dni_cliente + '</td>' +
                        '<td>' + caso.nombre_art + '</td>' +
                        '<td>' + caso.apellido_asistente + ', ' + caso.nombre_asistente + '</td>' +
                        '<td>' + caso.fechaAccidente_caso + '</td>'; 
                        if (caso.inItinere_caso == 1) {
                            html += '<td>SI</td>'; 
                        }else{
                            html += '<td>NO</td>'; 
                        }
                        if (caso.firmaPoder_caso == 1) {
                            html += '<td>SI</td>'; 
                        }else{
                            html += '<td>NO</td>'; 
                        }
                        html += '<td>' + caso.descripcion_caso + '</td>' +
                        '<td>' + caso.apellido_profesional + ', ' + caso.nombre_profesional + '</td>' +
                        '<td>' +
                        '<a class="pull-left editar" data-id_caso="' + caso.id_caso + '"><span class="glyphicon glyphicon-pencil"></span>Editar</a>' +
                        '<a class="pull-right eliminar" data-id_caso="' + caso.id_caso + '"><span class="glyphicon glyphicon-remove"></span>Eliminar</a>' +
                        '</td>' +
                        '</tr>';
            });
            $("#cuerpoTablaCasos").html(html);
            $("#tablaCasos").dataTable({       //transforma la tabla en dataTable
                "sPagiationType":"full_numbers", //activa la paginación con números
                "language":{ //cambia el lenguaje de la dataTable
                    "url":"../js/dataTable-es.json" //este es el archivo json del lenguaje español
                }
            });
        };
        
        app.rellenarDataTableClientes = function(data) {
            var html = "";

            $.each(data, function(clave, cliente) {
                html += '<tr>' +
                        '<td><a class="center-block seleccionar" data-id_cliente="' + cliente.id_cliente + '"><span class="glyphicon glyphicon-eye-open">Seleccionar</span></a></td>' +
                        '<td>' + cliente.apellido_cliente + '</td>' +
                        '<td>' + cliente.nombre_cliente + '</td>' +
                        '<td>' + cliente.dni_cliente + '</td>' +
                        '</tr>';
            });
            $("#cuerpoTablaClientes").html(html);
            $("#tablaClientes").dataTable({       //transforma la tabla en dataTable
                "sPagiationType":"full_numbers", //activa la paginación con números
                "language":{ //cambia el lenguaje de la dataTable
                    "url":"../js/dataTable-es.json" //este es el archivo json del lenguaje español
                }
            });
        };
        
        app.verificarSesion = function(){
            var url = "../../controlador/ruteador/Sesion.php"; 
            $.ajax({
                url: url,
                method: 'POST',
                dataType: 'json',
                success: function(datos) {
                    if (typeof datos['id_usuario'] != 'undefined') {
                        $("#id_user").val(datos.id_usuario);
                        app.cargarComboArt();
                        app.cargarComboAsistente();
                        app.cargarComboProfesional();
                        app.buscarCasos();
                        app.buscarClientes();
                        app.bindings(); 
                    }else{
                        location.href = "../../index.html";
                    }
                },
                error: function(data) {
                    location.href = "../../index.html";
                } 
            });  
        };
        app.init();
    })(TallerAvanzada);
});