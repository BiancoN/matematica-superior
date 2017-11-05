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

$("#Generar").click(function(){
    valores = [];
    $("#tablaResultados").html("<tr><th></th><th>X</th><th>Y</th><th>X^2</th><th>YX</th></tr>");
    $('#tablaValores tr').each(function() {
        x=parseFloat($(this).find(".x").val());
        y=parseFloat($(this).find(".y").val());
        if($.isNumeric(x)&&$.isNumeric(y)){
            valores.push({
                x: x,
                y: y
            });
        }
    });

    valores.forEach(function(valor) {
        $("#tablaResultados").append("<tr><td></td><td>" + valor.x + "</td>" + "<td>" + valor.y + "</td>" + "<td>" +
            (valor.x * valor.x) + "</td>"+"<td>" + (valor.x * valor.y) + "</td></tr>");
    });

    var aproximacion = aproximador.aproximacionLineal(valores);

    $("#tablaResultados").append("<tr><td>Σ</td><td>" + aproximacion.sumatorias.x + "</td>" + "<td>" + aproximacion.sumatorias.y + "</td>" +
        "<td>" + aproximacion.sumatorias.xx + "</td>" + "<td>" + aproximacion.sumatorias.xy + "</td></tr>");

    $("#resultado").html("Funcion aproximada: Y=(" + aproximacion.m + ")*X +" + " (" + aproximacion.b + ")");

    Plotly.newPlot('myDiv', [aproximacion.funcion, aproximacion.puntos]);
});
