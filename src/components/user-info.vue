<template>
    <div v-if="userCenter">
        <el-card>
            <div slot="header">后台内容</div>
            <div>
                <h5>会员中心</h5>
                <ul>
                    <li>
                        <span>名字：{{ username }}</span>
                    </li>
                    <li>
                        <span>绑定QQ：{{ userqq }}</span>
                    </li>
                    <li>
                        <span>邮箱：{{ useremail }}</span>
                    </li>
                    <li>
                        <span>积分：{{ userpoints }}</span>
                    </li>
                    <li>
                        <span>组别：{{ usergroups }}</span>
                    </li>
                    <li>
                        <span>密钥：{{ userkey }}</span>
                    </li>
                </ul>
                <div class="">
                    <el-button type="primary" @click="UserLogout">登出</el-button>
                    <el-button type="primary" @click="UserUpdate">更新信息</el-button>
                </div>
            </div>
        </el-card>
        <dia-log :parentDialogVisible="userStore.$state.dialogSwtich" :parentDialogString="userStore.$state.dialogMessage" />
    </div>
</template>
<script setup>
import { ref, onBeforeMount } from "vue";
let username = ref("");
let useremail = ref("");
let userpoints = ref("");
let usergroups = ref("");
let userkey = ref("");
let userqq = ref("");
let userCenter = ref(true);
import axios from "axios"
import { useRouter } from 'vue-router';
const router = useRouter();
const beforeMountHandler = () => {
    // 执行你的逻辑代码
    UserInfo()
};
onBeforeMount(beforeMountHandler);
import diaLog from './dia-log.vue';
import { useUserStore } from "../stores/counter";
const userStore = useUserStore();
function showDialog(message) {
    userStore.setDiaLogMessage(message)
    userStore.setDiaLogSwitch(true)
};
function UserInfo() {
    axios
        .get("/api/UserInfo", {
            headers: {
                Authorization: localStorage.getItem("token"),
            },
        })
        .then(function (response) {
            if (response.data.status == true) {
                username.value = response.data.data.username;
                userqq.value = response.data.data.userqq;
                userpoints.value = response.data.data.userpoints;
                useremail.value = response.data.data.useremail;
                usergroups.value = response.data.data.usergroups;
                userkey.value = response.data.data.userkey;
            }
        })
        .catch(function (error) {
            console.log(error);
        });
}
function UserLogout() {
    localStorage.removeItem("token")
    router.push("/")
}
function UserUpdate() {
    console.log(`更新数据`);
    showDialog(`暂时无法更新`)
}
</script>