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


        
        var arrayDNI=[];
        for(var i=0;i<oRespuesta.length;i++)
            arrayDNI.push(oRespuesta[i].dni);

       $("#frmClienteBaja #txtClienteDni").autocomplete({source: arrayDNI});
       $("#frmClienteModificar #txtClienteDni").autocomplete({source: arrayDNI});

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
