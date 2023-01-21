const buttonOpenModal = document.querySelector("#openModal")
const modalWrapper = document.querySelector(".modal-wrapper")


buttonOpenModal.onclick= function(){
    modalWrapper.classList.toggle("invisible")
}

document.addEventListener("keydown", function(event){
    
    const isEscKey = event.key === 'Escape'
    if(isEscKey){

        modalWrapper.classList.add("invisible")
    }
})