<?php
include("functions.php");

$sDatos = $_REQUEST["datos"];
$oDatos = json_decode($sDatos); //convertir en objeto de cadena

$sql="INSERT INTO conductor values('".$oDatos->dni."', '".$oDatos->nombre."','".$oDatos->apellidos."', '".$oDatos->sexo."', ".$oDatos->telefono.", '".$oDatos->email."', '".$oDatos->direccion."', true) ;";

echo(ejecutaConsultaAccion($sql));
?>