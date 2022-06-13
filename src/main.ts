import 'virtual:windi.css';
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import 'tdesign-vue-next/es/style/index.css';
import 'tdesign-vue-next/es/notification/style/index.css';
import 'tdesign-vue-next/es/message/style/index.css';

import App from './App.vue';
import router from './router';

const app = createApp(App);

app.use(router);
app.use(createPinia());

app.mount('#app');
