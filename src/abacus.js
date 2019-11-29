//jQuery + jQueryUI
var sum = [];
var total = 0;
var clickMove = "-20px";
var renderDelay = 100;

function main() {
  var beads = document.getElementsByTagName("td");
  var i;
  for (i = 0; i < beads.length; i++) {
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
    delay = renderDelay + clearValue(nextSibling);
  }
  bead.dataset["state"] = 0;
  renderClearValue(bead, delay);
  return delay;
}

function setValue(bead, delay) {
  var delay = 0;
  prevSibling = getPrevBead(bead);
  if (prevSibling && !isValueSet(prevSibling)) {
    delay = renderDelay + setValue(prevSibling);
  }
  bead.dataset["state"] = bead.dataset["value"];
  renderSetValue(bead, delay);
  return delay;
}

function getNextBead(bead) {
  nextSibling = bead.nextElementSibling;
  if (nextSibling && nextSibling.className == "separator") {
    nextSibling = undefined;
  }
  return nextSibling;
}

function getPrevBead(bead) {
  prevSibling = bead.previousElementSibling;
  if (prevSibling && prevSibling.className == "separator") {
    prevSibling = undefined;
  }
  return prevSibling;
}

function isValueSet(bead) {
  var value = bead.dataset["value"];
  var state = bead.dataset["state"];
  return value == state;
}

async function renderClearValue(bead, delay) {
  await sleep(delay);
  if (bead.className == "upper") {
    bead.style.top = -1 * bead.clientHeight + "px";
  } else {
    bead.style.top = "0px";
  }
}

async function renderSetValue(bead, delay) {
  await sleep(delay);

  if (bead.className == "upper") {
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
