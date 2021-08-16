import themes from '../themes/index.js';
import gateway from '../utility/gateways.js';

(async () => {
  document.body.removeChild(document.getElementById('main'));
  window['themeSpartan_2'] = JSON.parse((await gateway.getJson('AwesomeGrover', 'themeSpartan_2'))[0].jsonData);
  let iFrame = document.getElementById("template");
  iFrame.src = `../themes/themeSpartan_2/index.html`;
  iFrame.style.display = 'block';
  if (window.location.pathname === '/download') {
    iFrame.onload = function () {
      window.document.getElementById("print").click()
    }
  }
})();