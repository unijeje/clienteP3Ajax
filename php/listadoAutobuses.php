<?php
include("functions.php");

$sql="SELECT matricula,asientos,modelo,consumo,itv,estado from autobus ;";

$datos=ejecutaConsultaArray($sql);

echo json_encode($datos);


?>
