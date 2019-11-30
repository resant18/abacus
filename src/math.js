function generateMathQuestion(level, operation) {
   let addend1 = 0;
   let addend2 = 0;
   let operator = '';

   let addendEl1 = document.getElementById("addend1");
   let addendEl2 = document.getElementById("addend2");
   let operatorEl = document.getElementById("operator");

   if (operation === 1) operator = '+';
   else operator = '-';

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

   addendEl1.innerHTML = addend1;
   addendEl2.innerHTML = addend2;
   operatorEl.innerHTML = operator;
}
