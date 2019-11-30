var checkValue = function() {};
var addend1;
var addend2;
var result;
var total;

function generateMathQuestion(level, operation) {
  if (!document.getElementById("question")) {
    return;
  }
  let operator = "";
  let addendEl1 = document.getElementById("addend1");
  let addendEl2 = document.getElementById("addend2");
  let operatorEl = document.getElementById("operator");

  addendEl1.style.color = "black";
  addendEl2.style.color = "black";

  switch (level) {
    case 1:
      addend1 = Math.floor(Math.random() * 5);
      addend2 = 4 - addend1;
      break;
    case 2:
      addend1 = Math.floor(Math.random() * 10);
      addend2 = 9 - addend1;
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
    addendEl1.style.color = "green";
    addendEl2.style.color = "green";
    operator.style.color = "green";
    window.alert("good job!");
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
  document.getElementById("total").innerHTML = "Sum: " + total;

  checkValue();
}
