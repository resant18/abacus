const Abacus = require('./abacus');

document.addEventListener('DOMContentLoaded', () => {
    let abacus = new Abacus('soroban', 0);
    abacus.init();
});