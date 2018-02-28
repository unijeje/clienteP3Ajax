<?php

include("functions.php");

$id=$_POST['id'];


$sql="UPDATE autobus set estado=true where matricula='".$id."';";

$n=ejecutaConsultaAccion($sql);


//echo $sql;

if($n > 0)
{
    echo "Exito";
}
else
    echo "Error";



?>