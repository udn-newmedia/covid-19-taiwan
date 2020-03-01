import Vue from 'vue'
import App from './App.vue'
import store from './store';
import '~/style/main.scss';
import { rwdMethods } from '@/mixins/masterBuilder.js';
// import InApp from 'detect-inapp';

Vue.config.productionTip = false
Window.Promise = Promise;

new Vue({
  store,
  render: h => h(App),
  mixins: [rwdMethods]
}).$mount('#app')

// rec.udn.com追蹤碼
window.onload = () => {
  document.getElementsByTagName('iframe')[0].style.top = 0;
};

// inApp resize
// (function() {
//   const inapp = new InApp(navigator.userAgent || navigator.vendor || window.opera);
//   let currentWidth = window.innerWidth;
//   let executeCount = 0;
//   if (inapp.isInApp) {
//     const inappWidthListener = setInterval(() => {
//       executeCount++;
//       if (window.innerWidth !== currentWidth) {
//         window.location.reload();
//         currentWidth = window.innerWidth;
//       }
//       if (executeCount > 10) {
//         clearInterval(inappWidthListener);
//       }
//     }, 100);
//   }
// })();