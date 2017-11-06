function aproximacionLineal(valores) {
    var datos = datosAGraficar(valores);
    var sumatorias = sumatoriaLineal(valores);
    var n = valores.length;
    var m = pendiente(sumatorias, n);
    var b = altura(sumatorias, n, m);
    datos = datosDeFuncionLineal(datos, m, b);
    var errores = erroresAproximacionLineal(datos);
    return aproximacion(sumatorias, m, b, datos, errores);
};

function erroresAproximacionLineal(datos) {
    var errores = [];
    var total = 0;
    for(i = 0; i < datos.x.length; i++) {
        var error = Math.pow(datos.puntos[i] - datos.funcion[i], 2);
        total += error;
        errores.push(error);
    }
    return {errores: errores, total: total};
}

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
    return aproximacion(sumatorias,a,b,datos);
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
    return aproximacion(sumatorias,m,b,datos);
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

function aproximacion(sumatorias, a, b, datos, errores){
  return {
      sumatorias: sumatorias,
      a: a.toFixed(2),
      b: b.toFixed(2),
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

module.exports = {
  aproximacionLineal: aproximacionLineal,
  aproximacionHiperbolica: aproximacionHiperbolica,
  aproximacionHiperbolicaSat: aproximacionHiperbolicaSat
};
