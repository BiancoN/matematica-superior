function erroresAproximacion(datos) {
    var errores = [];
    var total = 0;
    for(i = 0; i < datos.x.length; i++) {
        var error = Math.pow(datos.puntos[i] - datos.funcion[i], 2);
        total += error;
        errores.push(error);
    }
    return {errores: errores, total: total};
}
function aproximacionLineal(valores) {
    var datos = datosAGraficar(valores);
    var sumatorias = sumatoriaLineal(valores);
    var n = valores.length;
    var m = pendiente(sumatorias, n);
    var h = altura(sumatorias, n, m);
    datos = datosDeFuncionLineal(datos, m, h);
    var errores = erroresAproximacion(datos);
    return aproximacion('Lineal', sumatorias, m, h, datos, errores);
};
function sumatoriaLineal(valores){
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
  });
  return sumatorias;
};

function datosDeFuncionLineal(datos,m,h){
  datos.x.forEach(function(x) {
      var y = m * x + h;
      datos.funcion.push(y);
  });
  return datos;
};

function aproximacionHiperbolica(valores) {
    var datos = datosAGraficar(valores);
    var sumatorias = sumatoriaHiperbolica(valores);
    var n = valores.length;
    var m = pendiente(sumatorias,n);
    var h = altura(sumatorias,n,m);
    a = 1/m
    b = h*a
    datos = datosDeFuncionHiperbolica(datos,a,b);
    var errores = erroresAproximacion(datos);
    return aproximacion('Hiperbolica', sumatorias, a, b, datos, errores);
};

function sumatoriaHiperbolica(valores){
  var sumatorias = {
      x: 0,
      y: 0,
      xx: 0,
      xy: 0
  };
  valores.forEach(function(value) {
      sumatorias.x += value.x;
      sumatorias.y += 1/value.y;
      sumatorias.xx += value.x * value.x;
      sumatorias.xy += value.x / value.y;
  });
  return sumatorias;
};
function datosDeFuncionHiperbolica(datos,a,b){
  datos.x.forEach(function(x) {
    if ((x + b) != 0)
      var y = a / (x + b);
      datos.funcion.push(y);
  });
  return datos;
};

function aproximacionHiperbolicaSat(valores) {
    var datos = datosAGraficar(valores);
    var sumatorias = sumatoriaHiperbolicaSat(valores);
    var n = valores.length;
    var m = pendiente(sumatorias,n);
    var h = altura(sumatorias,n,m);
    a = 1/h
    b = m*a
    datos = datosDeFuncionHiperbolicaSat(datos,a,b);
    var errores = erroresAproximacion(datos);
    return aproximacion('Hiperbolica de saturacion', sumatorias, a, b, datos, errores);
};
function sumatoriaHiperbolicaSat(valores){
  var sumatorias = {
      x: 0,
      y: 0,
      xx: 0,
      xy: 0
  };
  valores.forEach(function(value) {
      sumatorias.x += 1/value.x;
      sumatorias.y += 1/value.y;
      sumatorias.xx += 1/(value.x * value.x);
      sumatorias.xy += 1/(value.x * value.y);
  });
  return sumatorias;
}
function datosDeFuncionHiperbolicaSat(datos,a,b){
  datos.x.forEach(function(x) {
      var y = a * x /( x + b);
      datos.funcion.push(y);
  });
  return datos;
}

function aproximacionExp(valores) {
    var datos = datosAGraficar(valores);
    var sumatorias = sumatoriaExp(valores);
    var n = valores.length;
    var m = pendiente(sumatorias, n);
    var h = altura(sumatorias, n, m);
    a = Math.exp(h)
    b = m
    datos = datosDeFuncionExp(datos, a, b);
    var errores = erroresAproximacion(datos);
    return aproximacion('Exponencial', sumatorias, a, b, datos, errores);
};

function sumatoriaExp(valores){
  var sumatorias = {
      x: 0,
      y: 0,
      xx: 0,
      xy: 0
  };
  valores.forEach(function(value) {
      sumatorias.x += value.x;
      sumatorias.y += Math.log(value.y);
      sumatorias.xx += value.x * value.x;
      sumatorias.xy += value.x * Math.log(value.y);
  });
  return sumatorias;
};

function datosDeFuncionExp(datos,a,b){
  datos.x.forEach(function(x) {
      var y = a * Math.exp(b * x)
      datos.funcion.push(y);
  });
  return datos;
};

function aproximacionPot(valores) {
    var datos = datosAGraficar(valores);
    var sumatorias = sumatoriaPot(valores);
    var n = valores.length;
    var m = pendiente(sumatorias, n);
    var h = altura(sumatorias, n, m);
    a = Math.exp(h)
    b = m
    datos = datosDeFuncionPot(datos, a, b);
    var errores = erroresAproximacion(datos);
    return aproximacion('Potencial', sumatorias, a, b, datos, errores);
};

function sumatoriaPot(valores){
  var sumatorias = {
      x: 0,
      y: 0,
      xx: 0,
      xy: 0
  };
  valores.forEach(function(value) {
      sumatorias.x += Math.log(value.x);
      sumatorias.y += Math.log(value.y);
      sumatorias.xx += Math.log(value.x) * Math.log(value.x);
      sumatorias.xy += Math.log(value.x) * Math.log(value.y);
  });
  return sumatorias;
};

function datosDeFuncionPot(datos,a,b){
  datos.x.forEach(function(x) {
      var y = a * Math.pow(x,b)
      datos.funcion.push(y);
  });
  return datos;
};


function datosAGraficar(valores){
  var datos = {
      x: [],
      puntos: [],
      funcion: []
  };
  valores.forEach(function(value) {
      datos.x.push(value.x);
      datos.puntos.push(value.y);
  });
  return datos;
}

function aproximacion(nombre, sumatorias, a, b, datos, errores, c) {
    if(!c)
        c = 0;
    return {
        nombre, nombre,
        sumatorias: sumatorias,
        a: a.toFixed(2),
        b: b.toFixed(2),
        c: c.toFixed(2),
        funcion: {
            x: datos.x,
            y: datos.funcion,
            type: 'scatter',
            name: 'Aproximacion funcion'
        },
        puntos: {
            x: datos.x,
            y: datos.puntos,
            mode: 'markers',
            name: 'Puntos tabla'
        },
        errores: errores
    };
}

function pendiente(sumatorias,n){
  return ((sumatorias.xy - (sumatorias.x * sumatorias.y) / n) / (sumatorias.xx - (sumatorias.x * sumatorias.x) / n));
}

function altura(sumatorias,n,m){
  return (sumatorias.y / n - m * (sumatorias.x / n));
}

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

function aproximacionParabolica(valores) {
    var datos = datosAGraficar(valores);
    var sumatorias = sumatoriaParabola(valores);
    var n = valores.length;
    var coeficientes = calcularCoeficientesParabolicos(n, sumatorias);
    datos = datosDeFuncionParabolica(datos, coeficientes);
    var errores = erroresAproximacion(datos);
    return aproximacion('Parabolica', sumatorias, coeficientes[2][0], coeficientes[1][0], datos, errores,
        coeficientes[0][0]);
}

function sumatoriaParabola(valores) {
    var sumatorias = {
        x: 0,
        y: 0,
        xx: 0,
        xxx: 0,
        xxxx: 0,
        xy: 0,
        xxy: 0
    };
    valores.forEach(function(valor) {
        sumatorias.x += valor.x;
        sumatorias.xx += Math.pow(valor.x, 2);
        sumatorias.xxx += Math.pow(valor.x, 3);
        sumatorias.xxxx += Math.pow(valor.x, 4);
        sumatorias.y += valor.y;
        sumatorias.xy += valor.x * valor.y;
        sumatorias.xxy += Math.pow(valor.x, 2) * valor.y;
    });
    return sumatorias;
};

function calcularCoeficientesParabolicos(n, sumatorias) {
    var m = [[n, sumatorias.x, sumatorias.xx], [sumatorias.x, sumatorias.xx, sumatorias.xxx],
        [sumatorias.xx, sumatorias.xxx, sumatorias.xxxx]];
    var s = [sumatorias.y, sumatorias.xy, sumatorias.xxy];
    return math.lusolve(m, s);
};

function datosDeFuncionParabolica(datos, coeficientes) {
    var a = coeficientes[2][0];
    var b = coeficientes[1][0];
    var c = coeficientes[0][0];
    datos.x.forEach(function(x) {
        var y = a * x * x + b * x + c;
        datos.funcion.push(y);
    })
    return datos;
};

function redondear(valor, decimales) {
    var redondeo = 10 ** decimales;
    return Math.round(valor * redondeo) / redondeo;
};

function suavizar(funcion, a, b, c) {
    var funcionSuave = Object.assign({}, funcion);
    funcionSuave.x = [];
    funcionSuave.y = [];
    var minimo = arrayMin(funcion.x);
    var maximo = arrayMax(funcion.x);
    for(i = 0; i < 1000; i++) {
        funcionSuave.x[i] = minimo + i * ((maximo - minimo) / 1000);
        funcionSuave.y[i]= parseFloat(c) + funcionSuave.x[i] * parseFloat(b) +
            funcionSuave.x[i] * funcionSuave.x[i] * parseFloat(a);
    }
    return funcionSuave;
};

function comparar(aproximaciones) {
    var mejorAproximacion = aproximaciones.reduce(function(a, b) {
        if(isNaN(a.errores.total))
            return b;
        else if(isNaN(b.errores.total))
            return a;
        else if(a.errores.total <= b.errores.total)
            return a;
        else
            return b;
    });
    return mejorAproximacion.nombre;
};

module.exports = {
    redondear: redondear,
    suavizar: suavizar,
    comparar: comparar,
    lineal: aproximacionLineal,
    exponencial: aproximacionExp,
    potencial: aproximacionPot,
    hiperbolica: aproximacionHiperbolica,
    hiperbolicaSat: aproximacionHiperbolicaSat,
    parabolica: aproximacionParabolica
};
