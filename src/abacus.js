const DATA_CURRENT = "current";
const DATA_VALUE = "value";
const RENDER_DELAY = 100; //in ms

var total = 0;
var beads = [];
var sums = [];

function main() {
  beads = getBeads();
  sums = getRowSums();
  for (var i = 0; i < beads.length; i++) {
    beads[i].onclick = moveBead;
  }

  generateMathQuestion(1, 1); // 0 = substraction, 1 = addition
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

function clearValue(bead) {
  var delay = 0;
  nextSibling = getNextBead(bead);
  if (nextSibling && isValueSet(nextSibling)) {
    delay = RENDER_DELAY + clearValue(nextSibling);
  }
  updateValue(bead, 0);
  renderClearValue(bead, delay);
  return delay;
}

function setValue(bead, delay) {
  var delay = 0;
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
  nextSibling = bead.nextElementSibling;
  if (isSeparator(nextSibling)) {
    nextSibling = undefined;
  }
  return nextSibling;
}

function getPrevBead(bead) {
  prevSibling = bead.previousElementSibling;
  if (isSeparator(bead)) {
    prevSibling = undefined;
  }
  return prevSibling;
}

function isValueSet(bead) {
  var value = bead.dataset[DATA_VALUE];
  var state = bead.dataset[DATA_CURRENT];
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

function updateSum(sumId, beads) {
  var sum = 0;
  for (var i = 0; i < beads.length; i++) {
    bead = beads[i];
    if (!isSeparator(bead)) {
      currentValue = bead.dataset[DATA_CURRENT] || "0";
      sum += Number(currentValue);
    }
  }
  sumTd = document.getElementById(sumId);
  sumTd.innerHTML = sum.toString().substring(0, 1);
  sumTd.dataset["value"] = sum;
  updateTotalSum();
}

function updateTotalSum() {
  total = 0;
  for (sum of sums) {
    value = sum.dataset["value"];
    total = total + Number(value);
  }
  document.getElementById("total").innerHTML = "Sum: " + total;
}
