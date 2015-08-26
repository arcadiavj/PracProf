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

    public function buscar() {//funcion utilizada para buscar en la base de datos a todos los asistentes para proceder con
    //    su listado
        try {
           $this->refControladorPersistencia->get_conexion()->beginTransaction();  //comienza la transacción
           $statement = $this->refControladorPersistencia->ejecutarSentencia(DBSentencias::BUSCAR_USUARIOS);//paso los datos correspondientes a la función ejecutar sentencia
           //para buscar a los asistentes
           $arrayUsuario = $statement->fetchAll(PDO::FETCH_ASSOC);//retorna un array asociativo para no duplicar datos
           
           $this->refControladorPersistencia->get_conexion()->commit();//si todo salió bien hace el commit
           
            return $arrayUsuario;//regreso el array para poder 
        }catch (PDOException $excepcionPDO) {
            echo "<br>Error PDO: ".$excepcionPDO->getTraceAsString().'<br>';
            $this->refControladorPersistencia->get_conexion()->rollBack();//si salio mal hace un rollback
        }catch (Exception $exc) {
            echo $exc->getTraceAsString();
            $this->refControladorPersistencia->get_conexion()->rollBack();//si salio mal hace un rollback
        }
    }

    public function eliminar($datosCampos) {
         try {
            $fecha = time();//coloca la fecha actual           
            $fechaFormato=date('Y-m-d H:i:s');//formateo la fecha para guardar en la bd
            
            $this->refControladorPersistencia->get_conexion()->beginTransaction();//comienzo la transacción
            
            $paramUsuario=["fch_baja"=>$fechaFormato, "id_usuario"=>$id];//uso los datos obtenidos para buscar en la bd de datos todos los datos el ususrio
            
            $usuarioConsulta = $this->refControladorPersistencia->ejecutarSentencia(DBSentencias::ELIMINAR_USUARIO,$paramUsuario);//Envio los datos a la base de datos para eliminar el usuario          
            $this->refControladorPersistencia->get_conexion()->commit();//ejecuto la acción para eliminar de forma lógica a los ususario
            
            
        }catch (PDOException $excepcionPDO) {            
            echo "<br>Error PDO: ".$excepcionPDO->getTraceAsString().'<br>';
            $this->refControladorPersistencia->get_conexion()->rollBack();//si salio mal hace un rollback
        } catch (Exception $exc) {           
                echo $exc->getTraceAsString();
                $this->refControladorPersistencia->get_conexion()->rollBack();  //si hay algún error hace rollback
        }
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
