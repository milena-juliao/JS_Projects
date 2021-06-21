/*OBJETO DESPESA*/
class Despesa{
	constructor(ano,mes,dia,tipo,descricao,valor){
		this.ano = ano
		this.mes = mes
		this.dia = dia
		this.tipo = tipo
		this.descricao = descricao
		this.valor = valor
	}

	validarDados(){
		for(let i in this){
			if (this[i] == undefined || this[i] == '' || this[i] == null) {
				return false
			}
		}
		return true
	}
}
/*--------------------------------------------------------*/

/*OBJETO BANCO DE DADOS*/
class Bd{
	constructor(){
		let indice = localStorage.getItem('indice')

		if(indice === null){
			localStorage.setItem('indice' , 0)
		}
	}

	getProximoIndice(){
		let proximoIndice = localStorage.getItem('indice')//o get recupera um elemento.
		return parseInt(proximoIndice) + 1
	}

	registrar(d){//função para registrar os dados.
		let indice = this.getProximoIndice()
	
		localStorage.setItem(indice , JSON.stringify(d)) //o set inclui um elemento.
		/*acessamos o local storage, onde nele acessamos o método setItem para passar o nome do item que iremos
		armazenar e o dado que vamos armazenar. No JSON vamos converter a função para sua notação.*/
		
		localStorage.setItem('indice', indice)
	}

	recuperarTodosRegistros(){

		let indice = localStorage.getItem('indice')

		//Array de despesas
		let despesas = []

		/*recuperar todas as despesas*/
		for (let i = 1; i <= indice; i++) {
			let despesa = JSON.parse(localStorage.getItem(i))

			//pular itens nulos
			if (despesa === null) {
				continue
			}
			despesa.id = i

			despesas.push(despesa)
		}
		return despesas
	}

	pesquisar(despesa){

		let despesasFiltradas = []

		despesasFiltradas =	this.recuperarTodosRegistros()

		//Filtro de: ano
		if (despesa.ano != '') {
			//O filter n atua sobre o array original, logo atribuímos ele como valor do array original dentro do if.
			despesasFiltradas = despesasFiltradas.filter(d => d.ano == despesa.ano)
		}
		
		//Filtro de: mes
		if (despesa.mes != '') {
			despesasFiltradas = despesasFiltradas.filter(d => d.mes == despesa.mes)
		}

		//Filtro de: dia
		if (despesa.dia != '') {
			despesasFiltradas = despesasFiltradas.filter(d => d.dia == despesa.dia)
		}

		//Filtro de: tipo
		if (despesa.tipo != '') {
			despesasFiltradas = despesasFiltradas.filter(d => d.tipo == despesa.tipo)
		}

		//Filtro de: descrição
		if (despesa.descricao != '') {
			despesasFiltradas = despesasFiltradas.filter(d => d.descricao == despesa.descricao)
		}

		//Filtro de: valor
		if (despesa.valor != '') {
			despesasFiltradas = despesasFiltradas.filter(d => d.valor == despesa.valor)
		}

		return despesasFiltradas

	}

	remover(id){
		localStorage.removeItem(id)
	}

}

	let bd = new Bd
/*--------------------------------------------------------*/

/*CADASTRAR DESPESA*/
function cadastrarDespesa(){

	let ano = document.getElementById('ano')
	let mes = document.getElementById('mes')
	let dia = document.getElementById('dia')

	let tipo = document.getElementById('tipo')
	let descricao = document.getElementById('descricao')
	let valor = document.getElementById('valor')

	let despesa = new Despesa(
		ano.value,
		mes.value,
		dia.value,
		tipo.value,
		descricao.value,
		valor.value
	)

	if (despesa.validarDados()) {

		bd.registrar(despesa)

		document.getElementById('erros').innerHTML = 'Registro inserido com sucesso'
		document.getElementById('campos').innerHTML = 'Despesa adicionada com sucesso'
		document.getElementById('voltar').innerHTML = 'Continuar adicionando'
		document.getElementById('erros').className = 'modal-title text-success'
		document.getElementById('voltar').className = 'btn btn-success'

		$('#registraDespesa').modal('show')

		//Limpar campos
		
		ano.value = ''
		mes.value = ''
		dia.value = ''
		tipo.value = ''
		descricao.value = ''
		valor.value = ''

	} else{

		/*document.getElementById('erros').innerHTML = 'Erros de gravação'
		document.getElementById('campos').innerHTML = 'Existem campos obrigatórios que não foram preenchidos'
		document.getElementById('voltar').innerHTML = 'Voltar e revisar'
		document.getElementById('erros').className = 'modal-title text-danger'
		document.getElementById('voltar').className = 'btn btn-danger'

		Podemos fazer dessa forma ou da forma que fiz, onde deixei a mensagem de erro no html e só a sobrepus
		quando retornasse true com as alterações dentro do if*/

		$('#registraDespesa').modal('show')

	}
	
}
/*--------------------------------------------------------*/

/*EXIBIR DESPESAS*/
function carregaListaDespesas(despesas = [], filtro = false){

	if (despesas.length == 0 && filtro == false) {
		despesas = bd.recuperarTodosRegistros()
	}
	
	let listaDespesas = document.getElementById('listaDespesas')
	listaDespesas.innerHTML = ''

	//percorrer o array despesas para listá-las
	despesas.forEach(function(d){
		//criando linhas (tr)
		let linha = listaDespesas.insertRow()

		//criando colunas (td)
		linha.insertCell(0).innerHTML = `${d.dia}/${d.mes}/${d.ano}`
		
		//Ajustar o tipo
		switch(d.tipo){
			case '1': d.tipo = 'Alimentação'
				break
			case '2': d.tipo = 'Educação'
				break
			case '3': d.tipo = 'Lazer'
				break
			case '4': d.tipo = 'Saúde'
				break
			case '5': d.tipo = 'Transporte'
				break
		}

		linha.insertCell(1).innerHTML = d.tipo
		linha.insertCell(2).innerHTML = d.descricao
		linha.insertCell(3).innerHTML = d.valor

		//Botão de exclusão de dados
		let btn = document.createElement('button')
		btn.className = 'btn btn-danger'
		btn.innerHTML = '<i class="fas fa-times"></i>'
		btn.id = d.id
		btn.onclick = function(){
			let id = this.id
			
			//remover
			bd.remover(id)

			//carregar a página logo após de remover
			window.location.reload()

		}
		linha.insertCell(4).append(btn)

	})

}

/*--------------------------------------------------------*/

/*PESQUISAR DESPESAS*/
function pesquisarDespesa(){
	let ano = document.getElementById('ano').value
	let mes = document.getElementById('mes').value
	let dia = document.getElementById('dia').value
	let tipo = document.getElementById('tipo').value
	let descricao = document.getElementById('descricao').value
	let valor = document.getElementById('valor').value

	let despesa = new Despesa(ano, mes, dia, tipo, descricao, valor)

	let despesas = bd.pesquisar(despesa)

	carregaListaDespesas(despesas, true)


}
/*--------------------------------------------------------*/



/* Cookies-> armazenados do lado do cliente.

Local Storage-> armazenamento persistente que
mesmo quando fechamos o navegador os dados continuam
salvos até que sejam excluídos.

Session Storage-> armazenamento enquanto o navegador
está aberto após seu fechamento tudo que foi salvo
é perdido. */

/* Ctrl+f5 -> Atualiza e limpa o cash */

/* O JSON transforma o objeto literal em
string para que seja conectado com uma 
aplicação externa*/

/*Array filter- usado para filtrar um array.*/