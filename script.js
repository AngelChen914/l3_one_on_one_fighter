let strength1; //1 is for user
let cunning1;
let speed1;
let fatigue1;
let originalFatigue1;
let attackValue1;
let defenseValue1;

let strengthOutput1;
let cunningOutput1;
let speedOutput1;
let fatigueOutput1;
let logOutput1;

let strength2; //2 is for computer
let cunning2;
let speed2;
let fatigue2;
let originalFatigue2;
let attackValue2;
let defenseValue2;

let strengthOutput2;
let cunningOutput2;
let speedOutput2;
let fatigueOutput2;
let logOutput2;

let disableAttack;
let disableDefense;
let toggleFinishingMove;
let finalOutput;
let restartOutput;


function initialize() {
  strength1 = 6;
  cunning1 = 6;
  speed1 = 6;
  fatigue1 = 30;
  attackValue1 = 0;
  defenseValue1 = 0;
  strengthOutput1 = document.getElementById("strength1");
  cunningOutput1 = document.getElementById("cunning1");
  speedOutput1 = document.getElementById("speed1");
  fatigueOutput1 = document.getElementById("fatigue1");
  logOutput1 = document.getElementById("log1");

  strength2 = 6;
  cunning2 = 6;
  speed2 = 6;
  fatigue2 = 30;
  attackValue2 = 0;
  defenseValue2 = 0;
  strengthOutput2 = document.getElementById("strength2");
  cunningOutput2 = document.getElementById("cunning2");
  speedOutput2 = document.getElementById("speed2");
  fatigueOutput2 = document.getElementById("fatigue2");
  logOutput2 = document.getElementById("log2");

  disableAttack = document.querySelector("#attack");
  disableDefense = document.querySelector("#defend");
  FinishingMove = document.querySelector("#finishingMove");
  FinishingMove.style.display = "none";
  finalOutput = document.getElementById("final");
  restartOutput = document.getElementById("restart");
  restartOutput.addEventListener("click", restart);
  randomizeBaseValues();
  display();
}

randomizeBaseValues = () => {
  fatigue1 = fatigue1 + Math.floor(Math.random() * 7);
  strength1 = strength1 + Math.floor(Math.random() * 2);
  speed1 = speed1 - Math.floor(Math.random() * 2);
  cunning1 = cunning1 - Math.floor(Math.random() * 2);
  originalFatigue1 = fatigue1;

  fatigue2 = fatigue2 + Math.floor(Math.random() * 7);
  strength2 = strength2 + Math.floor(Math.random() * 2);
  speed2 = speed2 - Math.floor(Math.random() * 2);
  cunning2 = cunning2 - Math.floor(Math.random() * 2);
  originalFatigue2 = fatigue2;
}

fighterOneMoves = (move) => {
  computerMoves();
  logOutput1.innerHTML += move + "\n";
  if (move === "Attack") {
    attackValue1 = Math.floor((strength1 + speed1 + cunning1) / (Math.floor(Math.random() * 3) + 1));
    defenseValue1 = speed1 + Math.floor(Math.random() * 6) + 1;
    if(attackValue2 > defenseValue1){
      fatigue1 = fatigue1 - (attackValue2 - defenseValue1);
    }
    if (attackValue1 > defenseValue2) {
      fatigue2 = fatigue2 - (attackValue1 - defenseValue2);
    } else {
      fatigue2 = (fatigue2 + Math.floor(Math.random() * 6) + 1) > originalFatigue2 ? originalFatigue2 : fatigue2 + Math.floor(Math.random() * 6) + 1;
    }
    display();
  } else if (move === "Defend") {
    defenseValue1 = speed1 + cunning1;
    if (attackValue2 !== 0 && attackValue2 > defenseValue1) {
      fatigue1 = fatigue1 - (attackValue2 - defenseValue1);
    } else if (attackValue2 !== 0) {
      fatigue1 = (fatigue1 + Math.floor(Math.random() * 6) + 1) > originalFatigue1 ? originalFatigue1 : fatigue1 + Math.floor(Math.random() * 6) + 1;
    } else {
      fatigue1 = (fatigue1 + Math.floor(Math.random() * 6) + 1) > originalFatigue1 ? originalFatigue1 : fatigue1 + Math.floor(Math.random() * 6) + 1;
      fatigue2 = (fatigue2 + Math.floor(Math.random() * 6) + 1) > originalFatigue2 ? originalFatigue2 : fatigue2 + Math.floor(Math.random() * 6) + 1;
    }
    display();
  } else {
    disableAttack.disabled = true;
    disableDefense.disabled = true;
    FinishingMove.disabled = true;
    finalOutput.innerHTML = "YOU WON! GOOD JOB!";
    restartOutput.innerHTML = "Restart";
  }
}

finshingMove = () => {
  if (fatigue2 * 2 <= fatigue1 || fatigue2 < 0) {
    FinishingMove.style.display = "inline-block";
  } else {
    FinishingMove.style.display = "none";
  }
}

computerMoves = () => {
  let move = Math.floor(Math.random() * 2); //0 is attack, 1 is defend
  if (fatigue1 * 2 > fatigue2 && !(fatigue1 < 0)) {
    logOutput2.innerHTML += move === 0 ? "Attack\n" : "Defend\n";
    if (move === 0) {
      attackValue2 = Math.floor((strength2 + speed2 + cunning2) / (Math.floor(Math.random() * 3) + 1));
      defenseValue2 = speed2 + Math.floor(Math.random() * 6) + 1;
    } else {
      attackValue2 = 0;
      defenseValue2 = speed2 + cunning2;
    }
  } else {
    disableAttack.disabled = true;
    disableDefense.disabled = true;
    FinishingMove.disabled = true;
    logOutput2.innerHTML += "Finishing\n";
    finalOutput.innerHTML = "YOU LOST THE FIGHT! GET BETTER!";
    restartOutput.innerHTML = "Restart";
  }
}

restart = () => {
  initialize();
  finalOutput.innerHTML = "";
  restartOutput.innerHTML = "";
  logOutput1.innerHTML = "";
  logOutput2.innerHTML = "";
  disableAttack.disabled = false;
  disableDefense.disabled = false;
  FinishingMove.disabled = false;
}

display = () => {
  finshingMove();
  strengthOutput1.innerHTML = `Strength: ${strength1}`;
  cunningOutput1.innerHTML = `Cunning: ${cunning1}`;
  speedOutput1.innerHTML = `Speed: ${speed1}`;
  fatigueOutput1.innerHTML = `Fatigue: ${fatigue1}`;

  strengthOutput2.innerHTML = `Strength: ${strength2}`;
  cunningOutput2.innerHTML = `Cunning: ${cunning2}`;
  speedOutput2.innerHTML = `Speed: ${speed2}`;
  fatigueOutput2.innerHTML = `Fatigue: ${fatigue2}`;
}
