<?php

include("functions.php");

$id=$_GET['id'];

$sql="SELECT id,horas,fecha,numpersonas, descripcion, origen, destino, kms, cliente, matricula_autobus, dni_conductor  from alquiler where id='".$id."';";


$resultset=ejecutaConsulta($sql);

$datos=$resultset->fetch(PDO::FETCH_ASSOC);

echo json_encode($datos);


?>