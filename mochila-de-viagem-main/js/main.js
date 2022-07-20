const form = document.getElementById("novoItem")
const list = document.getElementById('lista')
const itens = JSON.parse(localStorage.getItem("itens"))||[]
//JSON.parse()converte um JSON em um objeto js

itens.forEach((element) => {
  createElement(element)
})

form.addEventListener('submit', (evento) =>{
    evento.preventDefault()
    const name =evento.target.elements["nome"]
    const amount = evento.target.elements["quantidade"]
    const existingItem = itens.find(element => element.name === name.value)//verifica se existe o nome do item dentro do array itens

    const currentItem = {
      "name": name.value,
      "amount": amount.value
    }

    if(existingItem){//se existir, o item que esta sendo criado recebe o id do item já existente e chama a funcao de atualizar o item
      currentItem.id = existingItem.id
      updateElement(currentItem)
      itens[itens.findIndex(element => element.id === existingItem.id)] = currentItem
    }else{//se nap existir, o novo item recebe como id = tamanho do array itens
      currentItem.id = itens[itens.length-1]
      ? (itens[itens.length-1]).id + 1
      :0
      createElement(currentItem)
      
      itens.push(currentItem)
      /* criamos um objeto "currentItem" e o adicionamos em um array "itens" */
    }

    
    localStorage.setItem("itens", JSON.stringify(itens))
    //localStorage aceita somente String, logo temos que usar o metodo JSON.stringfy() 
    //para transforma nosso objeto ("itens" é um array de objetos) em em string
    

    name.value=''
    amount.value=''
})


/*
  não usar a posição do array de element target[0], pois caso haja uma alteração no HTML
 o programa irá parar de funcionar.
 Use target.elements['nomeDoElemento']procurando pelo nome do elemento, assim mesmo havendo mudannças no HTML, o programa irá continuar funcionando. Para pegar seu valor adicione um
 (.value), assim ficando evento.target["nomeDoElemento"].value, seu retorno é o valor adicionado a este elemento
 */

function createElement({name,amount,id}){
    const newItem = document.createElement("li")
    newItem.classList.add("item")

    const amountItem = document.createElement("strong")
    amountItem.innerHTML = amount
    amountItem.dataset.id = id

    newItem.appendChild(amountItem)
    // appendChild() insere um elemento criado dentro do outro
    newItem.innerHTML += name 
    newItem.appendChild(createDeleteButton(id))

    list.appendChild(newItem)
}


function updateElement({id, amount }){
  document.querySelector(`[data-id="${id}"]`).innerHTML = amount
}

function createDeleteButton(id){
  const elementButton = document.createElement("button")
  elementButton.innerText = "X"

  elementButton.addEventListener("click", function(){
    deleteElement(this.parentNode, id)
  })
  return elementButton
}

function deleteElement(tag,id){
  tag.remove()

  itens.splice(itens.findIndex(element => element.id === id),1)

  localStorage.setItem("itens", JSON.stringify(itens))
}