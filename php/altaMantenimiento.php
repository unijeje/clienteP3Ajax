<?php
include("functions.php");


$mantenimiento=json_decode($_POST["mantenimiento"]);
$resultado=false;

$consulta="SELECT Count(*) from autobus where matricula='".$mantenimiento->matriculaAutobus."' and itv=true";
$insert="INSERT INTO mantenimiento (matricula_autobus,descripcion,importe,fecha,estado) values('".$mantenimiento->matriculaAutobus."', '".$mantenimiento->descripcion."', '".$mantenimiento->importe."', ".$mantenimiento->fecha.",1) ;";
$update="UPDATE autobus SET itv=1 where autobus.matricula='".$mantenimiento->matriculaAutobus."' ";
//$mensaje=$insert;
$fila=ejecutaConsulta2($consulta);
$mensaje=$fila;
//$num_filas=$resultset->num_rows;
if($fila == 1)
	$mensaje="El autobus seleccionado tiene un mantenimiento asignado actualmente";
else{
    if(ejecutaConsultaAccion($insert) > 0){
    	
    	if(ejecutaConsultaAccion($update) >0){
    		$mensaje="Mantenimiento introducido correctamente en la base de datos";
    		$resultado=true;
    	}
    }
    else
    	$mensaje="Ya existe un autobus con esa matricula en la base de datos";
}
$datos=[];
$datos[]=$resultado;
$datos[]=$mensaje;
echo json_encode($datos);

?>