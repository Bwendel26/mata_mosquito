var altura = 0;
var largura = 0;
var vidas = 1;
var tempo = 20;
var criaMosquitoTempo = 1500;

//Logica de nivel do game:
//retorna apenas os parametros a direita da interrogação no link
var nivel = window.location.search;
nivel.replace('?', ''); //retirando a interrogação do parametro

if(nivel === 'normal') {
//1500milisecs
   criaMosquitoTempo = 1500;
} else if(nivel === 'dificil') {
//1000milisecs
   criaMosquitoTempo = 1000;
}else if(nivel === 'chucknorris'){
//750milisecs
   criaMosquitoTempo = 750;
}
////////

function verificaTamTela() {
   //pegando as proporcoes do navegador
   altura = window.innerHeight;
   largura = window.innerWidth;
   
   console.log(largura, altura);
}
verificaTamTela(); //retorna as proporcoes da tela no console

//Controle de tempo do jogo
var cronometro = setInterval(() => {
   tempo -= 1;
   //ajuste para nao prosseguir com nums negativos
   if(tempo < 0) {
      //parar o fluxo do interval
      clearInterval(cronometro);
      clearInterval(criaMosquito);
      window.location.href = 'vitoria.html';
   } else {
      //modificando o valor contido entre a tag
      document.getElementById('tempo').innerHTML = tempo;
   }
}, 1000)

/////////////

function tamanhoAleatorio() {
   var classe = Math.floor(Math.random() * 3);

   switch(classe){
      case 0: 
         return 'mosquito1';
      case 1:
         return 'mosquito2';
      case 2:
         return 'mosquito3';
   }
}

function ladoAleatorio() {
   var classe = Math.floor(Math.random() * 2);

   switch(classe){
      case 0: 
         return 'ladoA';
      case 1:
         return 'ladoB';
   }
}


function posRandom() {
   //remover mosquito anterior caso exista
   if(document.getElementById('mosquito')){ //se retornar null é false
      document.getElementById('mosquito').remove() //removendo mosquito
      //controle da vida
      if(vidas> 3){
         //redirecionamento de página:
         window.location.href = 'fim_de_jogo.html';
      }else {    
         document.getElementById(`v${vidas}`).src = 'imgs/coracao_vazio.png';
         vidas++;
      }
   }

   var posX = Math.floor(Math.random() * largura) - 60;
   var posY = Math.floor(Math.random() * altura) - 60;

   posX = posX < 0 ? 0 : posX; //operador ternário
   posY = posY < 0 ? 0 : posY;

   console.log(posX, posY);

   //criar elemento html
   var mosquito = document.createElement('img');
   mosquito.src = 'imgs/mosquito.png';
   
   /*retorna aleatoriamente o tamanho e direcionamento
   do mosquito com base no switch da funcao*/
   mosquito.className = `${tamanhoAleatorio()} ${ladoAleatorio()}`; 
   
   mosquito.style.position = 'absolute';
   mosquito.style.left = `${posX}px`;
   mosquito.style.top = `${posY}px`;
   mosquito.id = 'mosquito'; //definindo id para logica de inserção/remoção
   mosquito.onclick = function() {
      this.remove(); //faz referencia ao proprio elemento
      //se o elemento for clicado antes ele é removido e nao entra 
      //no fluxo da funcao posRandom()
   }

   document.body.appendChild(mosquito);
}
