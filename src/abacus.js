const DATA_CURRENT = "current";
const DATA_VALUE = "value";
const RENDER_DELAY = 100; //in ms

var beads = [];
var sums = [];
var currentStep = 0;
var stepOptions = {
   0: {
      message: "Welcome to the basic tutorial!",
      elements: ["message"],
      styles: ["font-size:1em"]
   },
   1: {
      message: "Each abacus rod represents one digit in a number.",
      elements: ["message"],
      styles: ["font-size:0.75em"]
   },
   2: {
      message: "The bottom beads are called earth beads (unit beads) and have value of one.",
      elements: ["message"],
      styles: ["font-size:0.75em"]
   },
   3: {
      message: "The top beads are called heaven beads and have value of five.",
      elements: ["message"],
      styles: ["font-size:0.75em"]
   },
   4: {
      message: "To represent numbers, move beads to the center beam. For example, this is 3.",
      elements: ["message"],
      styles: ["font-size:0.75em"]
   }
};

function main() {
  initializeBeads();
  if (document.getElementById("addend1")) generateMathQuestion(3, 1); // 0 = substraction, 1 = addition
}

function reset() {
  resetBeads();
  if (document.getElementById("addend1")) generateMathQuestion(3, 1); // 0 = substraction, 1 = addition
}

function initializeBeads() {
  beads = getBeads();
  sums = getRowSums();
  for (var i = 0; i < beads.length; i++) {
    beads[i].onclick = moveBead;
  }
}

function getRowSums() {
  return getTdFromTable("place-value");
}

function getBeads() {
  return getTdFromTable("abacus", bead => !isSeparator(bead));
}

function getTdFromTable(tableId, filter = param => true) {
  if (document.getElementById(tableId)) {
    unfilteredTds = [...document.getElementById(tableId).querySelectorAll("td")];
    return unfilteredTds.filter(bead => filter);
  }
}
function moveBead(e) {
  if (isValueSet(this)) {
    clearValue(this);
  } else {
    setValue(this);
  }
}

function resetBeads() {
  for (var i = 0; i < beads.length; i++) {
    bead = beads[i];
    if (!isSeparator(bead)) {
      clearValue(bead);
    }
  }
  document.getElementById("total").innerHTML = "";
}

function clearValue(bead) {
  let delay = 0;
  nextSibling = getNextBead(bead);
  if (nextSibling && isValueSet(nextSibling)) {
    delay = RENDER_DELAY + clearValue(nextSibling);
  }
  updateValue(bead, 0);
  renderClearValue(bead, delay);
  return delay;
}

function setValue(bead) {
  let delay = 0;
  prevSibling = getPrevBead(bead);
  if (prevSibling && !isValueSet(prevSibling)) {
    delay = RENDER_DELAY + setValue(prevSibling);
  }
  updateValue(bead, bead.dataset[DATA_VALUE]);
  renderSetValue(bead, delay);
  return delay;
}

function updateValue(bead, newValue) {
  bead.dataset[DATA_CURRENT] = newValue;
  updateSum(bead.dataset["sum"], bead.parentElement.children);
}

function getNextBead(bead) {
  let nextSibling = bead.nextElementSibling;
  if (isSeparator(nextSibling)) {
    nextSibling = undefined;
  }
  return nextSibling;
}

function getPrevBead(bead) {
  let prevSibling = bead.previousElementSibling;
  if (isSeparator(bead)) {
    prevSibling = undefined;
  }
  return prevSibling;
}

function isValueSet(bead) {
  let value = bead.dataset[DATA_VALUE];
  let state = bead.dataset[DATA_CURRENT];
  return value == state;
}

function isUpperBead(bead) {
  return bead.className == "upper";
}

function isSeparator(bead) {
  return bead && bead.className == "separator";
}

async function renderClearValue(bead, delay) {
  await sleep(delay);
  if (isUpperBead(bead)) {
    bead.style.top = -1 * bead.clientHeight + "px";
  } else {
    bead.style.top = "0px";
  }
}

async function renderSetValue(bead, delay) {
  await sleep(delay);

  if (isUpperBead(bead)) {
    bead.style.top = "0px";
  } else {
    bead.style.top = -1 * bead.clientHeight + "px";
  }
}

async function sleep(msec) {
  return new Promise(resolve => {
    setTimeout(resolve, msec);
  });
}

function getMessageText(stepOption) {
  return stepOption.message ? stepOption.message : "";
}

function getElements(stepOption) {
  return stepOption.element ? stepOption.element : [];
}

function getElementsStyle(stepOption) {
   return stepOption.style ? stepOption.style : [];
}

function getElementsResetStyle(stepOption) {
   return stepOption.resetStyle ? stepOption.resetStyle : [];
}

function setElementsStyle(elements, elementsStyle) {
  for (let i=0; i < elements.length; i++) {
    console.log(elements[i]);
    console.log(elementsStyle[i]);
    document.getElementById(elements[i]).style = elementsStyle[i];
    
  }
}

function showTutorial(step) {
  let message = document.getElementById("message");  
  
  currentStep += step;
  validationCurrentStep();

  let stepOption = stepOptions[currentStep];

  if (stepOptions) {    
    message.innerHTML = getMessageText(stepOption);
    setElementsStyle(stepOption.elements, stepOption.styles);
  }

  let canvas = document.getElementById("canvas");
  let ctx = canvas.getContext("2d");

  drawTutorial(ctx, currentStep);
  

  console.log(currentStep);
}

function drawTutorial(ctx, step) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  switch(step) {
    case 1:
      ctx.lineWidth = 3;
      ctx.strokeStyle = "#66ff00";
      for (let x = 40; x <= 1177; x += 147) {
         ctx.strokeRect(x, 32, 136, 500);
      }
      break;      
    case 2:
      ctx.lineWidth = 3;
      ctx.strokeStyle = "#66ff00";
      ctx.strokeRect(35, 250, 1175, 265);
      ctx.fillStyle = "#66ff00";
      ctx.font = "36px Georgia";
      ctx.fillText("= 1", 1220, 388);      
      break;
    case 3:
      ctx.lineWidth = 3;
      ctx.strokeStyle = "#66ff00";
      ctx.strokeRect(40, 32, 1175, 113);
      ctx.fillStyle = "#66ff00";
      ctx.font = "36px Georgia";
      ctx.fillText("= 5", 1220, 95);
      break;     
    case 4:
      
    default:
      break;
  }
}

function validationCurrentStep() {
  let prevStep = document.getElementById("prev-step");
  let nextStep = document.getElementById("next-step");

  if (currentStep <= 0) {
    currentStep = 0;
    prevStep.style.display = "none";    
  } else {
    prevStep.style.display = "inline-block";    
  }
}

