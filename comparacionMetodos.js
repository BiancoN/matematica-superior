require('./jquery-3.2.1.min');
var aproximador = require('./aproximador');

$("#Agregar").click(function(){
    $("#tablaValores").append("<tr><td> <input type=\"number\" style=\"width: 100%; border: 0px;\" class=\"x\"></td>" +
        "<td><input type=\"number\" style=\"width: 100%; border: 0px;\"class=\"y\"></td></tr>");
});

$("#Generar").click(function(){
    var valores = [];

    $('#tablaValores tr').each(function() {
        x=parseFloat($(this).find(".x").val());
        y=parseFloat($(this).find(".y").val());
        if($.isNumeric(x) && $.isNumeric(y)) {
            valores.push({x: x,y: y});
        }
    });

    var aproximaciones = getAproximaciones(valores);
    $("#tablaResultados").html("<tr><th colspan=\"3\" style=\"text-align: center;\">Datos</th><th colspan=\"" +
        aproximaciones.count+ "\" style=\"text-align: center;\">Modelos</th>" +
        "<th colspan=\"" + aproximaciones.count +"\" style=\"text-align: center;\">Errores</th></tr>" +
        "<tr><th style=\"text-align: center;\">i</th><th style=\"text-align: center;\">X</th>" + 
        "<th style=\"text-align: center;\">Y</th>" +
        aproximaciones.headers + "</tr>");

    for(i = 0; i < valores.length; i++) {
        var fila = "<tr><td style=\"text-align: center;\">" + i + "</td><td style=\"text-align: center;\">" +
            valores[i].x + "</td><td style=\"text-align: center;\">" + valores[i].y + "</td>";
        aproximaciones.aproximaciones.forEach(function(aproximacion) {
            fila += "<td style=\"text-align: center;\">" + aproximacion.funcion.y[i] + "</td>";
        });
        aproximaciones.aproximaciones.forEach(function(aproximacion) {
            fila += "<td style=\"text-align: center;\">" + aproximacion.errores.errores[i] + "</td>";
        });
        fila += "</tr>";
        $("#tablaResultados").append(fila);
    }
    var totales = "<tr><td style=\"text-align: center;\">Σ</td><td></td><td></td>";
    aproximaciones.aproximaciones.forEach(function(aproximacion) {
        totales += "<td></td>";
    });
    aproximaciones.aproximaciones.forEach(function(aproximacion) {
        totales += "<td style=\"text-align: center;\">" + aproximacion.errores.total + "</td>";
    });
    totales += "</tr>";
    $("#tablaResultados").append(totales)
});

function getAproximaciones(valores) {
    var headers = "";
    var count = 0;
    var aproximaciones = [];
    if($('#lineal').prop('checked')) {
        headers += "<th style=\"text-align: center;\">Lineal</th>";
        count++;
        var aproximacionLineal = aproximador.aproximacionLineal(valores);
        aproximaciones.push(aproximacionLineal);
    }
    if($('#parabolica').prop('checked')) {
        headers += "<th style=\"text-align: center;\">Parabolica</th>";
        count++;
    }
    if($('#potencial').prop('checked')) {
        headers += "<th style=\"text-align: center;\">Potencial</th>";
        count++;
    }
    if($('#exponencial').prop('checked')) {
        headers += "<th style=\"text-align: center;\">Exponencial</th>";
        count++;
    }
    if($('#hiperbolica').prop('checked')) {
        headers += "<th style=\"text-align: center;\">Hiperbolica</th>";
        count++;
    }
    if($('#saturacion').prop('checked')) {
        headers += "<th style=\"text-align: center;\">Hiperbolica de saturacion</th>";
        count++;
    }
    headers += headers;
    return {headers: headers, count: count, aproximaciones: aproximaciones};
};