<?php

include("functions.php");


$sql="SELECT matricula, modelo, asientos from autobus where itv=true;";

//echo $sql;

$datos=ejecutaConsultaArray($sql);


echo json_encode($datos);


?>