let tarefas = []


const input = document.getElementById('tarefaInput')
input.addEventListener("keypress", function(event){
 if(event.key === "Enter"){ adicionarTarefa() }})
const botao = document.getElementById("adicionarBtn")
const lista = document.getElementById('listaTarefas')

const tarefasSalvas = localStorage.getItem('tarefas')
if(tarefasSalvas){
    tarefas = JSON.parse(tarefasSalvas)
    mostrarTarefas()
}


botao.addEventListener("click", adicionarTarefa)

function adicionarTarefa(){

    const texto = input.value

    if(texto === ""){
        alert('Digite uma tarefa!!!')
        return
    }

    tarefas.push(texto)

    salvarTarefas()

    mostrarTarefas()

    input.value = ""

}

function mostrarTarefas(){

    lista.innerHTML = ""

    tarefas.forEach(function(tarefa, index){

        const item = document.createElement('li')

        item.innerText = tarefa

        const botaoExcluir = document.createElement('button')

        botaoExcluir.innerText = '❌'

        botaoExcluir.addEventListener('click', function(){
            tarefas.splice(index, 1)
            salvarTarefas()
            mostrarTarefas()
        })

        item.addEventListener('click', function(){
            item.classList.toggle('concluida')
        })

        item.appendChild(botaoExcluir)

        lista.appendChild(item)

    })

}

function salvarTarefas(){

    localStorage.setItem('tarefas', JSON.stringify(tarefas))

}