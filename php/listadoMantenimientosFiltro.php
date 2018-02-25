<?php
include("functions.php");

$sql="SELECT matricula_autobus,descripcion,importe,fecha,estado from mantenimiento order by matricula_autobus";

$datos=ejecutaConsultaArray($sql);

echo json_encode($datos);


?>
