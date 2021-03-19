//Chamar a página #modal quando clicar no botão "Pesquisar pontos de coleta", e fechar a página #modal quando clicar no botão de X:

const buttonSearch = document.querySelector("#page-home main a")
const modal = document.querySelector("#modal")
const close = document.querySelector("#modal .header a")

buttonSearch.addEventListener("click", function(){
    modal.classList.remove("hide")
    event.preventDefault()
})

close.addEventListener("click", function(){
    modal.classList.add("hide")
})