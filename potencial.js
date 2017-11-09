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
    $("#tablaResultados").html("<tr><th></th><th>x</th><th>y</th><th>X = ln x</th><th>Y = ln y</th><th>X^2</th><th>X*Y</th></tr>");
    $('#tablaValores tr').each(function() {
        x=parseFloat($(this).find(".x").val());
        y=parseFloat($(this).find(".y").val());
        if($.isNumeric(x) && $.isNumeric(y)
            && x > 0 && y > 0){
            valores.push({x: x,y: y});
        }
    });

    decimales = parseInt($("#usr").val());

    valores.forEach(function(valor) {
        $("#tablaResultados").append("<tr><td></td><td>" + aproximador.redondear(valor.x, decimales) + "</td><td>" +
            aproximador.redondear(valor.y, decimales) + "</td><td>" +
            aproximador.redondear(Math.log(valor.x), decimales) + "</td><td>" +
            aproximador.redondear(Math.log(valor.y), decimales) + "</td><td>" +
            aproximador.redondear(Math.log(valor.x) * Math.log(valor.x), decimales) + "</td><td>" +
            aproximador.redondear(Math.log(valor.x) * Math.log(valor.y), decimales) + "</td></tr>");
    });

    aproximacion = aproximador.potencial(valores);

    $("#tablaResultados").append("<tr><td>Σ</td><td></td><td></td><td>" +
        aproximador.redondear(aproximacion.sumatorias.x, decimales) + "</td><td>" +
        aproximador.redondear(aproximacion.sumatorias.y, decimales) + "</td><td>" +
        aproximador.redondear(aproximacion.sumatorias.xx, decimales) + "</td><td>" +
        aproximador.redondear(aproximacion.sumatorias.xy, decimales) + "</td></tr>");

});

$("#GenerarFuncion").click(function(){
    $("#resultado").html("Funcion aproximada: Y=(" + aproximador.redondear(aproximacion.a, decimales) + ")* X ^ (" +
        aproximador.redondear(aproximacion.b, decimales) + ")" + "</br>");
});

$("#GenerarGrafica").click(function(){
    Plotly.newPlot('myDiv', [aproximacion.funcion, aproximacion.puntos]);
});
