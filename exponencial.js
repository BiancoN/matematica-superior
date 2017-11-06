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
        if($.isNumeric(x)&&$.isNumeric(y)){
            valores.push({
                x: x,
                y: y,
                X: x,
                Y: Math.log(y)
            });
            valoresLineales.push({
                x: x,
                y: Math.log(y)
            });
        }
    });

    valores.forEach(function(valor) {
        $("#tablaResultados").append("<tr><td></td><td>" + valor.x + "</td>" + "<td>" + valor.y + "</td>" + "<td>" +
            valor.X + "</td>"+"<td>" + valor.Y + "</td>"+"<td>" + (valor.X * valor.X) + "</td>"+"<td>" + (valor.X * valor.Y) + "</td></tr>");
    });

    var aproximacion = aproximador.aproximacionLineal(valoresLineales);

    $("#tablaResultados").append("<tr><td>Σ</td><td></td><td></td><td>" + aproximacion.sumatorias.x + "</td>" + "<td>" + aproximacion.sumatorias.y + "</td>" +
        "<td>" + aproximacion.sumatorias.xx + "</td>" + "<td>" + aproximacion.sumatorias.xy + "</td></tr>");

    $("#resultado").html("Funcion aproximada: Y=(" + Math.exp(aproximacion.b) + ")* e ^" + " (" + aproximacion.m + ") * x" + "</br>");

    // Ajuste para Graficar Funcion Aproximante Exponencial

    var datos = {
        x: [],
        puntos: [],
        funcion: []
    };
    valores.forEach(function(value) {
        datos.x.push(value.x);
        datos.puntos.push(value.y);
        var funcy = Math.exp(aproximacion.b) * Math.exp(aproximacion.m * value.x);
        datos.funcion.push(funcy);
    });

    var puntos = {
        x: datos.x,
        y: datos.puntos,
        mode: 'markers',
        name: 'Puntos tabla'
    };
    var funcionAproximante = {
        x: datos.x,
        y: datos.funcion,
        type: 'scatter',
        name: 'Aproximacion funcion'
    };


    Plotly.newPlot('myDiv', [puntos, funcionAproximante]);
});
