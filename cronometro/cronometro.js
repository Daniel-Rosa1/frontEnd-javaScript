  let seconds = 0;
  let millisecond = 8; 
  let appendSeconds = document.getElementById("seconds")
  let appendMillisecond = document.getElementById("millisecond")
  let interval;

  function start(){
    startTimer()
  }


  function startTimer(){
    millisecond++

    if(millisecond < 10){
      appendMillisecond.innerHTML = "0" + millisecond
    }else{
      appendMillisecond.innerHTML = millisecond
    }

    if(seconds < 10){
      appendSeconds.innerHTML = "0" + seconds
    }else{
      appendSeconds.innerHTML = seconds
    }

    if( millisecond => 99){
      seconds++
      millisecond = 0
    } 
    
  }