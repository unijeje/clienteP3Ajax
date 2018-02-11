//

function listadoClientes()
{
	 // Instanciar objeto Ajax
	 var oAjax = instanciarXHR();

	 //1. Preparar parametros
	 //var sDatosEnvio = "par=hola";

	 //2. Configurar la llamada --> Asincrono por defecto
	 oAjax.open("GET", "php/listadoClientes.php");

	 //3. Asociar manejador de evento de la respuesta
	 oAjax.addEventListener("readystatechange", respuestaListadoCliente, false);

	 //4. Hacer la llamada
	 oAjax.send();

	/*
	var tablaEliminar=document.querySelector("TABLE");
	if(tablaEliminar!=null) //si hay una tabla en el div de listados la quita para reemplazarla
		tablaEliminar.remove();

	var cabeceras=[];
	cabeceras[0]="DNI";
	cabeceras[1]="Nombre";
	cabeceras[2]="Apellidos";
	cabeceras[3]="Teléfono";
	cabeceras[4]="Correo";
	cabeceras[5]="Nº Cuenta";
	cabeceras[6]="Sexo";
	cabeceras[7]="Estado";
	var oCelda;
	var oTexto;

	var oTabla=document.createElement("TABLE");
	var oFila=oTabla.insertRow();
	oFila.classList.add("thead-dark");
	for ( var i=0;i<8;i++){// crea la cabecera la tabla
		oCelda=document.createElement("TD");
		oTexto=document.createTextNode(cabeceras[i]);
		oCelda.appendChild(oTexto);
		oCelda.classList.add("lead");
		oFila.appendChild(oCelda);
	}



	for ( var i=0;i<oGestion._clientes.length;i++){
		oFila=oTabla.insertRow(1);
		oCelda=oFila.insertCell();
		oTexto=document.createTextNode(oGestion._clientes[i].dni);
		oCelda.appendChild(oTexto);
		oCelda=oFila.insertCell();
		oTexto=document.createTextNode(oGestion._clientes[i].nombre);
		oCelda.appendChild(oTexto);
		oCelda=oFila.insertCell();
		oTexto=document.createTextNode(oGestion._clientes[i].apellidos);
		oCelda.appendChild(oTexto);
		oCelda=oFila.insertCell();
		oTexto=document.createTextNode(oGestion._clientes[i].tlf);
		oCelda.appendChild(oTexto);
		oCelda=oFila.insertCell();
		oTexto=document.createTextNode(oGestion._clientes[i].correo);
		oCelda.appendChild(oTexto);
		oCelda=oFila.insertCell();
		oTexto=document.createTextNode(oGestion._clientes[i].numCuenta);
		oCelda.appendChild(oTexto);
		oCelda=oFila.insertCell();
		oTexto=document.createTextNode(oGestion._clientes[i].sexo);
		oCelda.appendChild(oTexto);
		oCelda=oFila.insertCell();
		if(oGestion._clientes[i].estado)// para que no salga true o false en la tabla
			oTexto=document.createTextNode("Activo");
		else
			oTexto=document.createTextNode("Baja");

		oCelda.appendChild(oTexto);
	}

	oTabla.classList.add("table");
	oTabla.classList.add("table-striped");
	oTabla.classList.add("text-center");
	oCapaListado.appendChild(oTabla);
	*/
	
}

function respuestaListadoCliente()
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
		cabeceras[0]="DNI";
		cabeceras[1]="Nombre";
		cabeceras[2]="Apellidos";
		cabeceras[3]="Teléfono";
		cabeceras[4]="Correo";
		cabeceras[5]="Sexo";
		cabeceras[6]="Estado";
		var oCelda;
		var oTexto;

		var oTabla=document.createElement("TABLE");
		var oFila=oTabla.insertRow();
		oFila.classList.add("thead-dark");
		for ( var i=0;i<cabeceras.length;i++){// crea la cabecera la tabla
			oCelda=document.createElement("TD");
			oTexto=document.createTextNode(cabeceras[i]);
			oCelda.appendChild(oTexto);
			oCelda.classList.add("lead");
			oFila.appendChild(oCelda);
		}

		for ( var i=0;i<oFilas.length;i++){
			oFila=oTabla.insertRow(1);
			oCelda=oFila.insertCell();
			oTexto=document.createTextNode(oFilas[i].dni);
			oCelda.appendChild(oTexto);
			oCelda=oFila.insertCell();
			oTexto=document.createTextNode(oFilas[i].nombre);
			oCelda.appendChild(oTexto);
			oCelda=oFila.insertCell();
			oTexto=document.createTextNode(oFilas[i].apellidos);
			oCelda.appendChild(oTexto);
			oCelda=oFila.insertCell();
			oTexto=document.createTextNode(oFilas[i].telefono);
			oCelda.appendChild(oTexto);
			oCelda=oFila.insertCell();
			oTexto=document.createTextNode(oFilas[i].correo);
			oCelda.appendChild(oTexto);
			oCelda=oFila.insertCell();
			oTexto=document.createTextNode(oFilas[i].sexo);
			oCelda.appendChild(oTexto);
			oCelda=oFila.insertCell();
			if(oFilas[i].estado)// para que no salga true o false en la tabla
				oTexto=document.createTextNode("Activo");
			else
				oTexto=document.createTextNode("Baja");
	
			oCelda.appendChild(oTexto);
			oCelda=oFila.insertCell();
		}

		oTabla.classList.add("table");
		oTabla.classList.add("table-striped");
		oTabla.classList.add("text-center");
		oCapaListado.appendChild(oTabla);

	}
}