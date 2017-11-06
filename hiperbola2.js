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
      var valores = [];
      if($("#decim").val()isNumeric()){
        var decimales = $("#decim").val()isNumeric();
      } else {
          var decimales = $("#decim").val()isNumeric();
      }

        $("#tablaResultados").html("<tr><th></th><th>1/X</th><th>1/Y</th><th>1/X^2</th><th>1/xy</th></tr>");
        $('#tablaValores tr').each(function() {
            x=parseFloat($(this).find(".x").val());
            y=parseFloat($(this).find(".y").val());
            if($.isNumeric(x)
              && $.isNumeric(y)
              && y != 0 && x != 0){
                valores.push({x: x,y: y});
            }
        });

        valores.forEach(function(valor) {
            $("#tablaResultados").append("<tr><td></td><td>" + 1/valor.x + "</td>" + "<td>" + 1/valor.y + "</td>" + "<td>" +
                1/(valor.x * valor.x) + "</td>"+"<td>" + 1/(valor.x * valor.y) + "</td></tr>");
        });

        var aproximacion = aproximador.aproximacionHiperbolicaSat(valores);

        $("#tablaResultados").append("<tr><td>Σ</td><td>" + aproximacion.sumatorias.x + "</td>" + "<td>" + aproximacion.sumatorias.y + "</td>" +
            "<td>" + aproximacion.sumatorias.xx + "</td>" + "<td>" + aproximacion.sumatorias.xy + "</td></tr>");

        $("#resultado").html("Funcion aproximada: Y = ("+a+")X/(X +"+" ("+b+"))");

      Plotly.newPlot('myDiv', [aproximacion.funcion, aproximacion.puntos]);
    });
