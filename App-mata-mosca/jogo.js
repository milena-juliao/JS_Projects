//Definido a dimensão de onde os mosquitos vão aparecer.

	/*Para que não tenhamos problemas quanto ao ajuste da tela durante o jogo,
	devemos atribuir as variáveis a uma função*/

	var altura = 0 /*as varáveis são criadas do lado de fora da função para que o document
	ou outro item consiga acessá-las e imprimí-las na tela*/
	var largura = 0

	var vidas = 1 //A cada rodada do código será adicionado +1 unidade a essa variável acessando as 3 classes existentes no documento.

	var tempo = 30 //A contagem inicia do valor que inserirmos aqui.

	var nivel = window.location.search //o search nos mostra apenas o que está escrito após a ?
	nivel= nivel.replace('?','')//para que a ? não sejá considerada a substituimos pelo espaço ''.

	var tempoMosca = 2000

	function ajustaTamanho(){
		altura = window.innerHeight 
		//para sabermos a altura da tela do navegador.
		largura =  window.innerWidth 
		//para sabermos a largura da tela do navegador.

		console.log('altura: ' + altura + ' | largura: ' + largura)
		/*Se usarmos o document.write ele mostra cada vez que 
		atualizamos a página a medida que ela possui naquele
		momento. Com o console.log mostra o tamanho da página
		em cada movimentação.*/
	}

	ajustaTamanho()

	//Cronômetro.
	var cronometro = setInterval(function(){//aqui ocorre o decréscimo de uma unidade a cada rodada do código.
		tempo--
		if (tempo < 0) {//se o tempo for meno que 0, o setInterval irá parar de gerar moscas e parará de decrescer unidades.
			clearInterval(cronometro)
			clearInterval(criaMosca)

			window.location.href = 'vitoria.html'
		}else{
			document.getElementById('cronometro').innerHTML = tempo /*aqui acessamos o id cronometro e dizemos que o que irá entre a tag
			 que contém o id mencionado será o valor da var tempo*/
		}

	}, 1000)

//Randomização
	
	/*Criamos essa function para que pudéssemos acrescentar ela ao body 
	pois a chamada do Java Script estava acima do body logo o mesmo não existia
	ao executar a ação requisitada, aí criando essa função podemos acrescentar
	as ações diretamente no body.*/
	function posicaoRandomica(){
		/*remover a mosca anterior.
		Para isso condicionamos que se houver uma mosca na tela
		ela será removida após o tempo decorrido no set interval
		e será substituída por outra.*/
		if (document.getElementById('mosca')) {
			document.getElementById('mosca').remove()

			if (vidas > 3) {
				window.location.href = 'game_over.html'
			}else{
			document.getElementById('v' + vidas).src = '../App-mata-mosca/imagens/coracao_vazio.png'
			
			vidas++
			}
		}

		//Queremos que a randomização vá de 0 até a altura e largura limite do navegador.
		//Ao multiplicar o random com o valor do tamnho máximo da altura e largura conseguimos esse efeito.
		//Usando o Math.floor arredondamos a coordenada para baixo.
		var posicaoX = Math.floor(Math.random() * largura) - 90 //subtraímos 90 para que a imagem não ultrapasse o limite visível da tela.
		//math.random é usado para randomizar uma ação.
		var posicaoY = Math.floor(Math.random() * altura) - 90

		posicaoX = posicaoX < 0 ? 0 : posicaoX
		posicaoY = posicaoY < 0 ? 0 : posicaoY
		/*? é como se fosse um if e o : é o else. Logo, se a posicao for menor que 0 
		ela irá valer 0 senão será o seu próprio valor.
		Isso foi feito para que o valor n seja negativo e acabe também sumindo da tela.*/

		console.log(posicaoY, posicaoX)

		//Criando elementos html
		var mosca = document.createElement('img') //criamos um novo elemento html.
		mosca.src = '../App-mata-mosca/imagens/mosca.png' //atribuimos a essa variável o caminho da imagem desejada.
		mosca.className = tamanhoMosca() + ' ' + ladoMosca()//atribuimos a essa imagem a classe que permite que a mesma seja estlizada.
		//também atribuimos o espaço para que o interpretador entenda que se trata de duas classes e concatenamos a randomização do lado ao tamanho da mosca.
		mosca.style.left = posicaoX + 'px' //dentro do estilo dizemos que a esquerda estará a variação da posicaoX.
		mosca.style.top = posicaoY + 'px' //dentro do estilo dizemos que no topo estará a variação da posicaoY.
		mosca.style.position = 'absolute' //para que as coordenadas sejam aplicadas a posição deve ser absoluta.
		mosca.id = 'mosca'
		mosca.onclick = function(){//o this ajusta o contexto de umde um atributo ou método.
			this.remove()
		}

		document.body.appendChild(mosca) //incluimos ele como filho do body.
		
	}

//Randomização de tamanho
	function tamanhoMosca() {
		var classe = Math.floor(Math.random()*3)

		
		if (classe == 0) {//se o valor da randomização da classe for 0, será atribuido o estilo de mosca1.
			return 'mosca1'
		} else if (classe == 1) {//se o valor da randomização da classe for 1, será atribuido o estilo de mosca2.
			return 'mosca2'
		} else{//se o valor da randomização da classe for 2, será atribuido o estilo de mosca3.
			return 'mosca3'
		}

		//o return pode ser usado sempre que queremos que um comando retorne algo para nós independente do contexto.
	}

//Randomização do lado da mosca
	function ladoMosca() {
		var classe = Math.floor(Math.random()*2)

		if (classe == 0) {
			return 'ladoA'
		} else{
			return 'ladoB'
		} 
	}

//Seleção de Nível
if (nivel === 'normal') {
	tempoMosca
} else if (nivel === 'dificil') {
	tempoMosca = 1500
} else if (nivel === 'baygon') {
	tempoMosca = 1100
}

