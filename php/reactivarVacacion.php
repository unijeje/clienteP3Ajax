<?php
	include("functions.php");

	$dni=$_POST['dni'];


	$sql="UPDATE vacaciones set estado=true where dni_conductor='".$dni."';";

	$n=ejecutaConsultaAccion($sql);


	//echo $sql;

	if($n > 0)
	{
		echo "Exito";
	}
	else
		echo "Error";
?>