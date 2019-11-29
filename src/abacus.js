const DATA_CURRENT = "current";
const DATA_VALUE = "value";
const RENDER_DELAY = 100; //in ms

var sum = [];
var total = 0;

function main() {
  var beads = document.getElementsByTagName("td");
  for (var i = 0; i < beads.length; i++) {
    beads[i].onclick = moveBead;
  }
}

function moveBead(e) {
  if (isValueSet(this)) {
    // set the element's new position:
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

function updateSum(sumId, beads) {
  var sum = 0;
  for (var i = 0; i < beads.length; i++) {
    bead = beads[i];
    if (!isSeparator(bead)) {
      currentValue = bead.dataset[DATA_CURRENT] || "0";
      sum += Number(currentValue);
    }
  }
  document.getElementById(sumId).innerHTML = sum;
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

sumFunction = function() {
  total = 0;
  for (var i = 0; i < sum.length; i++) {
    total += sum[i] << 0;
  }
  $("#sum").text(total);
};
