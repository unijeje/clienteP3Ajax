<?php

include("functions.php");

$sql="SELECT matricula, modelo, asientos, consumo from autobus where matricula='".$_GET['datos']."';";

//echo $sql;

//$datos=ejecutaConsultaArray($sql);

$resultset=ejecutaConsulta($sql);

$datos=$resultset->fetch(PDO::FETCH_ASSOC);

echo json_encode($datos);


?>