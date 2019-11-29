//jQuery + jQueryUI
var sum = [];
var total = 0;

// $("td").draggable(() => alert('test'));
// $("td").click(() => alert("test"));

$("td").draggable({
   axis: "y",
   containment: "table",
   cursor: "move",
   grid: [0, 20],
   stop: function(event, ui) {
      sum = [];
      $("td").each(function(i) {
         var Stoppos = $(this).position();
         var value = $(this).attr("data-attribute");
         if (Stoppos.top < 100) {
            sum.push(value);
            sumFunction();
         } else {
            sumFunction();
         }
      });
   }
});

sumFunction = function() {
   total = 0;
   for (var i = 0; i < sum.length; i++) {
      total += sum[i] << 0;
   }
   $("#sum").text(total);
};
