<?php

include("functions.php");

$dni=$_GET['txtClienteDni'];
$nombre=$_GET['txtClienteNombre'];
$apellidos=$_GET['txtClienteApellidos'];
$telefono=$_GET['txtClienteTelefono'];
$correo=$_GET['txtClienteCorreo'];
$sexo=$_GET['radioClienteSexo'];

$sql="UPDATE cliente set nombre='$nombre', apellidos='$apellidos', telefono='$telefono',
        correo='$correo', sexo='$sexo' where dni='".$dni."';";

$n=ejecutaConsultaAccion($sql);




if($n > 0)
{
    echo "Exito";
}
else
    echo "Error";



?>