//todos y mantenimiento
function listadoMantenimientos()
{
	 // Instanciar objeto Ajax
	 var oAjax = instanciarXHR();

	 //1. Preparar parametros
	 //var sDatosEnvio = "par=hola";

	 //2. Configurar la llamada --> Asincrono por defecto
	 oAjax.open("GET", "php/listadoMantenimientos.php");

	 //3. Asociar manejador de evento de la respuesta
	 oAjax.addEventListener("readystatechange", respuestaListadoMantenimientos, false);

	 //4. Hacer la llamada
	 oAjax.send();
	
}

function respuestaListadoMantenimientos()
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
	cabeceras[0]="Matrícula Autobús";
	cabeceras[1]="Descripcion";
	cabeceras[2]="Importe";
	cabeceras[3]="Fecha";
	var oCelda;
	var oTexto;

	var oTabla=document.createElement("TABLE");
	var oFila=oTabla.insertRow();
	oFila.classList.add("thead-dark");
	for ( var i=0;i<4;i++){// crea la cabecera la tabla
		oCelda=document.createElement("TD");
		oTexto=document.createTextNode(cabeceras[i]);
		oCelda.appendChild(oTexto);
		oCelda.classList.add("lead");
		oFila.appendChild(oCelda);
	}

	for ( var i=0;i<oFilas.length;i++){
		oFila=oTabla.insertRow(1);
		oCelda=oFila.insertCell();
		oTexto=document.createTextNode(oFilas[i].matricula_autobus);
		oCelda.appendChild(oTexto);
		oCelda=oFila.insertCell();
		oTexto=document.createTextNode(oFilas[i].descripcion);
		oCelda.appendChild(oTexto);
		oCelda=oFila.insertCell();
		oTexto=document.createTextNode(oFilas[i].importe);
		oCelda.appendChild(oTexto);
		oCelda=oFila.insertCell();
		oTexto=document.createTextNode(oFilas[i].fecha);
		oCelda.appendChild(oTexto);
		/*oCelda=oFila.insertCell();
		if(oFilas[i].itv)
			oTexto=document.createTextNode("Revisado");
		else
			oTexto=document.createTextNode("No revisado");
		oCelda.appendChild(oTexto);
		oCelda=oFila.insertCell();
		if(oFilas[i].estado)// para que no salga true o false en la tabla
			oTexto=document.createTextNode("Activo");
		else
			oTexto=document.createTextNode("Baja");

		oCelda.appendChild(oTexto);*/
	}

	oTabla.classList.add("table");
	oTabla.classList.add("table-striped");
	oTabla.classList.add("text-center");
	busqueda="<center><input class='btn btn-primary' id='filtrarMantenimientos' type='button' value='Mostrar todos los mantenimientos'></center></br>";
	oCapaListado.innerHTML=busqueda;
	oCapaListado.appendChild(oTabla);
	var oBtnFiltroMantenimientos=document.getElementById("filtrarMantenimientos");
    oBtnFiltroMantenimientos.addEventListener("click", listadoMantenimientosFiltro, false);
	}
}


function listadoMantenimientosFiltro()
{
	 // Instanciar objeto Ajax
	 var oAjax = instanciarXHR();

	 //1. Preparar parametros
	 //var sDatosEnvio = "par=hola";

	 //2. Configurar la llamada --> Asincrono por defecto
	 oAjax.open("GET", "php/listadoMantenimientosFiltro.php");

	 //3. Asociar manejador de evento de la respuesta
	 oAjax.addEventListener("readystatechange", respuestaListadoMantenimientosFiltro, false);

	 //4. Hacer la llamada
	 oAjax.send();
	
}

function respuestaListadoMantenimientosFiltro()
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
	cabeceras[0]="Matrícula Autobús";
	cabeceras[1]="Descripcion";
	cabeceras[2]="Importe";
	cabeceras[3]="Fecha";
	cabeceras[4]="Estado";
	var oCelda;
	var oTexto;

	var oTabla=document.createElement("TABLE");
	var oFila=oTabla.insertRow();
	oFila.classList.add("thead-dark");
	for ( var i=0;i<5;i++){// crea la cabecera la tabla
		oCelda=document.createElement("TD");
		oTexto=document.createTextNode(cabeceras[i]);
		oCelda.appendChild(oTexto);
		oCelda.classList.add("lead");
		oFila.appendChild(oCelda);
	}

	for ( var i=0;i<oFilas.length;i++){
		oFila=oTabla.insertRow(1);
		oCelda=oFila.insertCell();
		oTexto=document.createTextNode(oFilas[i].matricula_autobus);
		oCelda.appendChild(oTexto);
		oCelda=oFila.insertCell();
		oTexto=document.createTextNode(oFilas[i].descripcion);
		oCelda.appendChild(oTexto);
		oCelda=oFila.insertCell();
		oTexto=document.createTextNode(oFilas[i].importe);
		oCelda.appendChild(oTexto);
		oCelda=oFila.insertCell();
		oTexto=document.createTextNode(oFilas[i].fecha);
		oCelda.appendChild(oTexto);
		/*oCelda=oFila.insertCell();
		if(oFilas[i].itv)
			oTexto=document.createTextNode("Revisado");
		else
			oTexto=document.createTextNode("No revisado");
		oCelda.appendChild(oTexto);*/
		oCelda=oFila.insertCell();
		if(oFilas[i].estado==1)// para que no salga true o false en la tabla
			oTexto=document.createTextNode("Activo");
		else
			oTexto=document.createTextNode("Inactivo");

		oCelda.appendChild(oTexto);
	}

	oTabla.classList.add("table");
	oTabla.classList.add("table-striped");
	oTabla.classList.add("text-center");
	oCapaListado.appendChild(oTabla);
	}
}