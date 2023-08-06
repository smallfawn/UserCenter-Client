<template>
    <div v-if="loginCenter">
        <el-card>
            <div slot="header">公告内容</div>
            <div>
                <h5>会员登录</h5>
                <el-form class="">
                    <el-form-item label="账号">
                        <el-input v-model="username" placeholder="请输入账号"></el-input>
                    </el-form-item>
                    <el-form-item label="密码">
                        <el-input type="password" v-model="password" placeholder="请输入密码"></el-input>
                    </el-form-item>
                    <div class="login-buttons">
                        <el-button type="primary" @click="UserLogin">登录</el-button>
                        <el-button type="primary" @click="UserRegisterCenter">注册</el-button>
                    </div>
                </el-form>
            </div>
        </el-card>
        <dia-log :parentDialogVisible="userStore.$state.dialogSwtich" :parentDialogString="userStore.$state.dialogMessage" />
    </div>
</template>
<script setup>

import diaLog from './dia-log.vue';
function showDialog(message) {
    userStore.setDiaLogMessage(message)
    userStore.setDiaLogSwitch(true)
};

import { useUserStore } from "../stores/counter";
const userStore = useUserStore();
import { useRouter } from 'vue-router';
const router = useRouter();
import { ref, onMounted } from "vue";
let username = ref("");
let password = ref("");
const loginCenter = ref(true)

import axios from "axios"
function UserLogin() {
    // 登录逻辑
    userStore.setUserName(username.value);
    userStore.setPassword(password.value);
    axios
        .get("/api/UserLogin", {
            params: {
                username: userStore.$state.username,
                password: userStore.$state.password,
            },
        })
        .then(function (response) {
            if (response.data.status == true) {
                const token = response.data.data.token;
                localStorage.setItem("token", token);
                router.push("./UserInfo")
            } else {
                showDialog(response.data.message)
            }
        })
        .catch(function (error) {
            console.log(error);
        });
}
function UserRegisterCenter() {
    router.push('/UserRegister');
}
onMounted(() => {
    const token = localStorage.getItem("token");
    console.log(`哈哈哈`)
    if (token) {
        router.push("./UserInfo")
    }
});
</script>