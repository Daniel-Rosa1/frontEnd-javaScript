const listaDeTeclas = document.querySelectorAll('.tecla');

function tocaSom(seletorAudio){
  const elemento = document.querySelector(seletorAudio)

  if(elemento && elemento.localName === 'audio'){
    elemento.play()
  }else{
    console.log('Elemento ou seletor invalido');
  }
}

for( let i = 0; i < listaDeTeclas.length; i++ ){ 
  
  const tecla = listaDeTeclas[i];
  const instumento =  tecla.classList[1];
  const idAudio = `#som_${instumento}`;
  
  tecla.onclick = function(){
    tocaSom(idAudio);
  }
  
  tecla.onkeydown = function(evento){
    if(evento.code === 'Space' || evento.code ==='Enter'){
      tecla.classList.add('ativa');
    }
  }
  tecla.onkeyup = function(){
    tecla.classList.remove('ativa');
  }
}
