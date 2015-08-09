/*
SQLyog Enterprise - MySQL GUI v7.13 
MySQL - 5.6.16 : Database - pracprof
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;

CREATE DATABASE /*!32312 IF NOT EXISTS*/`pracprof` /*!40100 DEFAULT CHARACTER SET utf8 */;

USE `pracprof`;

/*Table structure for table `adelanto` */

DROP TABLE IF EXISTS `adelanto`;

CREATE TABLE `adelanto` (
  `id_adelanto` int(11) NOT NULL AUTO_INCREMENT,
  `detalle_adelanto` varchar(50) NOT NULL,
  `fecha_adelanto` datetime NOT NULL,
  `monto_adelanto` decimal(10,2) NOT NULL,
  `id_caso` int(11) NOT NULL,
  PRIMARY KEY (`id_adelanto`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `adelanto` */

/*Table structure for table `art` */

DROP TABLE IF EXISTS `art`;

CREATE TABLE `art` (
  `id_art` int(11) NOT NULL AUTO_INCREMENT,
  `nombre_art` varchar(50) NOT NULL,
  `direccion_art` varchar(100) DEFAULT NULL,
  `detalle_art` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id_art`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `art` */

/*Table structure for table `asistente` */

DROP TABLE IF EXISTS `asistente`;

CREATE TABLE `asistente` (
  `id_asistente` int(11) NOT NULL AUTO_INCREMENT,
  `nombre_asistente` varchar(50) NOT NULL,
  `apellido_asistente` varchar(50) NOT NULL,
  PRIMARY KEY (`id_asistente`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `asistente` */

/*Table structure for table `caso` */

DROP TABLE IF EXISTS `caso`;

CREATE TABLE `caso` (
  `id_caso` int(11) NOT NULL AUTO_INCREMENT,
  `estado_caso` varchar(50) DEFAULT NULL,
  `etapa_caso` varchar(50) DEFAULT NULL,
  `descripcion_caso` varchar(50) DEFAULT NULL,
  `id_cliente` int(11) NOT NULL,
  `id_art` int(11) NOT NULL,
  `id_profesional` int(11) NOT NULL,
  `id_asistente` int(11) NOT NULL,
  PRIMARY KEY (`id_caso`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `caso` */

/*Table structure for table `cliente` */

DROP TABLE IF EXISTS `cliente`;

CREATE TABLE `cliente` (
  `id_cliente` int(11) NOT NULL AUTO_INCREMENT,
  `nombre_cliente` varchar(50) NOT NULL,
  `apellido_cliente` varchar(50) NOT NULL,
  `direccion_cliente` varchar(100) DEFAULT NULL,
  `fecha_nacimiento` datetime DEFAULT NULL,
  `salario_cliente` decimal(10,2) DEFAULT NULL,
  `fotocopiaDNI_cliente` bit(1) DEFAULT NULL,
  `firmaPacto_cliente` bit(1) DEFAULT NULL,
  `firmaPoder_cliente` bit(1) DEFAULT NULL,
  PRIMARY KEY (`id_cliente`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `cliente` */

/*Table structure for table `cobro` */

DROP TABLE IF EXISTS `cobro`;

CREATE TABLE `cobro` (
  `id_cobro` int(11) NOT NULL AUTO_INCREMENT,
  `detalle_cobro` varchar(50) NOT NULL,
  `fecha_cobro` datetime NOT NULL,
  `monto_cobro` decimal(10,2) NOT NULL,
  `id_caso` int(11) NOT NULL,
  PRIMARY KEY (`id_cobro`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `cobro` */

/*Table structure for table `expediente` */

DROP TABLE IF EXISTS `expediente`;

CREATE TABLE `expediente` (
  `id_expte` int(11) NOT NULL AUTO_INCREMENT,
  `numero_expte` varchar(6) NOT NULL,
  `ano_expte` int(4) NOT NULL,
  `caratula_expte` varchar(100) NOT NULL,
  `id_caso` int(11) NOT NULL,
  PRIMARY KEY (`id_expte`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `expediente` */

/*Table structure for table `llamada` */

DROP TABLE IF EXISTS `llamada`;

CREATE TABLE `llamada` (
  `id_llamada` int(11) NOT NULL AUTO_INCREMENT,
  `detalle_llamada` varchar(200) NOT NULL,
  `fecha_llamada` datetime NOT NULL,
  `fechaProxima__llamada` datetime DEFAULT NULL,
  `estado_llamada` varchar(1) DEFAULT NULL,
  `tipo_llamada` varchar(1) DEFAULT NULL,
  `id_caso` int(11) NOT NULL,
  PRIMARY KEY (`id_llamada`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `llamada` */

/*Table structure for table `pago` */

DROP TABLE IF EXISTS `pago`;

CREATE TABLE `pago` (
  `id_pago` int(11) NOT NULL AUTO_INCREMENT,
  `detalle_pago` int(11) NOT NULL,
  `fecha_pago` datetime NOT NULL,
  `monto_pago` decimal(10,2) NOT NULL,
  `id_caso` int(11) NOT NULL,
  PRIMARY KEY (`id_pago`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `pago` */

/*Table structure for table `profesional` */

DROP TABLE IF EXISTS `profesional`;

CREATE TABLE `profesional` (
  `id_profesional` int(11) NOT NULL AUTO_INCREMENT,
  `nombre_profesional` varchar(50) NOT NULL,
  `apellido_profesional` varchar(50) NOT NULL,
  `titulo_profesional` varchar(50) NOT NULL,
  `matricula_profesional` int(6) NOT NULL,
  PRIMARY KEY (`id_profesional`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `profesional` */

/*Table structure for table `telefono` */

DROP TABLE IF EXISTS `telefono`;

CREATE TABLE `telefono` (
  `id_telefono` int(11) NOT NULL AUTO_INCREMENT,
  `numero_telefono` varchar(15) NOT NULL,
  `propietario_telefono` varchar(20) NOT NULL,
  `id_cliente` int(11) NOT NULL,
  PRIMARY KEY (`id_telefono`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `telefono` */

/*Table structure for table `usuario` */

DROP TABLE IF EXISTS `usuario`;

CREATE TABLE `usuario` (
  `id_usuario` int(11) NOT NULL AUTO_INCREMENT,
  `nombre_usuario` varchar(50) NOT NULL,
  `apellido_usuario` varchar(50) NOT NULL,
  `usuario_usuario` varchar(15) NOT NULL,
  `clave_usuario` varchar(8) NOT NULL,
  `tipoAcceso_usuario` int(1) NOT NULL,
  PRIMARY KEY (`id_usuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `usuario` */

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
