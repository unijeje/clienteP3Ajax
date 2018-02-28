function listadoAlquileres(){
	
	$.get("php/listadoAlquileres.php", respuestaListadoAlquileres, "xml");

}

function respuestaListadoAlquileres(oXML, sStatus, oAjax)
{
	//var dniCliente=oComboAlquilerCliente.value;

	var tablaEliminar=document.querySelector("#resultadoListados TABLE");
	if(tablaEliminar!=null) //si hay una tabla en el div de listados la quita para reemplazarla
		tablaEliminar.remove();

	//console.log(oXML);
	
	
	var cabeceras=[];
	cabeceras[0]="ID Alquiler";
	cabeceras[1]="horas";
	cabeceras[2]="fecha";
	cabeceras[3]="Nº Personas";
	cabeceras[4]="descripcion";
	cabeceras[5]="Origen";
	cabeceras[6]="Destino";
	cabeceras[7]="Nº kms";
	cabeceras[8]="Cliente";
	cabeceras[9]="Autobus";
	cabeceras[10]="Conductor";
	cabeceras[11]="Localidad";
	cabeceras[12]="estado";

	var oCelda;
	var oTexto;

	var oTabla=document.createElement("TABLE");
	var oFila =oTabla.insertRow();
	oFila.classList.add("thead-dark");
	oFila.classList.add("text-center");
	for ( var i=0;i<cabeceras.length;i++){// crea la cabecera la tabla
		oCelda=document.createElement("TD");
		oTexto=document.createTextNode(cabeceras[i]);
		oCelda.appendChild(oTexto);
		oCelda.classList.add("lead");
		
		oFila.appendChild(oCelda);
	}
	
	var oAlquileres=oXML.getElementsByTagName("alquiler");

	for ( var i=0;i<oAlquileres.length;i++)
	{
		var sBotonRecuperar="";

		var oFila=oTabla.insertRow(1);

		for(var j=0;j<cabeceras.length-1;j++)
		{
			
			oCelda=oFila.insertCell();
			oTexto=document.createTextNode(oAlquileres[i].children[j].textContent);
			oCelda.appendChild(oTexto);
		}

		oCelda=oFila.insertCell();
		if(oAlquileres[i].children[12].textContent>0)// para que no salga true o false en la tabla
			oTexto=document.createTextNode("Activo");
		else
		{
			oTexto=document.createTextNode("Cancelado");

			sBotonRecuperar='<button id="recuperarAlquiler" type="button" class="btn btn-info"><span class="glyphicon glyphicon-plus-sign"></span></button>';
		}
		oCelda.appendChild(oTexto);		
		oFila.innerHTML+="<td>"+sBotonRecuperar+"</td>";
		oCelda=oFila.insertCell();
	}
	
	oTabla.classList.add("table");
	oTabla.classList.add("table-striped");
	oTabla.classList.add("text-center");
	oCapaListado.appendChild(oTabla);

	var oBotones=document.querySelectorAll("#recuperarAlquiler");
		for(var i=0;i<oBotones.length;i++)
			oBotones[i].addEventListener("click", recuperarAlquiler, false);
	
}