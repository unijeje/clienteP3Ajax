<?php
	include("functions.php");

	$dni=$_POST['dni'];


	$sql="UPDATE conductor set estado=true where dni='".$dni."';";

	$n=ejecutaConsultaAccion($sql);


	//echo $sql;

	if($n > 0)
	{
		echo "Exito";
	}
	else
		echo "Error";
?>