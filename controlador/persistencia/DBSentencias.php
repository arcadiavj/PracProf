<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 *
 * @author Flaco
 */
interface DBSentencias {
    const CHECK_USER = "SELECT * FROM usuario WHERE usuario_usuario = ?";
    const BUSCAR_CLIENTES = "SELECT * FROM cliente WHERE fch_baja = '0000-00-00 00:00:00'";
    const BUSCAR_ARTS = "SELECT * FROM art WHERE fch_baja = '0000-00-00 00:00:00'";
    const BUSCAR_ASISTENTES = "SELECT * FROM asistente WHERE fch_baja = '0000-00-00 00:00:00'";
    const BUSCAR_PROFESIONALES = "SELECT * FROM profesional WHERE fch_baja = '0000-00-00 00:00:00'";
    const BUSCAR_CASOS = "SELECT * FROM caso INNER JOIN cliente ON caso.id_cliente = cliente.id_cliente INNER JOIN 
        profesional ON caso.id_profesional = profesional.id_profesional INNER JOIN asistente ON caso.id_asistente 
        = asistente.id_asistente INNER JOIN art ON caso.id_art = art.id_art WHERE caso.fch_baja = '0000-00-00 00:00:00' 
        AND cliente.fch_baja = '0000-00-00 00:00:00'";
    const BUSCAR_UN_CASO = "SELECT * FROM caso INNER JOIN cliente ON caso.id_cliente = cliente.id_cliente INNER JOIN 
        profesional ON caso.id_profesional = profesional.id_profesional INNER JOIN asistente ON caso.id_asistente 
        = asistente.id_asistente INNER JOIN art ON caso.id_art = art.id_art WHERE caso.fch_baja = '0000-00-00 00:00:00' 
        AND cliente.fch_baja = '0000-00-00 00:00:00' AND caso.id_caso = ?";
    
    const ELIMINAR_CASO = "UPDATE caso SET fch_baja = ? WHERE id_caso = ?";
    const ELIMINAR_CLIENTE = "UPDATE cliente SET fch_baja = ? WHERE id_cliente = ?";
    const INSERTAR_CLIENTE = "INSERT INTO cliente(nombre_cliente, apellido_cliente, dni_cliente, direccion_cliente, 
        fecha_nacimiento_cliente, id_usuario, fch_creacion) VALUES(?,?,?,?,?,?,?)";
    const BUSCAR_UN_CLIENTE = "SELECT * FROM cliente WHERE fch_baja = '0000-00-00 00:00:00' AND id_cliente = ?"; 
    const BUSCAR_TELEFONOS_DE_UN_CLIENTE = "SELECT * FROM telefono WHERE fch_baja = '0000-00-00 00:00:00' AND id_cliente = ?";
    const ULTIMO_CLIENTE = "SELECT MAX(id_cliente) FROM cliente";
    const ACTUALIZAR_UN_CLIENTE = "UPDATE cliente SET nombre_cliente = ?, apellido_cliente = ?, dni_cliente = ?, direccion_cliente = ?, fecha_nacimiento_cliente = ?, id_usuario = ?, fch_modificacion = ? WHERE id_cliente = ?";
    const INSERTAR_TELEFONO = "INSERT INTO telefono(numero_telefono, propietario_telefono, detalle_telefono, id_cliente, 
        id_usuario, fch_creacion) VALUES(?,?,?,?,?,?)";
    const ACTUALIZAR_TELEFONO = "UPDATE telefono SET numero_telefono = ?, propietario_telefono = ?, detalle_telefono = ?,id_cliente = ?, id_usuario = ?, fch_modificacion = ? WHERE id_telefono = ?";
    
    const BUSCAR_NOMBRE_USUARIO = "SELECT * FROM usuario WHERE fch_baja = '0000-00-00 00:00:00' AND id_usuario = ?";
    
//    const INSERTAR_PERSONA = "INSERT INTO persona(nombre, apellido, titulo, legajo, tipo, FK_domicilio) VALUES(?,?,?,?,?,?)";
//    
//    const ELIMINAR_PERSONA = "DELETE FROM persona WHERE id = ?";
//    
//    //con inner join
//    //const ELIMINAR_PERSONA_Y_DOMICILIO = "DELETE persona , domicilio  FROM persona  INNER JOIN domicilio WHERE persona.FK_domicilio= domicilio.id and persona.id = ?";
//    //probar
//    
//    const ACTUALIZAR_PERSONA = "UPDATE persona SET nombre = ?, apellido = ?, titulo = ?, legajo = ?, tipo = ? WHERE id = ?";
//    const BUSCAR_ALUMNOS = "SELECT nombre, apellido, legajo, calle, numero, persona.id FROM persona INNER JOIN domicilio ON persona.FK_domicilio = domicilio.id WHERE persona.tipo = 'A'";
//    const BUSCAR_ALUMNO_POR_CALLE = "SELECT nombre, apellido, legajo, calle, numero, persona.id FROM persona INNER JOIN domicilio ON persona.FK_domicilio = domicilio.id WHERE tipo = 'A' AND calle LIKE ?";
//    const BUSCAR_PROFESOR_POR_CALLE ="SELECT nombre, apellido, titulo, calle, numero, persona.id FROM persona INNER JOIN domicilio ON persona.FK_domicilio = domicilio.id WHERE tipo = 'P' AND calle LIKE ?";
//    const BUSCAR_PROFESORES = "SELECT nombre, apellido, titulo, calle, numero, persona.id FROM persona INNER JOIN domicilio ON persona.FK_domicilio = domicilio.id WHERE persona.tipo = 'P'";
//    const BUSCAR_UN_ALUMNO = "SELECT * FROM persona WHERE tipo = 'A' AND id = ?";
//    
//    const BUSCAR_UN_ALUMNO_CON_DOMI = "SELECT nombre, apellido, legajo, calle, numero FROM persona INNER JOIN domicilio ON persona.FK_domicilio = domicilio.id WHERE persona.id = ?";
//    const BUSCAR_UN_PROFESOR_CON_DOMI = "SELECT nombre, apellido, titulo, calle, numero FROM persona INNER JOIN domicilio ON persona.FK_domicilio = domicilio.id WHERE persona.id = ?";
//    
//    const BUSCAR_UN_PROFESOR = "SELECT * FROM persona WHERE tipo = 'P' AND id = ?";
//    const ULTIMO_ALUMNO = "SELECT MAX(id) FROM persona WHERE tipo = 'A'";
//    const ULTIMO_PROFESOR = "SELECT MAX(id) FROM persona WHERE tipo = 'P'"; 
//    
//    const ACTUALIZAR_ALUMNO_CON_DOMICILIO = "UPDATE persona INNER JOIN domicilio on persona.FK_domicilio = domicilio.id 
//        SET nombre = ?, apellido = ?, legajo = ?, calle = ?, numero = ? WHERE persona.id = ?;";
//
//    const ACTUALIZAR_PROFESOR_CON_DOMICILIO = "UPDATE persona INNER JOIN domicilio on persona.FK_domicilio = domicilio.id 
//        SET nombre = ?, apellido = ?, titulo = ?, calle = ?, numero = ? WHERE persona.id = ?;";
//
//
//    const INSERTAR_DOMICLIO = "INSERT INTO domicilio(calle, numero) VALUES(?,?)";
//    const ELIMINAR_DOMICILIO = "DELETE FROM domicilio WHERE id = ?";
//    const ACTUALIZAR_DOMICILIO = "UPDATE domicilio SET calle = ?, numero = ? WHERE id = ?";
//    const BUSCAR_DOMICILIO = "SELECT calle, numero FROM domicilio";
//    const BUSCAR_UN_DOMICILIO = "SELECT * FROM domicilio WHERE id = ?";
//    const ULTIMO_DOMICILIO = "SELECT MAX(id) FROM domicilio";
//    
//    const CHECK_USER = "SELECT * FROM usuario WHERE user = ?";
//    const BUSCAR_USUARIOS = "SELECT * FROM usuario";
//    const INSERTAR_USUARIO = "INSERT INTO usuario(user, pass) VALUES(?,?)";
//    const ELIMINAR_USUARIO = "DELETE FROM usuario WHERE id = ?";
//    const ACTUALIZAR_USUARIO = "UPDATE usuario SET user = ?, pass = ? WHERE id = ?";
//    const BUSCAR_UN_USUARIO = "SELECT * FROM usuario WHERE id = ?";
    
    
    
    
    
    
}
