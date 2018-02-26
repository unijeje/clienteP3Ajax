<?php
include("functions.php");

$oDatos=json_decode($_POST["datos"]);
$resultado=false;

$update="UPDATE conductor SET nombre='".$oDatos->nombre."', apellidos='".$oDatos->apellidos."', sexo='".$oDatos->sexo."', telefono=".$oDatos->tlf.", email='".$oDatos->email."', direccion='".$oDatos->direccion."' WHERE dni='".$oDatos->dni."'";

$sql="SELECT * FROM conductor WHERE dni='".$oDatos->dni."'";

if(ejecutaConsultaAccion($sql) > 0)

   //existe en la base de datos
    if(ejecutaConsultaAccion($update) > 0){
    	$mensaje="Conductor modificado correctamente";
    	$resultado=true;
    }
    else
    	$mensaje="Fallo al modificar conductor";

else
    $mensaje="No se encuentra conductor con ese DNI"; 

$respuesta=[];
$respuesta[]=$resultado;
$respuesta[]=$mensaje;
echo json_encode($respuesta);
?>