<?php

include("functions.php");

$id=$_POST['id'];

$sql="UPDATE alquiler set estado=false where id='".$id."';";

$n=ejecutaConsultaAccion($sql);




if($n > 0)
{
    echo "Exito";
}
else
    echo "Error";



?>