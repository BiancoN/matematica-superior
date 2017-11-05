function aproximacionLineal(valores) {
    var datos = {
        x: [],
        puntos: [],
        funcion: []
    };
    var sumatorias = {
        x: 0,
        y: 0,
        xx: 0,
        xy: 0
    };
    valores.forEach(function(value) {
        sumatorias.x += value.x;
        sumatorias.y += value.y;
        sumatorias.xx += value.x * value.x;
        sumatorias.xy += value.x * value.y;
        datos.x.push(value.x);
        datos.puntos.push(value.y);
    });
    var n = valores.length;
    var m = ((sumatorias.xy - (sumatorias.x * sumatorias.y) / n) / (sumatorias.xx - (sumatorias.x * sumatorias.x) / n));
    var b = (sumatorias.y / n - m * (sumatorias.x / n));
    datos.x.forEach(function(x) {
        var y = m * x + b;
        datos.funcion.push(y);
    });
    var puntos = {
        x: datos.x,
        y: datos.puntos,
        mode: 'markers',
        name: 'Puntos tabla'
    };
    var funcion = {
        x: datos.x,
        y: datos.funcion,
        type: 'scatter',
        name: 'Aproximacion funcion'
    };
    var aproximacion = {
        sumatorias: sumatorias,
        m: m.toFixed(2),
        b: b.toFixed(2),
        n: n,
        funcion: funcion,
        puntos: puntos
    };
    return aproximacion;
};

function arrayMax(array) {
    return array.reduce(function(a, b) {
        return Math.max(a, b);
    });
}

function arrayMin(array) {
    return array.reduce(function(a, b) {
        return Math.min(a, b);
    });
}

module.exports = {
    aproximacionLineal: aproximacionLineal
};