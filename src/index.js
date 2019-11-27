const Setting = require('./setting')
// const abacus = require('./abacus');


document.addEventListener('DOMContentLoaded', () => {
    const settingCanvas = document.getElementById('setting');
    const settingCtx = settingCanvas.getContext("2d");
    
    const setting = new Setting(settingCtx);
    setting.render();
})



// const abacus = new Abacus(
//     setting,
//     settingCtx
// )