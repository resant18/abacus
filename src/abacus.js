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
  nextSibling = bead.nextElementSibling;
  if (nextSibling && isValueSet(nextSibling)) {
    delay = renderDelay + clearValue(nextSibling);
  }
  renderClearValue(bead, delay);
  return delay;
}

async function renderClearValue(bead, delay) {
  await sleep(delay);
  bead.style.top = "";
  bead.dataset["state"] = 0;
}

function isValueSet(bead) {
  var value = bead.dataset["value"];
  var state = bead.dataset["state"];
  return value == state;
}

function setValue(bead, delay) {
  var delay = 0;
  prevSibling = bead.previousElementSibling;
  if (prevSibling && !isValueSet(prevSibling)) {
    delay = renderDelay + setValue(prevSibling);
  }
  renderSetValue(bead, delay);
  return delay;
}

async function renderSetValue(bead, delay) {
  await sleep(delay);
  bead.style.top = -1 * bead.clientHeight + "px";
  bead.dataset["state"] = bead.dataset["value"];
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
