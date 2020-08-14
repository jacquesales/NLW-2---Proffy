
document.querySelector("#add-time") // Procurar e selecionar o botão
.addEventListener('click', cloneField) // Quando ocorrer o evento click no botão, realizar a funcionalidade cloneField

function cloneField() { // Executar uma ação, nesse caso a cloneField está endo criada pois não existe previamente no JS
    const newFieldContainer = document.querySelector('.schedule-item').cloneNode(true) // Pegar os campos e duplicá-los com a condição boolean, guardando-a numa const para não alterar os valores posteriormente
    const fields = newFieldContainer.querySelectorAll('input') // Limpar os campos antes mesmo de duplicá-los na página
    fields.forEach(function(field) { // e para cada campo clonado, limpar. Pega o field do momento
        field.value = "" // e limpa o field do momento
    }) 

    document.querySelector('#schedule-items').appendChild(newFieldContainer) // Colocar a funcionalidade de duplicar na parte referenciada da página
}