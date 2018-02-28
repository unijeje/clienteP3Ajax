<?php
include("functions.php");

$oDatos=json_decode($_POST["datos"]);
$resultado=false;

$update="UPDATE vacaciones SET fecha_ini='".$oDatos->fechaIni."', fecha_fin='".$oDatos->fechaFin."', descripcion='".$oDatos->descripcion."' WHERE dni_conductor='".$oDatos->dni."'";

$sql="SELECT * FROM vacaciones WHERE dni_conductor='".$oDatos->dni."'";

if(ejecutaConsultaAccion($sql) > 0)

   //existe en la base de datos
    if(ejecutaConsultaAccion($update) > 0){
    	$mensaje="Vacaciones modificadas correctamente";
    	$resultado=true;
    }
    else
    	$mensaje="Fallo al modificar vacaciones";

else
    $mensaje="No se encuentran vacaciones para ese conductor"; 

$respuesta=[];
$respuesta[]=$resultado;
$respuesta[]=$mensaje;
echo json_encode($respuesta);
?>