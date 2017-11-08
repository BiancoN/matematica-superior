require('./jquery-3.2.1.min');
var aproximador = require('./aproximador');

$( document ).ready(function() {
    $("#masCampos").click(function() {
    $("#tabla").append("<tr><td><input type=\"number\" id=\"valorx\" class=\"casillero\"></td>" +
                "<td><input type=\"number\" id=\"valory\" class=\"casillero\"></td></tr>");
    });
});


var valores = [];
$("#Agregar").click(function(){
    $("#tablaValores").append("<tr><td> <input rype=\"number\" style=\"width: 100%; border: 0px;\" class=\"x\"></td>" +
    "<td><input rype=\"number\" style=\"width: 100%; border: 0px;\"class=\"y\"></td></tr>");
});

$("#Generar").click(function(){
    valores = [];
    valoresLineales = [];
    $("#tablaResultados").html("<tr><th></th><th>x</th><th>y</th><th>X = x</th><th>Y = ln y</th><th>X^2</th><th>X*Y</th></tr>");
    $('#tablaValores tr').each(function() {
        x=parseFloat($(this).find(".x").val());
        y=parseFloat($(this).find(".y").val());
        if($.isNumeric(x) && $.isNumeric(y)
            && y > 0){
            valores.push({x: x,y: y});
        }
    });

    var decimales = parseInt($("#usr").val());

    valores.forEach(function(valor) {
        $("#tablaResultados").append("<tr><td></td><td>" + aproximador.redondear(valor.x, decimales) + "</td><td>" +
            aproximador.redondear(valor.y, decimales) + "</td><td>" + aproximador.redondear(valor.x, decimales) +
            "</td><td>" + aproximador.redondear(Math.log(valor.y), decimales) + "</td><td>" +
            aproximador.redondear(valor.x * valor.x, decimales) + "</td><td>" +
            aproximador.redondear(valor.x * Math.log(valor.y), decimales) + "</td></tr>");
    });

    var aproximacion = aproximador.exponencial(valores);

    $("#tablaResultados").append("<tr><td>Σ</td><td></td><td></td><td>" +
        aproximador.redondear(aproximacion.sumatorias.x, decimales) + "</td><td>" +
        aproximador.redondear(aproximacion.sumatorias.y, decimales) + "</td><td>" +
        aproximador.redondear(aproximacion.sumatorias.xx, decimales) + "</td><td>" +
        aproximador.redondear(aproximacion.sumatorias.xy, decimales) + "</td></tr>");

    $("#resultado").html("Funcion aproximada: Y=(" + aproximador.redondear(aproximacion.a, decimales) +
        ")* e ^ (" + aproximador.redondear(aproximacion.b, decimales)+ ") * x</br>");

    Plotly.newPlot('myDiv',[aproximacion.funcion, aproximacion.puntos]);
});
