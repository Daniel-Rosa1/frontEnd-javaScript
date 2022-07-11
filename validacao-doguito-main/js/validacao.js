export function valida(input){
  const tipoDeinput = input.dataset.tipo

  if(validadores[tipoDeinput]){
    validadores[tipoDeinput](input)
  }

  if(input.validity.valid){
    input.parentElement.classList.remove("input-container--invalido")
    input.parentElement.querySelector('.input-mensagem-erro').innerHTML = ''
  }else{
    input.parentElement.classList.add("input-container--invalido")
    input.parentElement.querySelector('.input-mensagem-erro').innerHTML = mostarMensagemDeErro(tipoDeinput, input);
  }

}

const tiposDeErro = [
  'valueMissing',
  'typeMismatch',
  'patternMismatch',
  'customError'
]

const mesagensDeErro = {
  nome: {
    valueMissing: 'O campo de nome não pode estar vazio.'
  },
  email: {
    valueMissing: 'O campo de E-mail não pode estar vazio.',
    typeMismatch: 'O E-mail digitado não é valido.'
  },
  senha: {
    valueMissing: 'O campo de senha não pode estar vazio.',
    patternMismatch: 'A senha deve conter entre 6 e 12 caracteres, deve conter pelo menos uma letra maiúscula e não deve conter símbolos.'
  },
  dataNascimento: {
    valueMissing: 'O campo data de nascimento não pode estar vazio.',
    customError: 'Você deve ser maior de 18 anos para se cadastrar.'
  },
  cpf:{
    valueMissing: 'O campo data de CPF não pode estar vazio.',
    customError: 'O CPF digitado não é valido.'
  },
  cep : {
    valueMissing : 'O campo de CEP não pode estar vazio.',
    patternMismatch: 'O CEP digitado não é valido',
    customError : 'Não foi possível buscar o CEP'
  },
  logradouro: {
    valueMissing : 'O campo de logradouro não pode estar vazio.',
    customError: 'O logradouro digitado não é valido.'
  },
  cidade: {
    valueMissing : 'O campo de cidade não pode estar vazio.',
    customError: 'O cidade digitado não é valido.'
  },
  estado: {
    valueMissing : 'O campo de estado não pode estar vazio.',
    customError: 'O estado digitado não é valido.'
  },
  preco:{
    valueMissing:'O campo nome não pode estar vazio.'
  }
  
}

const validadores = { 
  dataNascimento:input => validaDataNascimento(input),
  cpf: input => validaCPF(input),
  cep: input => recuperarCEP(input)
}

function mostarMensagemDeErro(tipoDeinput, input){
  let mensagem = ''

  tiposDeErro.forEach(erro => {
    if(input.validity[erro]){
      mensagem = mesagensDeErro[tipoDeinput][erro]
    }
  })

  return mensagem
}

function validaDataNascimento(input){
  const dataRecebida = new Date(input.value)
  let mensagem = ''

  if(!maiorQue18(dataRecebida)){
    mensagem = 'Você deve ser maior de 18 anos para se cadastrar.'
  }

  input.setCustomValidity(mensagem)
}

function maiorQue18(data){
  const dataAtual = new Date()
  const dataMais18 = new Date(data.getUTCFullYear() +18, data.getUTCMonth(), data.getUTCDate())

  return dataMais18 <= dataAtual
}

function validaCPF(input){
  const cpfFormatado = input.value.replace(/\D/g, '')
  let mensagem = ''

  if(!verificaCPFRepetido(cpfFormatado) || !validaEstruturaCpf(cpfFormatado)){
    mensagem = 'O cpf informado não é valido'
  }

  input.setCustomValidity(mensagem)
}

function verificaCPFRepetido(cpf){
  const valoresRepetidos = [
    '00000000000',
    '11111111111',
    '22222222222',
    '33333333333',
    '44444444444',
    '55555555555',
    '66666666666',
    '77777777777',
    '88888888888',
    '99999999999',
  ]

  let cpfValido = true

  valoresRepetidos.forEach(valor => {
    if(valor == cpf){
      cpfValido = false
    }
  })

  return cpfValido 
}

function validaEstruturaCpf(cpf){
  const multiplicador = 10
  return verificaDigitoValidador(cpf, multiplicador)
}

function verificaDigitoValidador(cpf, multiplicador){
  if(multiplicador >= 12){
    return true
  }

  let multiplicadorInicial = multiplicador
  let soma = 0

  const cpfSemDigitos = cpf.substr(0, multiplicador -1).split('')
  const digitoVerificador = cpf.charAt(multiplicador -1)

  for(let contador = 0; multiplicadorInicial > 1; multiplicadorInicial--){
    soma = soma + cpfSemDigitos[contador] * multiplicadorInicial 
    contador++
  }

  if(digitoVerificador == confirmaDigito(soma)){
    return verificaDigitoValidador(cpf, multiplicador +1)
  }

  return false
}

function confirmaDigito(soma){
  return 11- (soma % 11)
}

function recuperarCEP(input){
  const cep = input.value.replace(/\D/g, '')
  const url = `https://viacep.com.br/ws/${cep}/json/`
  const options = {
    method: 'GET',
    mode: 'cors',
    headers: {
      'content-type': 'application/json;charset=utf-8'
    }
  }   

  if(!input.validity.patternMismatch && !input.validity.valueMissing){
    fetch(url,options).then(
      response => response.json()
    ).then(
      data => {
        if(data.erro){
          input.setCustomValidity('Não foi possível buscar o CEP')
          return
        }
        input.setCustomValidity('')
        preencheCamposComCEP(data)
        return
      }
    )
  }
}

function preencheCamposComCEP(data){
  const logradouro = document.querySelector('[data-tipo="logradouro"]')
  const cidade = document.querySelector('[data-tipo="cidade"]')
  const estado = document.querySelector('[data-tipo="estado"]')

  logradouro.value = data.logradouro
  cidade.value = data.localidade
  estado.value = data.uf

}