//Dados da entidade
//Preencher lista de estados:

function populateUFs(){
    const ufSelect = document.querySelector("select[name=uf]")
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then(function(res){return res.json()})
    .then(function(states){
        for(const state of states){
            ufSelect.innerHTML += `<option value = "${state.id}">${state.nome}</option>`
        }
    })
}
populateUFs()

//Mostrar lista de cidades do estado sleecionado:

function getCities(event){
    const citySelect = document.querySelector("select[name=city]")
    const stateInput = document.querySelector("input[name=state]")
    const ufValue = event.target.value
    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text
    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`
    citySelect.innerHTML = "<option value>Selecione a cidade</option>"
    citySelect.disabled = true
    fetch(url)
    .then((res) => {return res.json()})
    .then(function(cities){
        for(const city of cities){
            citySelect.innerHTML += `<option value = "${city.nome}">${city.nome}</option>`
        }
        citySelect.disabled = false
    })
}
document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities)

//Ítens de coleta

//Pegar todos os li's:

const itemsToCollect = document.querySelectorAll(".items-grid li")
for(const item of itemsToCollect){
    item.addEventListener("click", handleSelectedItem)
}

const collectedItems = document.querySelector("input[name=items]")
let selectedItems = []

function handleSelectedItem(event){

    //Adicionar ou remover a classe "selected": 
    const itemLi = event.target
    itemLi.classList.toggle("selected") //("add" adiciona uma classe, "remove" remove uma classe e "toggle" criar um botão de ativar/desativar a classe)

    const itemId = itemLi.dataset.id

    // console.log('ITEM ID: ', itemId)

    //Verificar se existem itens selecionados e acessá-los:
    const alreadySelected = selectedItems.findIndex(function(item){
        const itemFound = item == itemId
        return itemFound
    })

    //Se selecionar um ítem já selecionado, retirá-lo da seleção:
    if(alreadySelected >= 0){
        const filteredItems = selectedItems.filter(function(item){
            const itemIsDifferent = item != itemId
            return itemIsDifferent
        })
        selectedItems = filteredItems

    }else{ //Se selecionar um ítem não selecionado, adicioná-lo à seleção:
        selectedItems.push(itemId)
    }
    
    // console.log('selectedItems: ', selectedItems)

    //adicionar os ítens selecionados ao input hidden:
    collectedItems.value = selectedItems
}

