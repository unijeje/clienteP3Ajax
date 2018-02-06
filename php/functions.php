<?php

function connectDB() 
{
    try 
    {
        $opc=array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8");
        $dsn="mysql:host=localhost;dbname=clientep3_autobuses";
        $usuario="root";
        $contrasena="";
        $base=new PDO($dsn,$usuario,$contrasena,$opc);
    }
    catch (PDOException $e)
    {
        die ("Error".$e->getMessage());
        $resultado=null;
    }
    return $base;
}

function ejecutaConsulta($sql)
{
		//recibe una cadena conteniendo una instruccion SELECT y devuelve un resultset
		
		$miconexion=connectDB();
		return $miconexion->query($sql);
		
}
function ejecutaConsultaAccion($sql)
{
		/*recibe una cadena conteniendo una instruccion DML, la ejecuta y
		devuelve el nº de filas afectadas por dicha instruccion*/
		$miconexion=connectDB();
		$accion = $miconexion->prepare($sql);
		$accion->execute();
		return $accion->rowCount();
		//return "1";
}

?>