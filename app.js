const workTag = document.querySelector(".work-display-time");
const restTag = document.querySelector(".pause-display-time");

let initWorkMin = `02`,
    initRestMin = `02`,
    workSec = `00`,
    restSec = `00`,
    workMin = initWorkMin,
    restMin = initRestMin,
    chronometerCall,
    restChronometerCall,
    isPlayed = false,
    cycles = 0;

const restChronometer = () => {
  restSec--;
  if (restSec < 0) {
    restSec = 59;
    restMin--;
    if (restMin < 10) {
      restMin = `0${restMin}`;
    }
  } else if (restSec == 0 && restMin == 0) {
    // Gestion des cycles
    cycles++;
    document.querySelector(".cycles").innerHTML = `Cycle(s) : ${cycles}`;
    clearInterval(restChronometerCall);

    workMin = initWorkMin;
    chronometerCall = setInterval(chronometer, 10);
  }
  if (restSec < 10) {
    restSec = "0" + restSec;
  }
  restTag.textContent = `${restMin}:${restSec}`;
};

const chronometer = () => {
  workSec--;
  if (workSec < 0) {
    workSec = 59;
    workMin--;
    if (workMin < 10) {
      workMin = `0${workMin}`;
    }
  } else if (workSec == 0 && workMin == 0) {
    clearInterval(chronometerCall);

    // Lancement du rest Chronometer
    restMin = initRestMin;
    restChronometerCall = setInterval(restChronometer, 10);
  }
  if (workSec < 10) {
    workSec = "0" + workSec;
  }
  workTag.textContent = `${workMin}:${workSec}`;
};

const handlePlayPause = (e) => {
  e.preventDefault();
  if (!isPlayed) {
    isPlayed = true;
    document.querySelector(".start-btn img").src = "ressources/pause.svg";
    if (restMin != initRestMin && restSec != "00") {
      restChronometerCall = setInterval(restChronometer, 10);
    } else {
      chronometerCall = setInterval(chronometer, 10);
    }
  } else {
    isPlayed = false;
    document.querySelector(".start-btn img").src = "ressources/play.svg";
    clearInterval(chronometerCall);
    clearInterval(restChronometerCall);
  }
};

const handleReset = () => {
  clearInterval(chronometerCall);
  clearInterval(restChronometerCall);
  document.querySelector(".start-btn img").src = "ressources/play.svg";
  workMin = initWorkMin;
  workSec = `00`;
  workTag.textContent = `${workMin}:${workSec}`;
  restMin = initRestMin;
  restSec = `00`;
  restTag.textContent = `${restMin}:${restSec}`;
  document.querySelector(".cycles").innerHTML = `Cycle(s) : 0`;
};

document.querySelector(".start-btn").addEventListener("click", handlePlayPause);
document.querySelector(".reset-btn").addEventListener("click", handleReset);
