require('./jquery-3.2.1.min');
var aproximador = require('./aproximador');

$( document ).ready(function() {
    $("#masCampos").click(function() {
        $("#tabla").append("<tr><td><input type=\"number\" id=\"valorx\" class=\"casillero\"></td>" +
            "<td><input type=\"number\" id=\"valory\" class=\"casillero\"></td></tr>");
    });
});

$("#Agregar").click(function(){
    $("#tablaValores").append("<tr><td> <input rype=\"number\" style=\"width: 100%; border: 0px;\" class=\"x\"></td>" +
        "<td><input rype=\"number\" style=\"width: 100%; border: 0px;\"class=\"y\"></td></tr>");
});

var decimales;
var aproximacion;

$("#GenerarTabla").click(function(){
    var valores = [];
    $("#tablaResultados").html("<tr><th></th><th>X</th><th>1/Y</th><th>X^2</th><th>X/y</th></tr>");
    $('#tablaValores tr').each(function() {
        x = parseFloat($(this).find(".x").val());
        y = parseFloat($(this).find(".y").val());
        if($.isNumeric(x) && $.isNumeric(y)
            && y != 0){
            valores.push({x: x,y: y});
        }
    });

    decimales = parseInt($("#usr").val());

    valores.forEach(function(valor) {
        $("#tablaResultados").append("<tr><td></td><td>" + aproximador.redondear(valor.x, decimales) +
            "</td><td>" + aproximador.redondear(1/valor.y, decimales) + "</td><td>" +
            aproximador.redondear(valor.x * valor.x, decimales) + "</td><td>" +
            aproximador.redondear(valor.x / valor.y, decimales) + "</td></tr>");
    });

    aproximacion = aproximador.hiperbolica(valores);

    $("#tablaResultados").append("<tr><td>Σ</td><td>" +
        aproximador.redondear(aproximacion.sumatorias.x, decimales) + "</td><td>" +
        aproximador.redondear(aproximacion.sumatorias.y, decimales) + "</td><td>" +
        aproximador.redondear(aproximacion.sumatorias.xx, decimales) + "</td><td>" +
        aproximador.redondear(aproximacion.sumatorias.xy, decimales) + "</td></tr>");

});

$("#GenerarFuncion").click(function(){
    $("#resultado").html("Funcion aproximada: Y = (" + aproximador.redondear(a, decimales) + ")/(X + (" +
        aproximador.redondear(b, decimales) + "))");
});

$("#GenerarGrafica").click(function(){
    Plotly.newPlot('myDiv', [aproximacion.funcion, aproximacion.puntos]);
});
