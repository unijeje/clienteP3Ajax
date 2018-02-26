//todos y mantenimiento
function listadoAutobuses()
{
	 // Instanciar objeto Ajax
	 var oAjax = instanciarXHR();

	 //1. Preparar parametros
	 //var sDatosEnvio = "par=hola";

	 //2. Configurar la llamada --> Asincrono por defecto
	 oAjax.open("GET", "php/listadoAutobuses.php");

	 //3. Asociar manejador de evento de la respuesta
	 oAjax.addEventListener("readystatechange", respuestaListadoAutobuses, false);

	 //4. Hacer la llamada
	 oAjax.send();
	
}

function respuestaListadoAutobuses()
{
	var oAjax = this;

	// 5. Proceso la respuesta cuando llega
	if (oAjax.readyState == 4 && oAjax.status == 200) {

		var sDatos=oAjax.responseText;
		
		var oFilas=JSON.parse(sDatos);
	
	var tablaEliminar=document.querySelector("TABLE");
	if(tablaEliminar!=null) //si hay una tabla en el div de listados la quita para reemplazarla
		tablaEliminar.remove();

	var cabeceras=[];
	cabeceras[0]="Matrícula";
	cabeceras[1]="Nº Asientos";
	cabeceras[2]="Modelo";
	cabeceras[3]="Consumo";
	cabeceras[4]="Revisión";
	cabeceras[5]="Estado";
	var oCelda;
	var oTexto;

	var oTabla=document.createElement("TABLE");
	var oFila=oTabla.insertRow();
	oFila.classList.add("thead-dark");
	for ( var i=0;i<6;i++){// crea la cabecera la tabla
		oCelda=document.createElement("TD");
		oTexto=document.createTextNode(cabeceras[i]);
		oCelda.appendChild(oTexto);
		oCelda.classList.add("lead");
		oFila.appendChild(oCelda);
	}

	for ( var i=0;i<oFilas.length;i++){
		oFila=oTabla.insertRow(1);
		oCelda=oFila.insertCell();
		oTexto=document.createTextNode(oFilas[i].matricula);
		oCelda.appendChild(oTexto);
		oCelda=oFila.insertCell();
		oTexto=document.createTextNode(oFilas[i].asientos);
		oCelda.appendChild(oTexto);
		oCelda=oFila.insertCell();
		oTexto=document.createTextNode(oFilas[i].modelo);
		oCelda.appendChild(oTexto);
		oCelda=oFila.insertCell();
		oTexto=document.createTextNode(oFilas[i].consumo);
		oCelda.appendChild(oTexto);
		oCelda=oFila.insertCell();
		if(oFilas[i].itv)
			oTexto=document.createTextNode("Revisado");
		else
			oTexto=document.createTextNode("No revisado");
		oCelda.appendChild(oTexto);
		oCelda=oFila.insertCell();
		if(oFilas[i].estado>0)// para que no salga true o false en la tabla
			oTexto=document.createTextNode("Activo");
		else
			oTexto=document.createTextNode("Baja");

		oCelda.appendChild(oTexto);
	}

	oTabla.classList.add("table");
	oTabla.classList.add("table-striped");
	oTabla.classList.add("text-center");
	oCapaListado.appendChild(oTabla);
	}
}