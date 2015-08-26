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
    const BUSCAR_CLIENTES = "SELECT * FROM cliente WHERE fch_baja = '0000-00-00 00:00:00'";
    const BUSCAR_ARTS = "SELECT * FROM art WHERE fch_baja = '0000-00-00 00:00:00'";
    
    
    
// ASISTENTES
    const BUSCAR_ASISTENTES="SELECT asistente.id_asistente,asistente.nombre_asistente, asistente.apellido_asistente, asistente.fch_creacion, asistente.fch_modificacion, usuario.nombre_usuario, usuario.apellido_usuario 
                                FROM asistente 
                                INNER JOIN usuario  ON asistente.id_usuario=usuario.id_usuario 
                                WHERE asistente.fch_baja= '0000-00-00 00:00:00'";
    const ELIMINAR_ASISTENTE="UPDATE asistente SET fch_baja = ? WHERE id_asistente=?";
    const INSERTAR_ASISTENTE="INSERT INTO asistente(nombre_asistente,apellido_asistente,id_usuario,fch_creacion,fch_modificacion,fch_baja) VALUES (?,?,?,?,?,?)";
    const BUSCAR_ULTIMO_ASISTENTE="SELECT MAX(id_asistente) FROM asistente";
    const BUSCAR_ASISTENTES_ID="SELECT id_asistente,nombre_asistente,apellido_asistente,id_usuario,fch_creacion,fch_modificacion FROM asistente WHERE id_asistente=?";
    const MODIFICAR_ASISTENTE="UPDATE asistente SET nombre_asistente=?, apellido_asistente=?, id_usuario=?,fch_creacion=?, fch_modificacion=?,fch_baja=? WHERE id_asistente=?";
    
    
//USUARIOS

    const CHECK_USER = "SELECT * FROM usuario WHERE usuario_usuario = ?";
    
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
   
//    const BUSCAR_USUARIOS = "SELECT * FROM usuario";
//    const INSERTAR_USUARIO = "INSERT INTO usuario(user, pass) VALUES(?,?)";
//    const ELIMINAR_USUARIO = "DELETE FROM usuario WHERE id = ?";
//    const ACTUALIZAR_USUARIO = "UPDATE usuario SET user = ?, pass = ? WHERE id = ?";
//    const BUSCAR_UN_USUARIO = "SELECT * FROM usuario WHERE id = ?";
    
    
    
    
    
    
}
