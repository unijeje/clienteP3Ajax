<?php

include("functions.php");

$id=$_POST['txtAlquilerID'];
$cliente=$_POST['txtClienteDni'];
$horas=$_POST['txtAlquilerHoras'];
$fecha=$_POST['txtAlquilerFecha'];
$nump=$_POST['txtAlquilerNumPers'];
$desc=$_POST['txtAlquilerDesc'];
$origen=$_POST['txtAlquilerOrigen'];
$destino=$_POST['txtAlquilerDestino'];
$kms=$_POST['txtAlquilerKms'];
$conductor=$_POST['txtConductorDni'];
$autobus=$_POST['txtAutobusMatricula'];
$localidad=$_POST['txtAlquilerLocalidad'];

$sql="UPDATE alquiler set horas='$horas', fecha='$fecha', numpersonas='$nump',
        descripcion='$desc', origen='$origen', destino='$destino', kms='$kms', cliente='$cliente', matricula_autobus='$autobus', 
        dni_conductor='$conductor', localidad='$localidad' where id='".$id."';";

$n=ejecutaConsultaAccion($sql);




if($n > 0)
{
    echo "Exito";
}
else
    echo "Error";



?>