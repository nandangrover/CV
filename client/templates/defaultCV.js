import Structure from '../utility/structure.js';
import gateway from '../utility/gateways.js';

(async () => {
  new Structure(JSON.parse((await gateway.getJson('Nandan'))[0].jsonData))
})();