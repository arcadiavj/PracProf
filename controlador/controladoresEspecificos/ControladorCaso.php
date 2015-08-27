<?php
require_once 'ControladorGeneral.php';
/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of ControladorCaso
 *
 * @author Flaco
 */
class ControladorCaso extends ControladorGeneral{
    public function buscar() {
        try {
            $this->refControladorPersistencia->get_conexion()->beginTransaction();  //comienza la transacción
            $statement = $this->refControladorPersistencia->ejecutarSentencia(DBSentencias::BUSCAR_CASOS);
            $arrayClientes = $statement->fetchAll(PDO::FETCH_ASSOC);
            $this->refControladorPersistencia->get_conexion()->commit(); //si todo salió bien hace el commit
            return $arrayClientes;
        }catch (PDOException $excepcionPDO) {
            echo "<br>Error PDO: ".$excepcionPDO->getTraceAsString().'<br>';
            $this->refControladorPersistencia->get_conexion()->rollBack();//si salio mal hace un rollback
        }catch (Exception $exc) {
            echo $exc->getTraceAsString();
            $this->refControladorPersistencia->get_conexion()->rollBack();//si salio mal hace un rollback
        }
    }

    public function eliminar($id) {
        try {
            $this->refControladorPersistencia->get_conexion()->beginTransaction();  //comienza la transacción
            $fecha=time() - (5 * 60 * 60); // le resto 5 horas a la fecha para que me dé la hora argentina
            $fechaRestada=date('Y-m-d H:i:s',$fecha);
            $arrayCaso = ["fch_baja"=>$fechaRestada, "id_caso"=>$id];
            $this->refControladorPersistencia->ejecutarSentencia(DBSentencias::ELIMINAR_CASO, $arrayCaso);
            $this->refControladorPersistencia->get_conexion()->commit(); //si todo salió bien hace el commit
            return $arrayCaso;
        }catch (PDOException $excepcionPDO) {
            echo "<br>Error PDO: ".$excepcionPDO->getTraceAsString().'<br>';
            $this->refControladorPersistencia->get_conexion()->rollBack();//si salio mal hace un rollback
        }catch (Exception $exc) {
            echo $exc->getTraceAsString();
            $this->refControladorPersistencia->get_conexion()->rollBack();//si salio mal hace un rollback
        }
    }

    public function buscarX ($datos){
        
    }
    
    public function guardar($datosCampos) { //sirve para agregar y para modificar
        
    }
    
    public function getPersona($id) {
        
    }

    public function agregar($datosCampos) {
        
    }

    public function modificar($datosCampos) {
        
    }


}
