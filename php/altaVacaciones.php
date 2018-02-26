<?php
include("functions.php");

$sDatos = $_REQUEST["datos"];
$oDatos = json_decode($sDatos); //convertir en objeto de cadena

$sql="INSERT INTO vacaciones (dni_conductor,fecha_ini,fecha_fin,descripcion,estado) values('".$oDatos->dni."', '".$oDatos->fechaIni."', '".$oDatos->fechaFin."', '".$oDatos->descripcion."', true) ;";

echo(ejecutaConsultaAccion($sql));
?>