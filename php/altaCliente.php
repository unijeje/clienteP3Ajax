<?php
include("functions.php");

$sDatos = $_REQUEST["datos"];
$oDatos = json_decode($sDatos); //convertir en objeto de cadena

$sql="INSERT INTO cliente values('".$oDatos->dni."', '".$oDatos->nombre."', '".$oDatos->apellidos."', '".$oDatos->telefono."', '".$oDatos->correo."','".$oDatos->sexo."', true) ;";
/*
if(ejecutaConsultaAccion($sql) > 0)
{
    echo "Introducido con exito";
}
else
    echo "Error";
*/
echo(ejecutaConsultaAccion($sql));
?>