var checkValue = function() {};
var addend1;
var addend2;
var result;
var total;

function generateMathQuestion(level, operation) {
  if (!document.getElementById("text-wrapper")) {
    return;
  }
  let operator = "";

  let addendEl1 = document.getElementById("addend1");
  let addendEl2 = document.getElementById("addend2");
  let operatorEl = document.getElementById("operator");
  let totalEl = document.getElementById("total");
  document.getElementById("message").innerHTML = "";
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
      addend1 = Math.floor(Math.random() * 10);
      addend2 = Math.floor(Math.random() * 10);
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

  addendEl1.innerHTML = addend1;
  addendEl2.innerHTML = addend2;
  operatorEl.innerHTML = operator;

  checkValue = checkAddend1;
}

function checkAddend1() {
  if (total === addend1) {
    addendEl1 = document.getElementById("addend1");
    addendEl1.style.color = "green";
    checkValue = checkResult;
  }
}

function checkResult() {
  if (total === result) {
    addendEl1 = document.getElementById("addend1");
    addendEl2 = document.getElementById("addend2");
    operator = document.getElementById("operator");
    totalEl = document.getElementById("total");
    addendEl1.style.color = "green";
    addendEl2.style.color = "green";
    totalEl.style.color = "green";
    document.getElementById("message").innerHTML = "Good Job!!!";
  }
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
