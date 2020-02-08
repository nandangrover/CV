import themes from '../themes/index.js';
import gateway from '../utility/gateways.js';

(async () => {
  new themes['themeElon_1'](JSON.parse((await gateway.getJson('AwesomeGrover'))[0].jsonData))
})();