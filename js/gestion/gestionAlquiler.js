
/*DATOS INICIALES 
var arrayConductores01=[oConductor1];
var arrayAutobuses01=[oAutobus1];
var oAlquiler01=new Alquiler(arrayConductores01, arrayAutobuses01, "999", "5", new Date("01/01/2018") , 20, "Excursion", "Colegio", "Teatro", 10, oCliente02);

var arrayConductores02=[oConductor1, oConductor2];
var arrayAutobuses02=[oAutobus1, oAutobus2];
var oAlquiler02=new Alquiler(arrayConductores02, arrayAutobuses02, "998", "15", new Date("01/03/2018") , 45, "VIAJE", "Sevilla", "Madrid", 100, oCliente01);

oGestion.altaAlquiler(oAlquiler02);
oGestion.altaAlquiler(oAlquiler01);
/*DATOS INICIALES */


/*
frmNuevoAlquiler.txtAlquilerNumPers.addEventListener("focusout", gestionCalcularNumConductores);
frmNuevoAlquiler.txtAlquilerNumPers.addEventListener("focusout", gestionCalcularNumAutobuses);
frmNuevoAlquiler.txtAlquilerNumPers.addEventListener("focusout", comprobarCero);

frmBorraAlquiler.txtAlquilerNumPers.addEventListener("focusout", gestionCalcularNumConductores);
frmBorraAlquiler.txtAlquilerNumPers.addEventListener("focusout", gestionCalcularNumAutobuses);
frmBorraAlquiler.txtAlquilerNumPers.addEventListener("focusout", comprobarCero);

frmModificarAlquiler.txtAlquilerNumPers.addEventListener("focusout", gestionCalcularNumConductores);
frmModificarAlquiler.txtAlquilerNumPers.addEventListener("focusout", gestionCalcularNumAutobuses);
frmModificarAlquiler.txtAlquilerNumPers.addEventListener("focusout", comprobarCero);

var oComboBorrarAlquiler=document.frmBorraAlquiler.comboAlquiler;
var oComboModificarAlquiler=document.frmModificarAlquiler.comboAlquiler;
oComboBorrarAlquiler.addEventListener("change", rellenaCamposAlquiler, false);
oComboModificarAlquiler.addEventListener("change", rellenaCamposAlquiler, false);


var oAltaAlquiler=document.getElementById("btnAltaAlquiler");
oAltaAlquiler.addEventListener("click", altaAlquiler, false);

var oBajaAlquiler=document.getElementById("btnBorrarAlquiler");
oBajaAlquiler.addEventListener("click", bajaAlquiler, false);

var oModificarAlquiler=document.getElementById("btnModificarAlquiler");
oModificarAlquiler.addEventListener("click", modificarAlquiler, false);
*/
//comboEstadoInicialAlquileres();

/*
$( function() {
    $( "#txtAlquilerFecha" ).datepicker();
  } );
*/

function altaAlquiler(oEvento)
{
    var oE=oEvento || windows.event;
    var oForm=oE.target.parentNode.parentNode.parentNode; //recupera el formulario padre sobre el que esta el boton
    if(validarAlquiler(oForm))
    {
        var sDniCliente=oForm.txtAlquilerID.value.trim();

        var sCliente=oForm.txtClienteDni.value.trim();
        
        var sIDAlquiler=oForm.txtAlquilerID.value.trim();
        var sHoras=oForm.txtAlquilerHoras.value.trim();
        var dFecha=oForm.txtAlquilerFecha.value.trim();
        var iNumPers=oForm.txtAlquilerNumPers.value.trim();
        var sDesc=oForm.txtAlquilerDesc.value.trim();
        var sOrigen=oForm.txtAlquilerOrigen.value.trim();
        var sDestino=oForm.txtAlquilerDestino.value.trim();
        var iKMs=oForm.txtAlquilerKms.value.trim();
        var sLocalidad=oForm.txtAlquilerLocalidad.value;
        
        //conductores
        var sDniConductor=oForm.txtConductorDni.value.trim();
        
        //Autobuses
        var sMatriculaAutobus=oForm.txtAutobusMatricula.value.trim();

        //arrayConductores, arrayAutobuses, sID, iHoras, dFecha, iNumPers, sDescripcion, sOrigen, sDestino, iKMS, oCliente
        var oAlquiler=new Alquiler(sDniConductor, sMatriculaAutobus, sIDAlquiler, sHoras, dFecha, iNumPers, sDesc, sOrigen, sDestino, iKMs, sCliente, sLocalidad);
        //console.log(oAlquiler);
        
        oGestion.altaAlquiler(oAlquiler);
    }
    else
        mensaje("Fallo en la validación");
    
}

function bajaAlquiler()
{
    var sIDAlquiler=frmBorraAlquiler.txtAlquilerID.value;
    var oAlquiler=oGestion.buscarAlquiler(sIDAlquiler);
    if(oAlquiler==null)
        mensaje("El alquiler: "+sIDAlquiler+" no se ha encontrado");
    else
    {
        var bBaja=oGestion.bajaAlquiler(oAlquiler);
        if(bBaja)
        {
            mensaje("Alquiler "+sIDAlquiler+" Eliminado");
            document.frmBorraAlquiler.reset();
            document.frmBorraAlquiler.style.display="none";
            buscarAlquileres();
        }
        else
            mensaje("Error al dar de baja: "+sIDAlquiler);
    }

}

function modificarAlquiler(oEvento)
{
    var oE=oEvento || windows.event;
    var oForm=oE.target.parentNode.parentNode.parentNode; //recupera el formulario padre sobre el que esta el boton
    if(validarAlquiler(oForm))
    {
        var sDatos=$("#frmModificarAlquiler").serialize();
        var bActualizacion=oGestion.modificarAlquiler(sDatos);
        if(bActualizacion)
        {
            mensaje("Alquiler actualizado correctamente");
            oForm.style.display="none";
            oForm.reset();
            //rellenaCamposAlquiler();
        }
        else
            mensaje("No se ha encontrado el alquiler");
            
    }
    else
        mensaje("Fallo en la validación");
}

function validarAlquiler(oForm)
{
    var bValidacion=true;
    var sError="";

    


    /*IDALQUILER*/
    var sIDAlquiler=oForm.txtAlquilerID.value.trim();
    oForm.txtAlquilerID.value=oForm.txtAlquilerID.value.trim();

    if(!oExpRegEsNumero.test(sIDAlquiler))
    {
        oForm.txtAlquilerID.parentNode.parentNode.classList.add("has-error");
        
        oForm.txtAlquilerID.focus();
        sError="El ID de alquiler tiene que ser un número";
        falloValidacion(sError, oForm.txtAlquilerID);
        bValidacion=false;
    }
    else
    {
        oForm.txtAlquilerID.parentNode.parentNode.classList.remove("has-error");
        falloValidacion("", oForm.txtAlquilerID);
    }

    /*Cliente, comprobar si existe en la DB*/
    var sDniCliente=oForm.txtClienteDni.value.trim();


    $.ajax({
        url : "php/buscarClienteDni.php",
        async : true,
        method : "GET",
        dataType: "json",
        data :  "dni="+sDniCliente,
        complete : function(oAjax, sStatus)
        {
            if(oAjax.responseJSON.dni==null)
            {
                oForm.txtClienteDni.parentNode.parentNode.classList.add("has-error");
                if(bValidacion)
                oForm.txtClienteDni.focus();
                sError="Cliente no encontrado";
                falloValidacion(sError, oForm.txtClienteDni);
                bValidacion=false;
            }
            else
            {
                falloValidacion("", oForm.txtClienteDni);
                oForm.txtClienteDni.parentNode.parentNode.classList.remove("has-error");
            }
        }
        
    });

    /*NºHoras*/
    var iAlquilerHoras=oForm.txtAlquilerHoras.value.trim();
    oForm.txtAlquilerHoras.value=oForm.txtAlquilerHoras.value.trim();

    if(!oExpRegEsNumero.test(iAlquilerHoras))
    {
        oForm.txtAlquilerHoras.parentNode.parentNode.classList.add("has-error");
        if(bValidacion)
        oForm.txtAlquilerHoras.focus();
        sError="El nº de horas tiene que ser un número";
        falloValidacion(sError, oForm.txtAlquilerHoras);
        bValidacion=false;
    }
    else
    {
        oForm.txtAlquilerHoras.parentNode.parentNode.classList.remove("has-error");
        falloValidacion("", oForm.txtAlquilerHoras);
    }

    /*Fecha*/
    var iAlquilerFecha=oForm.txtAlquilerFecha.value.trim();
    oForm.txtAlquilerFecha.value=oForm.txtAlquilerFecha.value.trim();

    if(!oExpRegFecha.test(iAlquilerFecha))
    {
        oForm.txtAlquilerFecha.parentNode.parentNode.classList.add("has-error");
        if(bValidacion)
        oForm.txtAlquilerFecha.focus();
        sError="formato de fecha incorrecto, tiene que ser: mm/dd/yyyy";
        falloValidacion(sError, oForm.txtAlquilerFecha);
        bValidacion=false;
    }
    else
    {
        oForm.txtAlquilerFecha.parentNode.parentNode.classList.remove("has-error");
        falloValidacion("", oForm.txtAlquilerFecha);
    }

    /*Nº Personas*/
    var iAlquilerNumPers=oForm.txtAlquilerNumPers.value.trim();
    oForm.txtAlquilerNumPers.value=oForm.txtAlquilerNumPers.value.trim();

    if(!oExpRegEsNumero.test(iAlquilerNumPers) || iAlquilerNumPers<1)
    {
        oForm.txtAlquilerNumPers.parentNode.parentNode.classList.add("has-error");
        if(bValidacion)
        oForm.txtAlquilerNumPers.focus();
        sError="Tiene que ser un numero mayor que 0";
        falloValidacion(sError, oForm.txtAlquilerNumPers);
        bValidacion=false;
    }
    else
    {
        oForm.txtAlquilerNumPers.parentNode.parentNode.classList.remove("has-error");
        falloValidacion("", oForm.txtAlquilerNumPers);
    }

    /*Descripción*/
    var txtAlquilerDesc=oForm.txtAlquilerDesc.value.trim();
    oForm.txtAlquilerDesc.value=oForm.txtAlquilerDesc.value.trim();

    if(txtAlquilerDesc=="")
    {
        oForm.txtAlquilerDesc.parentNode.parentNode.classList.add("has-error");
        if(bValidacion)
        oForm.txtAlquilerDesc.focus();
        sError="Tiene que añadir una descripción";
        falloValidacion(sError, oForm.txtAlquilerDesc);
        bValidacion=false;
    }
    else
    {
        oForm.txtAlquilerDesc.parentNode.parentNode.classList.remove("has-error");
        falloValidacion("", oForm.txtAlquilerDesc);
    }

    /*Origen*/
    var txtAlquilerOrigen=oForm.txtAlquilerOrigen.value.trim();
    oForm.txtAlquilerOrigen.value=oForm.txtAlquilerOrigen.value.trim();

    if(txtAlquilerOrigen=="")
    {
        oForm.txtAlquilerOrigen.parentNode.parentNode.classList.add("has-error");
        if(bValidacion)
        oForm.txtAlquilerOrigen.focus();
        sError="Tiene que añadir una dirección de origen";
        falloValidacion(sError, oForm.txtAlquilerOrigen);
        bValidacion=false;
    }
    else
    {
        oForm.txtAlquilerOrigen.parentNode.parentNode.classList.remove("has-error");
        falloValidacion("", oForm.txtAlquilerOrigen);
    }

    /*Destino*/
    var txtAlquilerDestino=oForm.txtAlquilerDestino.value.trim();
    oForm.txtAlquilerDestino.value=oForm.txtAlquilerDestino.value.trim();

    if(txtAlquilerDestino=="")
    {
        oForm.txtAlquilerDestino.parentNode.parentNode.classList.add("has-error");
        if(bValidacion)
        oForm.txtAlquilerDestino.focus();
        sError="Tiene que añadir una dirección de destino";
        falloValidacion(sError, oForm.txtAlquilerDestino);
        bValidacion=false;
    }
    else
    {
        oForm.txtAlquilerDestino.parentNode.parentNode.classList.remove("has-error");
        falloValidacion("", oForm.txtAlquilerDestino);
    }

    /*Num de kms*/
    var txtAlquilerKms=parseInt(oForm.txtAlquilerKms.value.trim());
    oForm.txtAlquilerKms.value=oForm.txtAlquilerKms.value.trim();
   
    if(!oExpRegEsNumero.test(txtAlquilerKms) || txtAlquilerKms<1)
    {
        oForm.txtAlquilerKms.parentNode.parentNode.classList.add("has-error");
        if(bValidacion)
        oForm.txtAlquilerKms.focus();
        sError="Tiene que introducir un número de kilómetros";
        falloValidacion(sError, oForm.txtAlquilerKms);
        bValidacion=false;
    }
    else
    {
        oForm.txtAlquilerKms.parentNode.parentNode.classList.remove("has-error");
        falloValidacion("", oForm.txtAlquilerKms);
    }

    /*Conductor, comprobar si existe en la DB*/
    var sDniConductor=oForm.txtConductorDni.value.trim();

    $.ajax({
        url : "php/buscarConductorDni.php",
        async : true,
        method : "GET",
        dataType: "json",
        data :  "dni="+sDniConductor,
        complete : function(oAjax, sStatus)
        {
            if(oAjax.responseJSON.dni==null)
            {
                oForm.txtConductorDni.parentNode.parentNode.classList.add("has-error");
                if(bValidacion)
                oForm.txtConductorDni.focus();
                sError="Conductor no encontrado";
                falloValidacion(sError, oForm.txtConductorDni);
                bValidacion=false;
            }
            else
            {
                falloValidacion("", oForm.txtConductorDni);
                oForm.txtConductorDni.parentNode.parentNode.classList.remove("has-error");
            }
        }
        
    });

    /*Autobus, comprobar si existe en la DB*/

    var sAutobusMatricula=oForm.txtAutobusMatricula.value.trim();

    $.ajax({
        url : "php/buscarAutobusMatricula.php",
        async : true,
        method : "GET",
        dataType: "json",
        data :  "matricula="+sAutobusMatricula,
        complete : function(oAjax, sStatus)
        {
            if(oAjax.responseJSON.matricula==null)
            {
                oForm.txtAutobusMatricula.parentNode.parentNode.classList.add("has-error");
                if(bValidacion)
                oForm.txtAutobusMatricula.focus();
                sError="Autobus no encontrado";
                falloValidacion(sError, oForm.txtAutobusMatricula);
                bValidacion=false;
            }
            else
            {
                falloValidacion("", oForm.txtAutobusMatricula);
                oForm.txtAutobusMatricula.parentNode.parentNode.classList.remove("has-error");
            }
        }
        
    });


    return bValidacion;
}



function rellenaCamposAlquiler(oEvento) //actualiza
{
    var oE = oEvento || windows.event;
    var oForm=oE.target.parentNode.parentNode.parentNode; //recupera el formulario padre sobre el que esta el combo
    //console.log(oForm.name);
    var oAlquiler=oGestion.buscarAlquiler(oForm.txtAlquilerID.value);

    //console.log(oAlquiler);
    
   
    oForm.txtAlquilerID.value=oAlquiler.id;
    oForm.txtClienteDni.value=oAlquiler.cliente;
    oForm.txtAlquilerHoras.value=oAlquiler.horas;
    oForm.txtAlquilerFecha.value=oAlquiler.fecha;
    oForm.txtAlquilerNumPers.value=oAlquiler.numPers;
    oForm.txtAlquilerDesc.value=oAlquiler.descripcion;
    oForm.txtAlquilerOrigen.value=oAlquiler.origen;
    oForm.txtAlquilerDestino.value=oAlquiler.destino;
    oForm.txtAlquilerKms.value=oAlquiler.kms;
    oForm.txtConductorDni.value=oAlquiler.conductor;
    oForm.txtAutobusMatricula.value=oAlquiler.autobuses;
    oForm.txtAlquilerLocalidad.value=oAlquiler.localidad;
    
}
