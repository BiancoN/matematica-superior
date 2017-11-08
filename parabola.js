require('./jquery-3.2.1.min')
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
    var valores = [];
    $("#tablaResultados").html(
        "<tr><th></th><th>X</th><th>Y</th><th>X^2</th><th>X^3</th><th>X^4</th><th>XY</th><th>X^2Y</th></tr>");

    $('#tablaValores tr').each(function() {
        x = parseFloat($(this).find(".x").val());
        y = parseFloat($(this).find(".y").val());
        if($.isNumeric(x) && $.isNumeric(y)) {
            valores.push({x: x, y: y});
        }
    });

    var decimales = parseInt($("#usr").val());

    try {
        var aproximacion = aproximador.parabolica(valores);

        valores.forEach(function(valor) {
            $("#tablaResultados").append("<tr><td></td><td>" + aproximador.redondear(valor.x, decimales) + "</td><td>"
                + aproximador.redondear(valor.y, decimales) + "</td><td>" +
                aproximador.redondear(Math.pow(valor.x, 2), decimales) +
                "</td><td>" + aproximador.redondear(Math.pow(valor.x, 3), decimales) + "</td><td>" +
                aproximador.redondear(Math.pow(valor.x, 4), decimales) + "</td><td>" +
                aproximador.redondear(valor.x * valor.y, decimales) + "</td><td>" +
                aproximador.redondear(Math.pow(valor.x, 2) * valor.y, decimales) + "</td></tr>");
        });
        $("#tablaResultados").append("<tr><td>Σ</td><td>" + aproximador.redondear(aproximacion.sumatorias.x, decimales) +
            "</td><td>" + aproximador.redondear(aproximacion.sumatorias.y, decimales) + "</td><td>" +
            aproximador.redondear(aproximacion.sumatorias.xx, decimales) + "</td><td>" +
            aproximador.redondear(aproximacion.sumatorias.xxx, decimales) + "</td><td>" +
            aproximador.redondear(aproximacion.sumatorias.xxxx, decimales) + "</td><td>" +
            aproximador.redondear(aproximacion.sumatorias.xy, decimales) + "</td><td>" +
            aproximador.redondear(aproximacion.sumatorias.xxy, decimales) + "</td></tr>");
    
        $("#resultado").html("Funcion aproximada: Y=(" + aproximador.redondear(aproximacion.a, decimales) +
            ")*X^2 + (" + aproximador.redondear(aproximacion.b, decimales) + ")*X + (" +
            aproximador.redondear(aproximacion.c, decimales) + ")");
        
        var funcionAproximacion = aproximador.suavizar(aproximacion.funcion,
            aproximacion.a, aproximacion.b, aproximacion.c);

        Plotly.newPlot('myDiv', [funcionAproximacion, aproximacion.puntos]);

    } catch(err) {
        console.log(err)
        alert("La matriz no puede ser resuelta porque es singular (ingresar mas valores)");
    }
});