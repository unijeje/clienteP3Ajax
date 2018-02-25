<?php
include("functions.php");

$mantenimiento=json_decode($_POST["mantenimiento"]);
$resultado=false;

$update="UPDATE mantenimiento set descripcion='".$mantenimiento->descripcion."', importe='".$mantenimiento->importe."', fecha='".$mantenimiento->fecha."'  where matricula_autobus='".$mantenimiento->matriculaAutobus."' and estado=true";
//$sql="INSERT INTO autobus values('AAAA', 3, 'GGGGG', 4, 1) ;";
//echo $sql;
$sql="SELECT count(*) from mantenimiento where matricula_autobus='".$mantenimiento->matriculaAutobus."' and estado=true";
$fila=ejecutaConsulta2($sql);

if($fila == 1)

   //existe en la base de datos
    if(ejecutaConsultaAccion($update) > 0){
    	$mensaje="Mantenimiento modificado correctamente en la base de datos";
    	$resultado=true;
    }
    else
    	//$mensaje="Fallo al modificar el mantenimiento";
    	$mensaje=$update;

else
    $mensaje="No se encuentra mantenimiento con esa matricula en la base de datos"; 

$datos=[];
$datos[]=$resultado;
$datos[]=$mensaje;
echo json_encode($datos);
//echo(ejecutaConsultaAccion($sql));
?>