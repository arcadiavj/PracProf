<?php
require_once 'ControladorGeneral.php';
/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of ControladorTelefono
 *
 * @author Flaco
 */
class ControladorTelefono extends ControladorGeneral{
    public function buscar() {
        
    }

    public function eliminar($id) {
    
    }
    
    public function buscarTelsDeUnCliente($idCliente){
        try {
            $this->refControladorPersistencia->get_conexion()->beginTransaction();  //comienza la transacción
            $statement = $this->refControladorPersistencia->ejecutarSentencia(DBSentencias::BUSCAR_TELEFONOS_DE_UN_CLIENTE, array($idCliente));
            $arrayTelefonos = $statement->fetchAll(PDO::FETCH_ASSOC);
            $this->refControladorPersistencia->get_conexion()->commit(); //si todo salió bien hace el commit
            return $arrayTelefonos;
        }catch (PDOException $excepcionPDO) {
            echo "<br>Error PDO: ".$excepcionPDO->getTraceAsString().'<br>';
            $this->refControladorPersistencia->get_conexion()->rollBack();//si salio mal hace un rollback
        }catch (Exception $exc) {
            echo $exc->getTraceAsString();
            $this->refControladorPersistencia->get_conexion()->rollBack();//si salio mal hace un rollback
        }
    }
    public function buscarX (){
        
    }
    
    public function guardar($datosCampos) {

    }
    
    public function getPersona($id) {

    }

    public function agregar($datosCampos) {
        
    }

    public function modificar($datosCampos) {
        
    }

}
