import Structure from '../utility/structure.js';
import gateway from '../utility/gateways.js';

(async () => {
  new Structure(JSON.parse((await gateway.getJson('AwesomeGrover'))[0].jsonData))
})();