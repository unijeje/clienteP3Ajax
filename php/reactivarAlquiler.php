<?php

include("functions.php");

$id=$_POST['id'];


$sql="UPDATE alquiler set estado=true where id='".$id."';";

$n=ejecutaConsultaAccion($sql);


//echo $sql;

if($n > 0)
{
    echo "Exito";
}
else
    echo "Error";



?>