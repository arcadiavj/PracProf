<?php
require_once 'ControladorGeneral.php';
/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of ControladorUsuario
 *
 * @author Flaco
 */
class ControladorUsuario extends ControladorGeneral {
    
    public function agregar($datosCampos) {
        
    }

    public function buscar() {
        $statement = $this->refControladorPersistencia->ejecutarSentencia(DBSentencias::BUSCAR_USUARIOS);

        $arrayUsuarios = $statement->fetchAll(PDO::FETCH_ASSOC);
        
        return $arrayUsuarios;
    }

    public function eliminar($datosCampos) {
        
    }

    public function modificar($datosCampos) {
        
    }
    public function validarUsuarioClave($user, $pass) {
        
        try {
            $this->refControladorPersistencia->get_conexion()->beginTransaction();  //comienza la transacción
            $statement = $this->refControladorPersistencia->ejecutarSentencia(DBSentencias::CHECK_USER, array($user));
            $resultado = $statement->fetch();
            $this->refControladorPersistencia->get_conexion()->commit(); //si todo salió bien hace el commit
            if (!$resultado) { //no exste usuario
                session_start();
                session_destroy();
                return $res=["falla"=>"user"];
            }else if ((strcasecmp($resultado['clave_usuario'],sha1($pass)))==0) {
                session_start();
                $_SESSION["user"]=$user;
                $_SESSION["id"]=$resultado['id_usuario'];
                $_SESSION[""]=$resultado['tipoAcceso_usuario'];
                return $res=["user"=>$user, "id"=>$resultado['id_usuario'],"acceso"=>$resultado['tipoAcceso_usuario']];
            }else{
                session_start();
                session_destroy();
                return $res=["falla"=>"pass", "pass"=>  sha1($pass), "passbd"=>$resultado['clave_usuario']];
            }
        }catch (PDOException $excepcionPDO) {
            echo "<br>Error PDO: ".$excepcionPDO->getTraceAsString().'<br>';
            $this->refControladorPersistencia->get_conexion()->rollBack();//si salio mal hace un rollback
        }catch (Exception $exc) {
            echo $exc->getTraceAsString();
            $this->refControladorPersistencia->get_conexion()->rollBack();//si salio mal hace un rollback
        }
    }
    public function guardar($datosCampos){

        $user = $datosCampos['user'];
        $pass = $datosCampos['pass'];

        if($user == "" || $pass  == "") {
            echo'Todos los datos deben estar completos!';
        }
        $parametros = array($user,  sha1($pass));

        $resultado = null;
        $resultado = $this->refControladorPersistencia->ejecutarSentencia(DBSentencias::INSERTAR_USUARIO, $parametros);
        if(!$resultado){
          echo 'Error al crear Usuario';
        }
        return $res = ["operacion"=>"exitosa"];
    }
    public function getUsuario($id) {
      $statement = $this->refControladorPersistencia->ejecutarSentencia(DBSentencias::BUSCAR_UN_USUARIO,array($id));
      $usuario = $statement->fetch();
      if (!$usuario) {
        echo'No se encontr&oacute el usuario';
      }
      return $usuario;
    }
}
