let arquivo = '100,200-150,200;20';

const valorSplit = ','
const exp = /[,;-]/;
const valores = arquivo.split(exp);

//console.log(valores);

const codigos = 'A121B12112C12212F12G01';

const regex = /[A-Z]\d+/g

const resultado = codigos.match(regex)
console.log(resultado);