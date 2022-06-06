  let seconds = 00;
  let millisecond = 00; 
  let minutes = 0;
  let appendSeconds = document.getElementById("seconds")
  let appendMillisecond = document.getElementById("millisecond")
  let appendMinutes = document.getElementById("minutes")
  let interval;

  function start(){
    clearInterval(interval)
     interval =setInterval(startTimer, 10)
  }

  function pause(){
    clearInterval(interval)
  }

  function reset(){
    clearInterval(interval)
    millisecond = 0
    seconds = 0
    minutes = 0
    appendMillisecond.innerHTML = addZero(millisecond)
    appendSeconds.innerHTML = addZero(seconds)
    appendMinutes.innerHTML = addZero(minutes)
  }


  function startTimer(){
    millisecond++

    appendMillisecond.innerHTML = addZero(millisecond)
    appendSeconds.innerHTML = addZero(seconds)
    appendMinutes.innerHTML = addZero(minutes)

    if( millisecond == 99){
      seconds++
      millisecond = 0
    } 

    if(seconds == 60){
      minutes ++
      seconds = 0
    }

    if(minutes ==60){
      pause()
    }
  }

  function addZero(numero){
    let retorno
    if(numero <= 9){
      retorno = '0'+numero
    }

    if(numero >= 10){
      retorno = numero
    }

    return retorno
  }


