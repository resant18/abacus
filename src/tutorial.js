var currentStep = 0;
var stepOptions = {
   0: {
      message: "Welcome to the basic tutorial!",
      elements: ["message"],
      styles: ["font-size:1em"]
   },
   1: {
      message: "Each abacus rod represents one digit in a number.",
      elements: ["message"],
      styles: ["font-size:0.75em"]
   },
   2: {
      message: "The bottom beads are called earth beads (unit beads) and have value of one.",
      elements: ["message"],
      styles: ["font-size:0.75em"]
   },
   3: {
      message: "The top beads are called heaven beads and have value of five.",
      elements: ["message", "sum-unit"],
      styles: ["font-size:0.75em", "color:#ffffff"]
   },
   4: {
      message: "To represent numbers, move beads to the center beam. For example, this is 3.",
      elements: ["message", "sum-unit"],
      styles: ["font-size:0.75em", "color:#66ff00"]
   },
   5: {
      message: "This represents 8 (=5 + 3).",
      elements: ["message", "sum-ten"],
      styles: ["font-size:0.75em", "color:#ffffff"]
   },
   6: {
      message: "This represents 16 (=10 + 5 + 1).",
      elements: ["message", "sum-ten"],
      styles: ["font-size:0.75em", "color:#66ff00"]
   }
};


function getMessageText(stepOption) {
   return stepOption.message ? stepOption.message : "";
}

function getElements(stepOption) {
   return stepOption.element ? stepOption.element : [];
}

function getElementsStyle(stepOption) {
   return stepOption.style ? stepOption.style : [];
}

function getElementsResetStyle(stepOption) {
   return stepOption.resetStyle ? stepOption.resetStyle : [];
}

function setElementsStyle(elements, elementsStyle) {
   for (let i = 0; i < elements.length; i++) {      
      document.getElementById(elements[i]).style = elementsStyle[i];
   }
}

function showTutorial(step) {
   let message = document.getElementById("message");

   currentStep += step;   
   validationCurrentStep();

   let stepOption = stepOptions[currentStep];

   if (stepOptions) {
      message.innerHTML = getMessageText(stepOption);
      setElementsStyle(stepOption.elements, stepOption.styles);
   }

   let canvas = document.getElementById("canvas");
   let ctx = canvas.getContext("2d");

   drawTutorial(ctx, currentStep);
}

function drawTutorial(ctx, step) {
   let sync = true;
   ctx.clearRect(0, 0, canvas.width, canvas.height);
   
   switch (step) {
      case 1:         
         ctx.lineWidth = 3;
         ctx.strokeStyle = "#66ff00";
         for (let x = 40; x <= 1177; x += 147) {
            ctx.strokeRect(x, 32, 136, 500);
         }
         break;
      case 2:
         ctx.lineWidth = 4;
         ctx.strokeStyle = "#66ff00";
         ctx.strokeRect(35, 250, 1175, 265);
         ctx.fillStyle = "#66ff00";
         ctx.font = "36px Georgia";
         ctx.fillText("= 1", 1220, 388);
         break;
      case 3:   
         resetBeads(sync);         

         ctx.lineWidth = 4;
         ctx.strokeStyle = "#66ff00";
         ctx.strokeRect(40, 32, 1175, 113);
         ctx.fillStyle = "#66ff00";
         ctx.font = "36px Georgia";
         ctx.fillText("= 5", 1220, 95);
         break;
      case 4:        
         resetBeads(sync);
         beads[46].onclick();
         
         ctx.lineWidth = 4;
         ctx.strokeStyle = "#66ff00";
         ctx.beginPath();
         ctx.moveTo(1178, 205);
         ctx.lineTo(1210, 205);
         ctx.lineTo(1210, 291);
         ctx.lineTo(1220, 296);
         ctx.lineTo(1210, 301);
         ctx.lineTo(1210, 385);
         ctx.lineTo(1178, 385);
         ctx.stroke();
         ctx.font = "36px Georgia";
         ctx.fillText("= 3", 1230, 300);         
         break;
      case 5:     
         resetBeads(sync);         
         beads[46].onclick();
         beads[42].onclick();         

         ctx.lineWidth = 4;
         ctx.strokeStyle = "#66ff00";
         ctx.beginPath();
         ctx.moveTo(1178, 205);
         ctx.lineTo(1210, 205);
         ctx.lineTo(1210, 289);
         ctx.lineTo(1220, 294);
         ctx.lineTo(1210, 299);
         ctx.lineTo(1210, 383);
         ctx.lineTo(1178, 383);
         ctx.font = "36px Georgia";
         ctx.fillText("= 3", 1230, 300);

         ctx.moveTo(1178, 125);
         ctx.lineTo(1210, 125);
         ctx.lineTo(1210, 149);
         ctx.lineTo(1220, 154);
         ctx.lineTo(1210, 159);
         ctx.lineTo(1210, 183);
         ctx.lineTo(1178, 183);
         ctx.stroke();
         ctx.font = "36px Georgia";
         ctx.fillText("= 5", 1230, 160);         
         break;
      case 6:
         resetBeads(sync);
         beads[42].onclick();
         beads[44].onclick();
         beads[38].onclick();

         ctx.lineWidth = 4;
         ctx.strokeStyle = "#66ff00";
         ctx.beginPath();         

         ctx.moveTo(1178, 125);
         ctx.lineTo(1210, 125);
         ctx.lineTo(1210, 149);
         ctx.lineTo(1220, 154);
         ctx.lineTo(1210, 159);
         ctx.lineTo(1210, 183);
         ctx.lineTo(1178, 183);
         ctx.stroke();
         ctx.font = "36px Georgia";
         ctx.fillText("= 5", 1230, 160);

         ctx.moveTo(1178, 200);
         ctx.lineTo(1210, 200);
         ctx.lineTo(1210, 225);
         ctx.lineTo(1220, 230);
         ctx.lineTo(1210, 235);
         ctx.lineTo(1210, 260);
         ctx.lineTo(1178, 260);
         ctx.stroke();
         ctx.font = "36px Georgia";
         ctx.fillText("= 1", 1235, 240);

         ctx.moveTo(1028, 200);
         ctx.lineTo(1050, 200);
         ctx.lineTo(1050, 225);
         ctx.lineTo(1060, 230);
         ctx.lineTo(1050, 235);
         ctx.lineTo(1050, 260);
         ctx.lineTo(1028, 260);
         ctx.stroke();
         ctx.font = "36px Georgia";
         ctx.fillText("= 1", 1075, 240);

         document.getElementById("sum-unit").style.color = "#66ff00";
         document.getElementById("sum-ten").style.color = "#66ff00";
         break;
      default:
         break;
   }
}

function validationCurrentStep() {   
   let totalSteps = Object.values(stepOptions).length;   
   let prevStep = document.getElementById("prev-step");
   let nextStep = document.getElementById("next-step");

   if (currentStep <= 0) {
      currentStep = 0;
      prevStep.disabled = true;
      nextStep.disabled = false;      
   } 
   else if (currentStep >= totalSteps - 1) {
      currentStep = totalSteps - 1;
      prevStep.disabled = false;
      nextStep.disabled = true;
   } else {
      prevStep.disabled = false;
      nextStep.disabled = false;
   } 

   prevStep.className = prevStep.disabled ? "prev-step-disabled" : "prev-step";
   nextStep.className = nextStep.disabled ? "next-step-disabled" : "next-step";
}

