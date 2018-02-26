<?php

include("functions.php");

$dni=$_GET['dni'];

$sql="SELECT estado from vacaciones where dni_conductor='".$dni."';";


$resultset=ejecutaConsulta($sql);

$datos=$resultset->fetch(PDO::FETCH_ASSOC);

echo json_encode($datos);


?>