import { createRouter, createWebHashHistory } from 'vue-router';

import UserLogin from '../components/user-login.vue';
import UserInfo from '../components/user-info.vue';
import UserRegister from '../components/user-register.vue';

const routes = [
    { path: '/', component: UserLogin },
    { path: '/UserInfo', component: UserInfo },
    { path: '/UserRegister', component: UserRegister }
];

const router = createRouter({
    history: createWebHashHistory(),
    routes
});

export default router;