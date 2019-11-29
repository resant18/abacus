//jQuery + jQueryUI
var sum = [];
var total = 0;
var clickMove = "-20px";

function main() {
  var beads = document.getElementsByTagName("td");
  var i;
  for (i = 0; i < beads.length; i++) {
    beads[i].onclick = changeValue;
  }
}

function changeValue(e) {
  var value = this.dataset["value"];
  var state = this.dataset["state"];

  if (state == value) {
    // set the element's new position:
    this.style.top = "";
    this.dataset["state"] = 0;
  } else {
    this.style.top = (-1 * this.clientHeight) +"px";
    this.dataset["state"] = value;
  }
}

sumFunction = function() {
  total = 0;
  for (var i = 0; i < sum.length; i++) {
    total += sum[i] << 0;
  }
  $("#sum").text(total);
};
