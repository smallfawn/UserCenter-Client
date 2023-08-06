<template>
    <div v-if="registerCenter">
        <el-card>
            <div slot="header">注册页面</div>
            <div>
                <h5>会员注册</h5>
                <el-form class="">
                    <el-form-item label="账&nbsp&nbsp&nbsp&nbsp号">
                        <el-input v-model="username" placeholder="请输入账号" @input="checkUserName"></el-input>
                        <div v-if="usernameExists">用户名可用</div>
                        <div v-if="!usernameExists">用户名不可用</div>
                    </el-form-item>
                    <el-form-item label="密&nbsp&nbsp&nbsp&nbsp码">
                        <el-input type="password" v-model="password" placeholder="请输入密码"></el-input>
                    </el-form-item>
                    <el-form-item label="邮&nbsp&nbsp&nbsp&nbsp箱">
                        <el-row>
                            <el-col :span="16">
                                <el-input v-model="useremail" placeholder="请输入邮箱" @input="checkEmail"></el-input>
                                <div v-if="invalidEmail">请输入有效的邮箱地址</div>
                            </el-col>
                            <el-col :span="8">
                                <el-button type="primary" @click="SendEmailMessage">发送验证码</el-button>
                            </el-col>
                        </el-row>
                    </el-form-item>
                    <el-form-item label="验证码">
                        <el-input type="text" v-model="code" placeholder="请输入验证码"></el-input>
                    </el-form-item>
                    <div class="">
                        <el-button type="primary" @click="UserRegister">注册</el-button>
                    </div>
                </el-form>
            </div>
        </el-card>
        <dia-log :parentDialogVisible="userStore.$state.dialogSwtich" :parentDialogString="userStore.$state.dialogMessage" />
    </div>
</template>
<script setup>
import { ref } from "vue";
import axios from "axios";
let username = ref("");
let password = ref("");
let useremail = ref("");
let code = ref("");
let registerCenter = ref(true);
import { useUserStore } from "../stores/counter";
const userStore = useUserStore();
let usernameExists = ref(false)
import { useRouter } from 'vue-router';
const router = useRouter();
import diaLog from './dia-log.vue';
function showDialog(message) {
    userStore.setDiaLogMessage(message)
    userStore.setDiaLogSwitch(true)
};
function SendEmailMessage() {
    userStore.setUserName(username.value);
    userStore.setUserEmail(useremail.value);
    axios
        .get("/api/SendEmilMessage", {
            params: {
                username: userStore.$state.username,
                useremail: userStore.$state.useremail,
            },
        })
        .then(function (response) {
            console.log(response.data);
            if (response.data.status == true) {
                showDialog(response.data.message)
            } else {
                showDialog(response.data.message)
            }
        })
        .catch(function (error) {
            console.log(error);
        });
}
function UserRegister() {
    userStore.setUserName(username.value);
    userStore.setPassword(password.value);
    userStore.setUserEmail(useremail.value);
    userStore.setCode(code.value);
    axios
        .get("/api/UserRegister", {
            params: {
                username: userStore.$state.username,
                password: userStore.$state.password,
                useremail: userStore.$state.useremail,
                code: userStore.$state.code
            },
        })
        .then(function (response) {
            if (response.data.status == true) {
                showDialog(response.data.message)
                router.push("/")
            } else {
                showDialog(response.data.message)
            }
        })
        .catch(function (error) {
            console.log(error);
        });
}
function checkUserNameAPI() {
    loading.value = true;
    axios
        .get("/api/CheckUserName", {
            params: {
                username: userStore.$state.username
            }
        })
        .then(function (response) {
            if (response.data.status == true) {
                loading.value = false;
                usernameExists.value = response.data.message;
            } else {
                usernameExists.value = false;
            }
        })
        .catch(function (error) {
            console.log(error);
        });
}
let debounceTimer = null
let loading = ref(false);
function checkUserName() {
    userStore.setUserName(username.value)
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
        checkUserNameAPI();
    }, 500);
}
let invalidEmail = ref(false)

function checkEmail() {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    invalidEmail.value = !regex.test(useremail.value);
}


</script>