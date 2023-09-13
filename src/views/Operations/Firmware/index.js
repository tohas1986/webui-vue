import Firmware from './Firmware.vue';
export default Firmware;

import Vue from 'vue';
import ProgressBar from 'vuejs-progress-bar';

Vue.config.productionTip = false;

Vue.use(ProgressBar);

new Vue({
  render: (h) => h(App)
}).$mount("#Firmware");
