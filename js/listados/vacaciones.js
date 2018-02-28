//conductores con vacaciones

//var btnListadoVacacionesConductores= document.getElementById("btnListadoVacacionesConductores");

function listadoVacaciones()
{
	 // Instanciar objeto Ajax
	 var oAjax = instanciarXHR();

	 //1. Preparar parametros
	 //var sDatosEnvio;

	 //2. Configurar la llamada --> Asincrono por defecto
	 oAjax.open("GET", "php/listadoVacaciones.php");

	 //3. Asociar manejador de evento de la respuesta
	 oAjax.addEventListener("readystatechange", respuestaListadoVacaciones, false);

	 //4. Hacer la llamada
	 oAjax.send();
	
}

function respuestaListadoVacaciones(){
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
		cabeceras[3]="Inicio Vacaciones";
		cabeceras[4]="Fin Vacaciones";
		cabeceras[5]="Descripción";	
		cabeceras[6]="Estado";
		cabeceras[7]="Reactivar";
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
			oTexto=document.createTextNode(oFilas[i].fecha_ini);
			oCelda.appendChild(oTexto);
			oCelda=oFila.insertCell();
			oTexto=document.createTextNode(oFilas[i].fecha_fin);
			oCelda.appendChild(oTexto);
			oCelda=oFila.insertCell();
			oTexto=document.createTextNode(oFilas[i].descripcion);
			oCelda.appendChild(oTexto);
			oCelda=oFila.insertCell();
			if(oFilas[i].estado>0)// para que no salga true o false en la tabla
				oTexto=document.createTextNode("Activo");
			else{
				oTexto=document.createTextNode("Baja");
				sBotonRecuperar='<button id="recuperarVacacion" type="button" class="btn btn-info"><span class="glyphicon glyphicon-plus-sign"></span></button>';
			}	
				
			oCelda.appendChild(oTexto);
			oFila.innerHTML+="<td>"+sBotonRecuperar+"</td>";
			oCelda=oFila.insertCell();
		}

		oTabla.classList.add("table");
		oTabla.classList.add("table-striped");
		oTabla.classList.add("text-center");
		oCapaListado.appendChild(oTabla);
		
		var oBotones=document.querySelectorAll("#recuperarVacacion");
		for(var i=0;i<oBotones.length;i++)
			oBotones[i].addEventListener("click", recuperarVacacion, false);
	}
}