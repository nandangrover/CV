import themes from '../themes/index.js';
import gateway from '../utility/gateways.js';

(async () => {
  document.body.removeChild(document.getElementById('main'));
  window['themeElon_1'] = JSON.parse((await gateway.getJson('AwesomeGrover'))[0].jsonData);
  let iFrame = document.getElementById("template");
  iFrame.src = `../themes/themeElon_1/index.html`;
  iFrame.style.display = 'block';
})();