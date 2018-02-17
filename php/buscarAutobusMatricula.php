<?php

include("functions.php");

$matricula=$_GET['matricula'];

$sql="SELECT matricula,asientos,modelo,consumo,itv from autobus where matricula='".$matricula."';";


$resultset=ejecutaConsulta($sql);

$datos=$resultset->fetch(PDO::FETCH_ASSOC);

echo json_encode($datos);


?>