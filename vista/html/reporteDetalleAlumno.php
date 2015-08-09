<?php
    require_once '../../fpdf/fpdf.php';
    require_once '../../controlador/persistencia/ControladorPersistencia.php';
    if (isset($_GET["id"])) {
        $id=$_GET["id"];
        $pdf=new FPDF();
        $pdf->AddPage(100, 'A3');
        $pdf->SetFont('Arial', 'B', '20');
        $pdf->Cell(100,10,"DETALLE DEL ALUMNO:",0,0,'C');
        $pdf->Ln();
        $pdf->Ln();
        
        $cp = new ControladorPersistencia();
        $respAlumno = $cp->ejecutarSentencia(DBSentencias::BUSCAR_UN_ALUMNO_CON_DOMI, array($id));
        $alumnoss = $respAlumno->fetchAll(PDO::FETCH_ASSOC);
        foreach ($alumnoss as $alumnos) {
            $pdf->SetFont('Arial', 'B', '20');
            $pdf->SetFillColor(2,157,116);
            $pdf->SetTextColor(240, 255, 240);
            $pdf->Cell(40,15,"NOMBRE",1, 0, 'L', true);
            
            $pdf->SetFont('Arial', '', '16');
            $pdf->SetFillColor(229, 229, 229);
            $pdf->SetTextColor(3, 3, 3);
            $pdf->Cell(60,15, utf8_decode($alumnos['nombre']),1, 0, 'L', true);
            $pdf->Ln();
            
            
            $pdf->SetFont('Arial', 'B', '20');
            $pdf->SetFillColor(2,157,116);
            $pdf->SetTextColor(240, 255, 240);
            $pdf->Cell(40,15,"APELLIDO",1, 0, 'L', true);
            
            $pdf->SetFont('Arial', '', '16');
            $pdf->SetFillColor(229, 229, 229);
            $pdf->SetTextColor(3, 3, 3);
            $pdf->Cell(60,15, utf8_decode($alumnos['apellido']),1, 0, 'L', true);
            $pdf->Ln();
            
            
            $pdf->SetFont('Arial', 'B', '20');
            $pdf->SetFillColor(2,157,116);
            $pdf->SetTextColor(240, 255, 240);
            $pdf->Cell(40,15,"LEGAJO",1, 0, 'L', true);
            
            $pdf->SetFont('Arial', '', '16');
            $pdf->SetFillColor(229, 229, 229);
            $pdf->SetTextColor(3, 3, 3);
            $pdf->Cell(60,15, utf8_decode($alumnos['legajo']),1, 0, 'L', true);
            $pdf->Ln();
            
            
            $pdf->SetFont('Arial', 'B', '20');
            $pdf->SetFillColor(2,157,116);
            $pdf->SetTextColor(240, 255, 240);
            $pdf->Cell(40,15,"CALLE",1, 0, 'L', true);
            
            $pdf->SetFont('Arial', '', '16');
            $pdf->SetFillColor(229, 229, 229);
            $pdf->SetTextColor(3, 3, 3);
            $pdf->Cell(60,15, utf8_decode($alumnos['calle']),1, 0, 'L', true);
            $pdf->Ln();
            
            
            $pdf->SetFont('Arial', 'B', '20');
            $pdf->SetFillColor(2,157,116);
            $pdf->SetTextColor(240, 255, 240);
            $pdf->Cell(40,15,"NUMERO",1, 0, 'L', true);
            
            $pdf->SetFont('Arial', '', '16');
            $pdf->SetFillColor(229, 229, 229);
            $pdf->SetTextColor(3, 3, 3);
            $pdf->Cell(60,15, utf8_decode($alumnos['numero']),1, 0, 'L', true);
            $pdf->Ln();
    }
        $pdf->Output();
    }