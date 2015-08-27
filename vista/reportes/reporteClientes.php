<?php
    require_once '../../fpdf/fpdf.php';
    require_once '../../controlador/persistencia/ControladorPersistencia.php';
    $pdf=new FPDF();
    $pdf->AddPage(100, 'A3');
    $pdf->SetFont('Arial', 'B', '20');
    $pdf->Cell(300,10,"LISTADO DE CLIENTES:",0,0,'C');
    $pdf->Ln();
    $pdf->Ln();
    $pdf->SetFillColor(2,157,116);
    $pdf->SetTextColor(240, 255, 240);
    $pdf->Cell(60,15,"APELLIDO",1, 0, 'C', true);
    $pdf->Cell(60,15,"NOMBRE",1, 0, 'C', true);
    $pdf->Cell(60,15,"DNI",1, 0, 'C', true);
    $pdf->Cell(60,15,"DIRECCION",1, 0, 'C', true);
    $pdf->Cell(60,15,"FECHA NAC.",1, 0, 'C', true);
    $pdf->Ln();
    $cp = new ControladorPersistencia();
    $listadoClientes = $cp->ejecutarSentencia(DBSentencias::BUSCAR_CLIENTES);
    $alterna = true;
    foreach ($listadoClientes as $clientes) {
        if ($alterna) {
            $pdf->SetFont('Arial', '', '16');
            $pdf->SetFillColor(229, 229, 229);
            $pdf->SetTextColor(3, 3, 3);
            $pdf->Cell(60,10, utf8_decode($clientes['apellido_cliente']),1, 0, 'L', true);
            $pdf->Cell(60,10, utf8_decode($clientes['nombre_cliente']),1, 0, 'L', true);
            $pdf->Cell(60,10, utf8_decode($clientes['dni_cliente']),1, 0, 'L', true);
            $pdf->Cell(60,10, utf8_decode($clientes['direccion_cliente']),1, 0, 'L', true);
            $pdf->Cell(60,10, utf8_decode($clientes['fecha_nacimiento_cliente']),1, 0, 'L', true);
            $pdf->Ln();
            $alterna = !$alterna;
        }else{
            $pdf->SetFont('Arial', '', '16');
            $pdf->SetFillColor(229, 229, 229);
            $pdf->SetTextColor(3, 3, 3);
            $pdf->Cell(60,10, utf8_decode($clientes['apellido_cliente']),1, 0, 'L', FALSE);
            $pdf->Cell(60,10, utf8_decode($clientes['nombre_cliente']),1, 0, 'L', FALSE);
            $pdf->Cell(60,10, utf8_decode($clientes['dni_cliente']),1, 0, 'L', FALSE);
            $pdf->Cell(60,10, utf8_decode($clientes['direccion_cliente']),1, 0, 'L', FALSE);
            $pdf->Cell(60,10, utf8_decode($clientes['fecha_nacimiento_cliente']),1, 0, 'L', FALSE);
            $pdf->Ln();
            $alterna = !$alterna;
        }
        
        
        
    }
    $pdf->Output();
