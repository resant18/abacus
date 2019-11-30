const DATA_CURRENT = "current";
const DATA_VALUE = "value";
const RENDER_DELAY = 100; //in ms

var beads = [];
var sums = [];

function main() {
  initializeBeads();
  generateMathQuestion(2, 1); // 0 = substraction, 1 = addition
}

function reset() {
  resetBeads();
  generateMathQuestion(2, 1); // 0 = substraction, 1 = addition
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
  unfilteredTds = [...document.getElementById(tableId).querySelectorAll("td")];
  return unfilteredTds.filter(bead => filter);
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
