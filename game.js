var altura = 0;
var largura = 0;

function verificaTamTela() {
   //pegando as proporcoes do navegador
   altura = window.innerHeight;
   largura = window.innerWidth;
   
   console.log(largura, altura);
}
verificaTamTela(); //retorna as proporcoes da tela no console


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

   document.body.appendChild(mosquito);


}

//executando a chamada de posRandom em 1200 milisecs
setInterval(function() {
   posRandom();
}, 1000)

