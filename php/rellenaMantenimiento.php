<?php

include("functions.php");

$sql="SELECT descripcion, importe, fecha from mantenimiento where matricula_autobus='".$_GET['datos']."' and estado=true;";

//echo $sql;

//$datos=ejecutaConsultaArray($sql);

$resultset=ejecutaConsulta($sql);

$datos=$resultset->fetch(PDO::FETCH_ASSOC);

echo json_encode($datos);


?>