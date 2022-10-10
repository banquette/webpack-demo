import { createApp } from 'vue';
import App from './app.component.vue';

import './main.css';

/**
 * The default theme defines the --bt-* variables used by the components
 * as well as some variants.
 */
import '@banquette/vue-ui/themes/default';

createApp(App).mount('#app');
