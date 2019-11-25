# Abacus Fun
Abacus Simulator Kids Learning App

## Background

Abacus, also called counting frame, is a calculating tool that was invented in ancient China. This Abacus Fun application will simulate the way abacus work and designed to guide kids learning simple arithmatic in a concret and fun way. It will calculate the sum everytime a bead is moved. In that way, the student will be able to check the answer. The application has two modes where the student can use the abacus freely in **free mode**, and challenge themselves in **challenge mode** with a timer.  

This simulation app will incorporate simple addition and substraction, mainly for Preschool to Kindergarten school grade.

## Functionality & MVP

With this Abacus Fun simulator, users will be able to:

- Choose between free mode and challenge mode
- Choose the bead theme, for example change to animal image, to make it more fun.
- Practice counting numbers by moving the beads in free mode
- In challenge mode, generate random simple arithmatic problem to be solved
- Calculate the sum interactively while user move the bead
- Compare the user input with the correct answer and display to the user
- Reset the steps while solving a arithmatic problem
- In challenge mode, user can choose to have timer to challenge themselves while solving a arithmatic problem.

## Wireframes
This app will consist of a screen game setting, where user can choose the free mode or challenge mode. In both modes, user can view the abacus frame with columns and rows consist of beads. At the bottom of each beads column, it will display a sum number interactively as user move the beads. On the left, there will be controls to reset the problem and input control where user can manually enter their math problems.

Setting Page
![Setting Page](https://i.imgur.com/SLjwfCW.png)

##  Architecture and Technologies

This project will be implemented with the following technologies:
- Javascript and CSS for abacus computing logic and UI.
- Webpack to bundle javascript files.

In addition to the entry file, there will be three scripts involved in this project:

abacus.js: this script will handle the abacus computing logic.
bead.js: this script will handle the bead 
ui.js: this script will handle how to render the UI in DOM.

## Implementation Timeline

Day 1: Setup all necessary Node modules, including getting webpack up and running. Create the game setting page as landing screen, specified in the wireframe. Design the the scripts in object oriented way. Learn how to render beads and make interactive. Learn how to generate aritmathic problem in approriate way.

Day 2: 

Render the abacus framework with beads grid pattern.
Make each beads moveable and update the number at the bottom of each bead column.
Generate random arithmatic problem.


Day 3: Create the abacus computing logic. Build the functions to process user input, display the calculation and check the answer. Create control to reset the problem, accept user input with their own arithmatic problem. Set timer to limit time the user use to answer a arithmatic problem.



## Bonus features