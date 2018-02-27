//todos 

var btnMostrarActivos=document.getElementById("btnOrdenarConductoresActivos");
btnMostrarActivos.addEventListener("click", mostrarConductoresActivos, false);

function listadoConductores()
{
	 // Instanciar objeto Ajax
	 var oAjax = instanciarXHR();

	 //1. Preparar parametros
	 //var sDatosEnvio;

	 //2. Configurar la llamada --> Asincrono por defecto
	 oAjax.open("GET", "php/listadoConductores.php");

	 //3. Asociar manejador de evento de la respuesta
	 oAjax.addEventListener("readystatechange", respuestaListadoConductores, false);

	 //4. Hacer la llamada
	 oAjax.send();
	
}

function respuestaListadoConductores()
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
		cabeceras[3]="Sexo";
		cabeceras[4]="Teléfono";
		cabeceras[5]="Email";
		cabeceras[6]="Dirección";
		cabeceras[7]="Estado";
		cabeceras[8]="Reactivar";
		var oCelda;
		var oTexto;

		var oTabla=document.createElement("TABLE");
		var oFila=oTabla.insertRow();
		oFila.classList.add("thead-dark");
		for ( var i=0;i<9;i++){// crea la cabecera la tabla
			oCelda=document.createElement("TD");
			oTexto=document.createTextNode(cabeceras[i]);
			oCelda.appendChild(oTexto);
			oCelda.classList.add("lead");
			oFila.appendChild(oCelda);
		}

		for ( var i=0;i<oFilas.length;i++){
			var sBotonRecuperar="";
			
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
			oTexto=document.createTextNode(oFilas[i].sexo);
			oCelda.appendChild(oTexto);
			oCelda=oFila.insertCell();
			oTexto=document.createTextNode(oFilas[i].telefono);
			oCelda.appendChild(oTexto);
			oCelda=oFila.insertCell();
			oTexto=document.createTextNode(oFilas[i].email);
			oCelda.appendChild(oTexto);
			oCelda=oFila.insertCell();				
			oTexto=document.createTextNode(oFilas[i].direccion);
			oCelda.appendChild(oTexto);
			oCelda=oFila.insertCell();
			if(oFilas[i].estado>0)// para que no salga true o false en la tabla
				oTexto=document.createTextNode("Activo");
			else{
				oTexto=document.createTextNode("Baja");
				sBotonRecuperar='<button id="recuperarConductor" type="button" class="btn btn-info"><span class="glyphicon glyphicon-plus-sign"></span></button>';
			}	
				
			oCelda.appendChild(oTexto);
			oFila.innerHTML+="<td>"+sBotonRecuperar+"</td>";
			oCelda=oFila.insertCell();
		}

		oTabla.classList.add("table");
		oTabla.classList.add("table-striped");
		oTabla.classList.add("text-center");
		oCapaListado.appendChild(oTabla);
		
		var oBotones=document.querySelectorAll("#recuperarConductor");
		for(var i=0;i<oBotones.length;i++)
			oBotones[i].addEventListener("click", recuperarConductor, false);
	}	
}

function mostrarConductoresActivos()
{
	var oFilas=document.querySelectorAll("#resultadoListados table tbody tr");
	console.log(oFilas);
	for(var i=1;i<oFilas.length;i++)
	{
		console.log(oFilas[i].lastChild.textContent);
		if(oFilas[i].lastChild.textContent=="Activo")
			oFilas[i].classList.remove("invisible");
		else
			oFilas[i].classList.add("invisible");
	}
}