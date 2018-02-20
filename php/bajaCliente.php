<?php

include("functions.php");

$dni=$_POST['dni'];

$sql="UPDATE cliente set estado=false where dni='".$dni."';";

$n=ejecutaConsultaAccion($sql);




if($n > 0)
{
    echo "Exito";
}
else
    echo "Error";



?>