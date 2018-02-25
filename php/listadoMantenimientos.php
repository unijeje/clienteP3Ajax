<?php
include("functions.php");

$sql="SELECT matricula_autobus,descripcion,importe,fecha from mantenimiento where estado=true";

$datos=ejecutaConsultaArray($sql);

echo json_encode($datos);


?>
