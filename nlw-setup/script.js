const form = document.querySelector("#form-habits")
const nlwSetup = new NLWSetup(form)
const button = document.querySelector("header button")
const today = new Date().toLocaleDateString("pt-br").slice(0, -5)

button.addEventListener("click" , addNewDay)
form.addEventListener("change", save)

function save(){
    localStorage.setItem("NLWSetup@habits" ,JSON.stringify(nlwSetup.data))
}

function addNewDay(){
    const dayExists = nlwSetup.dayExists(today)
    !dayExists? nlwSetup.addDay(today): alert("Este dia já foi adicionado!")
}

const data = JSON.parse(localStorage.getItem("NLWSetup@habits")) || {} 
nlwSetup.setData(data)
nlwSetup.load()
