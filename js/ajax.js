//AJAX
function instanciarXHR() 
{
    var xhttp = null;

    if (window.XMLHttpRequest) {
        xhttp = new XMLHttpRequest();
    } else // code for IE5 and IE6
    {
        xhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }

    return xhttp;
}

function respuestaAltaCliente()
{
    var oAjax = this;

    // 5. Proceso la respuesta cuando llega
    if (oAjax.readyState == 4 && oAjax.status == 200) {

        //sRespuesta=oAjax.responseText;

        //alert(sRespuesta);
        if(parseInt(oAjax.responseText)>0)
        {
            document.frmClienteAlta.reset();
            document.frmClienteAlta.style.display="none";
            mensaje("Cliente Insertado Correctamente");
            buscarClientes();
            }
            else
            mensaje("Ese cliente ya existe");
    }
}

function buscarClientes()
{

    var oAjax = instanciarXHR();

    //1. Preparar parametros

    //2. Configurar la llamada --> Asincrono por defecto
    oAjax.open("GET", encodeURI("php/buscarCliente.php"));

    //3. Asociar manejador de evento de la respuesta
    oAjax.addEventListener("readystatechange", respuestaAutoCompleteCliente, false);

    //4. Hacer la llamada
    oAjax.send(null);
    

}

function respuestaAutoCompleteCliente()
{
    var oAjax = this;

    if (oAjax.readyState == 4 && oAjax.status == 200) {
        var oRespuesta=JSON.parse(oAjax.responseText);

        var dnis=[];
        
        for(var i=0;i<oRespuesta.length;i++)
        {
            //arrayDNI.push(oRespuesta[i].dni);
            var arrayDNI={};
            arrayDNI["value"]=oRespuesta[i].dni;
            arrayDNI["desc"]=oRespuesta[i].nombre+" "+oRespuesta[i].apellidos;
            dnis.push(arrayDNI);
        }   
        if( $("#frmClienteBaja #txtClienteDni").length>0)
        {
        $("#frmClienteBaja #txtClienteDni").autocomplete({
           source: dnis,
           minLength: 0,
           select: function(event, ui){
                $("#frmClienteBaja #txtClienteDni").val(ui.item.value);
                $("#cliente-dni").val(ui.item.value);
                return false;
           }}).autocomplete("instance")._renderItem=function(ul, item){
               return $("<li>").append("<div>"+item.value+"<br>"+item.desc+"</div>").appendTo(ul);
           };
        }

           if( $("#frmClienteModificar #txtClienteDni").length>0)
           {
            $("#frmClienteModificar #txtClienteDni").autocomplete({
                source: dnis,
                minLength: 0,
                select: function(event, ui){
                    $("#frmClienteModificar #txtClienteDni").val(ui.item.value);
                    $("#cliente-dni").val(ui.item.value);
                    return false;
                }}).autocomplete("instance")._renderItem=function(ul, item){
                    return $("<li>").append("<div>"+item.value+"<br>"+item.desc+"</div>").appendTo(ul);
                };
            }
            if( $("#frmNuevoAlquiler #txtClienteDni").length>0)
            {
            $("#frmNuevoAlquiler #txtClienteDni").autocomplete({
                source: dnis,
                minLength: 0,
                select: function(event, ui){
                     $("#frmNuevoAlquiler #txtClienteDni").val(ui.item.value);
                     $("#cliente-dni").val(ui.item.value);
                     return false;
                }}).autocomplete("instance")._renderItem=function(ul, item){
                    return $("<li>").append("<div>"+item.value+"<br>"+item.desc+"</div>").appendTo(ul);
                };
            }

            if( $("#frmModificarAlquiler #txtClienteDni").length>0)
            {
            $("#frmModificarAlquiler #txtClienteDni").autocomplete({
                source: dnis,
                minLength: 0,
                select: function(event, ui){
                     $("#frmModificarAlquiler #txtClienteDni").val(ui.item.value);
                     $("#cliente-dni").val(ui.item.value);
                     return false;
                }}).autocomplete("instance")._renderItem=function(ul, item){
                    return $("<li>").append("<div>"+item.value+"<br>"+item.desc+"</div>").appendTo(ul);
                };
            }
            
            
        
         
        
       
       
       /*
       $("#frmClienteModificar #txtClienteDni").autocomplete({source: arrayDNI});
       $("#frmNuevoAlquiler #txtClienteDni").autocomplete({source: arrayDNI});
       */

    }
}

function respuestaModificarCliente(sDatosDevuelto, sStatus, oAjax)
{
    if(sStatus=="success" && sDatosDevuelto=="Exito")
    {
        mensaje("Cliente actualizado correctamente");
        document.frmClienteModificar.reset();
        document.frmClienteModificar.style.display="none";
        buscarClientes();
    }
    else
    {
        mensaje("No se encontro el cliente");
    }
}

//recuperar desde la tabla de mostrar
function recuperarCliente(oEvento)
{
    var oE=oEvento ||window.event;

    //console.log(oE.target.parentNode.parentNode);
    var sDni=oE.target.parentNode.parentNode.cells[0].textContent;
    
    var sDatos="dni="+sDni;

    $.post("php/reactivarCliente.php",sDatos,function(sDatosDevuelto, sStatus, oAjax){
        //console.log(sDatosDevuelto);
        if(sStatus=="success" && sDatosDevuelto=="Exito")
        {
            listadoClientes();
            buscarClientes();
        } 
    },"text");

}

function respuestaAltaAlquiler()
{
    var oAjax = this;

    // 5. Proceso la respuesta cuando llega
    if (oAjax.readyState == 4 && oAjax.status == 200) {


        if(parseInt(oAjax.responseText)>0)
        {
            document.frmNuevoAlquiler.reset();
            document.frmNuevoAlquiler.style.display="none";
            mensaje("Alquiler Insertado Correctamente");
            buscarAlquileres();
        }
        else
            mensaje("Fallo al insertar alquiler");
        
    }
}

function buscarAlquileres()
{
    $.get("php/buscarAlquiler.php", respuestaAutoCompleteAlquiler, "json");
}

function respuestaAutoCompleteAlquiler(oRespuesta, sStatus, oAjax)
{
    if(oAjax.status==200)
    {
        var ids=[];
        
        for(var i=0;i<oRespuesta.length;i++)
        {
            //arrayDNI.push(oRespuesta[i].dni);
            var arrayDatos={};
            arrayDatos["value"]=oRespuesta[i].id;
            arrayDatos["desc"]="Cliente: "+oRespuesta[i].cliente+" - Fecha: "+oRespuesta[i].fecha;
            ids.push(arrayDatos);
        }   
        if( $("#frmBorraAlquiler #txtAlquilerID").length>0)
        {
        $("#frmBorraAlquiler #txtAlquilerID").autocomplete({
           source: ids,
           minLength: 0,
           select: function(event, ui){
                $("#frmBorraAlquiler #txtAlquilerID").val(ui.item.value);
                //$("#cliente-dni").val(ui.item.value);
                return false;
           }}).autocomplete("instance")._renderItem=function(ul, item){
               return $("<li>").append("<div>"+item.value+"<br>"+item.desc+"</div>").appendTo(ul);
           };
        }

        if( $("#frmModificarAlquiler #txtAlquilerID").length>0)
        {
        $("#frmModificarAlquiler #txtAlquilerID").autocomplete({
           source: ids,
           minLength: 0,
           select: function(event, ui){
                $("#frmModificarAlquiler #txtAlquilerID").val(ui.item.value);
                //$("#cliente-dni").val(ui.item.value);
                return false;
           }}).autocomplete("instance")._renderItem=function(ul, item){
               return $("<li>").append("<div>"+item.value+"<br>"+item.desc+"</div>").appendTo(ul);
           };
        }
    }
}

//recuperar desde la tabla de mostrar
function recuperarAlquiler(oEvento)
{
    var oE=oEvento ||window.event;

    //console.log(oE.target.parentNode.parentNode);
    var sID=oE.target.parentNode.parentNode.cells[0].textContent;
    
    var sDatos="id="+sID;

    $.post("php/reactivarAlquiler.php",sDatos,function(sDatosDevuelto, sStatus, oAjax){
        //console.log(sDatosDevuelto);
        if(sStatus=="success" && sDatosDevuelto=="Exito")
        {
            listadoAlquileres();
            buscarAlquileres()
        } 
    },"text");

}

function buscarConductores()
{
    $.get("php/buscarConductor.php", respuestaAutoCompleteConductor, "json");
}

function respuestaAutoCompleteConductor(oRespuesta, sStatus, oAjax)
{
    if(oAjax.status==200)
    {

        var dnis=[];
        
        for(var i=0;i<oRespuesta.length;i++)
        {
            //arrayDNI.push(oRespuesta[i].dni);
            var arrayDNI={};
            arrayDNI["value"]=oRespuesta[i].dni;
            arrayDNI["desc"]=oRespuesta[i].nombre+" "+oRespuesta[i].apellidos;
            dnis.push(arrayDNI);
        }   
        if( $("#frmNuevoAlquiler #txtConductorDni").length>0)
        {
        $("#frmNuevoAlquiler #txtConductorDni").autocomplete({
           source: dnis,
           minLength: 0,
           select: function(event, ui){
                $("#frmNuevoAlquiler #txtConductorDni").val(ui.item.value);
                //$("#cliente-dni").val(ui.item.value);
                return false;
           }}).autocomplete("instance")._renderItem=function(ul, item){
               return $("<li>").append("<div>"+item.value+"<br>"+item.desc+"</div>").appendTo(ul);
           };
        }

        if( $("#frmModificarAlquiler #txtConductorDni").length>0)
        {
        $("#frmModificarAlquiler #txtConductorDni").autocomplete({
           source: dnis,
           minLength: 0,
           select: function(event, ui){
                $("#frmModificarAlquiler #txtConductorDni").val(ui.item.value);
                //$("#cliente-dni").val(ui.item.value);
                return false;
           }}).autocomplete("instance")._renderItem=function(ul, item){
               return $("<li>").append("<div>"+item.value+"<br>"+item.desc+"</div>").appendTo(ul);
           };
        }
		/*
		if( $("#frmConductorBaja #txtConductorDni").length>0)
        {
        $("#frmConductorBaja #txtConductorDni").autocomplete({
           source: dnis,
           minLength: 0,
           select: function(event, ui){
                $("#frmConductorBaja #txtConductorDni").val(ui.item.value);
                //$("#cliente-dni").val(ui.item.value);
                return false;
           }}).autocomplete("instance")._renderItem=function(ul, item){
               return $("<li>").append("<div>"+item.value+"<br>"+item.desc+"</div>").appendTo(ul);
           };
        }
		*/
    }
}

function respuestaAltaConductor(){
	var oAjax = this;

    // 5. Proceso la respuesta cuando llega
    if (oAjax.readyState == 4 && oAjax.status == 200) {
        
		if(parseInt(oAjax.responseText)>0){
            document.frmConductorAlta.reset();
            document.frmConductorAlta.style.display="none";
            mensaje("Conductor Insertado Correctamente");
            buscarConductores();
            } else
				mensaje("Ese conductor ya existe");
    }
}


function buscarAutobuses()
{
    $.get("php/buscarAutobus.php", respuestaAutoCompleteAutobus, "json");
}

function respuestaAutoCompleteAutobus(oRespuesta, sStatus, oAjax)
{
    if(oAjax.status==200)
    {

        var autobuses=[];
        
        for(var i=0;i<oRespuesta.length;i++)
        {
            //arrayDNI.push(oRespuesta[i].dni);
            var arrayDNI={};
            arrayDNI["value"]=oRespuesta[i].matricula;
            arrayDNI["desc"]="Modelo: "+oRespuesta[i].modelo+" nº Asientos: "+oRespuesta[i].asientos;
            autobuses.push(arrayDNI);
        }   
        if( $("#frmNuevoAlquiler #txtAutobusMatricula").length>0)
        {
        $("#frmNuevoAlquiler #txtAutobusMatricula").autocomplete({
           source: autobuses,
           minLength: 0,
           select: function(event, ui){
                $("#frmNuevoAlquiler #txtAutobusMatricula").val(ui.item.value);
                $("#cliente-dni").val(ui.item.value);
                return false;
           }}).autocomplete("instance")._renderItem=function(ul, item){
               return $("<li>").append("<div>"+item.value+"<br>"+item.desc+"</div>").appendTo(ul);
           };
        }

        if( $("#frmModificarAlquiler #txtAutobusMatricula").length>0)
        {
        $("#frmModificarAlquiler #txtAutobusMatricula").autocomplete({
           source: autobuses,
           minLength: 0,
           select: function(event, ui){
                $("#frmModificarAlquiler #txtAutobusMatricula").val(ui.item.value);
                $("#cliente-dni").val(ui.item.value);
                return false;
           }}).autocomplete("instance")._renderItem=function(ul, item){
               return $("<li>").append("<div>"+item.value+"<br>"+item.desc+"</div>").appendTo(ul);
           };
        }
    }
}
