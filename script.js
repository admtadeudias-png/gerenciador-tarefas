const input = document.getElementById('inputTarefa')
const botao = document.getElementById('btnAdicionar')
const lista = document.getElementById('listaTarefas')
const filtroTodas = document.getElementById('filtroTodas')
const filtroPendentes = document.getElementById('filtroPendentes')
const filtroConcluidas = document.getElementById('filtroConcluidas')
const botaoExcluir = document.createElement('button')
const botaoEnviar = document.getElementById('enviarWhatsApp')
botaoEnviar.addEventListener('click', enviarListaWhatsApp)
botaoExcluir.innerText = '🗑'
botaoExcluir.style.border = 'none'
botaoExcluir.style.background = 'transparent'
botaoExcluir.style.cursor = 'pointer'


let tarefas = []
let filtroAtivo = 'todas' // variável que guarda o filtro ativo

// Carregar tarefas salvas
const tarefasSalvas = localStorage.getItem('tarefas')
if(tarefasSalvas){
    tarefas = JSON.parse(tarefasSalvas)
    renderizarTarefas()
    atualizarContador()
}

// Eventos
botao.addEventListener('click', adicionarTarefa)
input.addEventListener('keydown', (event) => {
    if(event.key === 'Enter'){
        adicionarTarefa()
    }
})

// Adicionar tarefa
function adicionarTarefa(){
    const tarefaTexto = input.value.trim()
    if(tarefaTexto === ''){
        alert('Digite uma tarefa')
        return
    }

    tarefas.push({ texto: tarefaTexto, concluida: false })
    input.value = ''
    salvarERenderizar()
}

// Salvar e renderizar de acordo com o filtro ativo
function salvarERenderizar(){
    localStorage.setItem('tarefas', JSON.stringify(tarefas))
    atualizarContador()
    renderizarTarefas()
}

// Criar tarefa na tela
function criarTarefaNaTela(tarefa){

const li = document.createElement('li')

const checkbox = document.createElement('input')
checkbox.type = 'checkbox'
checkbox.checked = tarefa.concluida

const span = document.createElement('span')
span.innerText = tarefa.texto

if(tarefa.concluida){
    span.classList.add('concluida')
}

const botaoZap = document.createElement('button')
    botaoZap.innerText = '📲'
    botaoZap.addEventListener('click',(e)=>{
        e.stopPropagation()
        enviarWhatsApp(tarefa.texto)       
        
    })

    



function enviarListaWhatsApp(){

const numero = document.getElementById('numeroWhatsApp').value

if(numero === ''){
alert('Digite seu número de WhatsApp')
return
}

let mensagem = '📋 Minhas tarefas:%0A%0A'

tarefas.forEach(function(tarefa){

const status = tarefa.concluida ? '✔' : '☐'

mensagem += `${status} ${tarefa.texto}%0A`

})

const url = `https://wa.me/55${numero}?text=${mensagem}`

window.open(url,'_blank')

}



checkbox.addEventListener('change', () => {

    tarefa.concluida = checkbox.checked

    if(tarefa.concluida){
        span.classList.add('concluida')
    }else{
        span.classList.remove('concluida')
    }

    salvarERenderizar()
})

    // Botão excluir
    const botaoExcluir = document.createElement('button')
botaoExcluir.innerText = '🗑'

botaoExcluir.addEventListener('click', (e)=>{
    e.stopPropagation()

    tarefas = tarefas.filter(t => t !== tarefa)

    salvarERenderizar()
})

    li.appendChild(checkbox)
li.appendChild(span)
li.appendChild(botaoExcluir)


lista.appendChild(li)
}

// Renderizar lista de acordo com o filtro ativo
function renderizarTarefas(){

    lista.innerHTML = ''

    let listaFiltrada = tarefas

    if(filtroAtivo === 'pendentes'){
        listaFiltrada = tarefas.filter(t => t.concluida === false)
    }

    if(filtroAtivo === 'concluidas'){
        listaFiltrada = tarefas.filter(t => t.concluida === true)
    }

    listaFiltrada.forEach(function(tarefa){
        criarTarefaNaTela(tarefa)
    })
}

// Atualizar contador
function atualizarContador(){

    let total = tarefas.length

    let pendentes = tarefas.filter(function(tarefa){
        return tarefa.concluida === false
    }).length

    let concluidas = tarefas.filter(t => t.concluida === true).length

    document.getElementById('contador').innerText =
    `Total: ${total} | Pendentes: ${pendentes}`

    let porcentagem = 0

    if(tarefas.length > 0){
        porcentagem = (concluidas / tarefas.length) * 100
    }

    document.getElementById('barraProgresso').style.width = porcentagem + '%'

}


// Filtros
filtroTodas.addEventListener('click', () => {
    filtroAtivo = 'todas'
    renderizarTarefas()
})

filtroPendentes.addEventListener('click', () => {
    filtroAtivo = 'pendentes'
    renderizarTarefas()
})

filtroConcluidas.addEventListener('click',() => {
    filtroAtivo = 'concluidas'
    renderizarTarefas()
})

function enviarListaWhatsApp(){

const numero = document.getElementById('numeroWhatsApp').value

if(numero === ''){
alert('Digite seu número de WhatsApp')
return
}

let mensagem = '📋 *Minhas tarefas*\n\n'

let pendentes = tarefas.filter(t => !t.concluida).length
let concluidas = tarefas.filter(t => t.concluida).length

mensagem += `📊 Status\n`
mensagem += `Pendentes: ${pendentes}\n`
mensagem += `Concluídas: ${concluidas}\n\n`

mensagem += '────────────\n\n'

tarefas.forEach(function(tarefa){

const status = tarefa.concluida ? '✅' : '⬜'

mensagem += `${status} ${tarefa.texto}\n`

})

mensagem += '\n────────────\n'
mensagem += '\n *Não esquecer* !'

const url = `https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}`
window.open(url, '_blank')}