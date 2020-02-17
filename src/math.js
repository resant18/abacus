var checkValue = function() {};
var addend1;
var addend2;
var operator;
var result;
var total;
var message;
var intervalId;

function generateMathQuestion(level, operation) {
  if (!document.getElementById("text-wrapper")) {
    return;
  }

  let operator = "";

  let addendEl1 = document.getElementById("addend1");
  let addendEl2 = document.getElementById("addend2");
  let operatorEl = document.getElementById("operator");
  let totalEl = document.getElementById("total");
  let message = document.getElementById("message");

  message.style.visibility = "hidden";
  addendEl1.style.color = "black";
  addendEl2.style.color = "black";
  totalEl.style.color = "black";

  switch (level) {
    case 1:
      addend1 = Math.floor(Math.random() * 4) + 1;
      addend2 = 5 - addend1;
      break;
    case 2:
      addend1 = Math.floor(Math.random() * 9) + 1;
      addend2 = 10 - addend1;
      break;
    case 3:
      addend1 = Math.floor(Math.random() * 10) + 1;
      addend2 = Math.floor(Math.random() * 10) + 1;
      break;
    default:
      break;
  }

  if (operation === 1) {
    operator = "+";
    result = addend1 + addend2;
  } else {
    operator = "-";
    result = addend1 - addend2;
  }

  addendEl1.value = addend1;
  addendEl2.value = addend2;
  operatorEl.value = operator;

  addendEl1.onchange = updateAddend1;
  addendEl2.onchange = updateAddend2;

  checkValue = checkAddend1;
  startTimer();
}

function startTimer() {
  let timer = 10;
  let message = document.getElementById("message");
  intervalId = setInterval(showTimer, 1000);
  message.innerHTML = timer;
  message.style.visibility = "visible";

  function showTimer() {
    message.innerHTML = timer;
    message.style.visibility = "visible";
    if (timer === 0) {
      clearInterval(intervalId);
      message.innerHTML = "Time out, please reset to try again!!!";
      message.style.visibility = "visible";
      disableCalculation();
      if (confirm("Do you want to try again?")) {
        reset();
      }
    }
    timer--;
  }
}

function updateAddend1() {
  debugger;
  addend1 = parseInt(document.getElementById("addend1").value);
  result = parseInt(addend1) + parseInt(addend2);
}

function updateAddend2() {
  addend2 = parseInt(document.getElementById("addend2").value);
  result = parseInt(addend1) + parseInt(addend2);
}

function checkAddend1() {
  if (total === addend1) {
    addendEl1 = document.getElementById("addend1");
    addendEl1.style.color = "green";
    checkValue = checkResult;
  } else {
    checkResult();
  }
}

function checkResult() {
  if (total === result) {
    clearInterval(intervalId);
    addendEl1 = document.getElementById("addend1");
    addendEl2 = document.getElementById("addend2");
    operator = document.getElementById("operator");
    totalEl = document.getElementById("total");
    addendEl1.style.color = "green";
    addendEl2.style.color = "green";
    totalEl.style.color = "green";
    message.style.visibility = "visible";
    document.getElementById;
    disableCalculation();
  }
}

function disableCalculation() {
  checkValue = () => {};
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
  document.getElementById("total").innerHTML = total;

  checkValue();
}
