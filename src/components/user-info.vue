<template>
    <div v-if="userCenter">
        <el-card>
            <div slot="header">{{ userStore.$state.noticeMessage }}</div>
            <div>
                <h5>会员中心</h5>
                <ul>
                    <li>
                        <span>名字：{{ userStore.$state.username }}</span>
                    </li>
                    <li v-if="!editing">
                        <span>绑定QQ：{{ userStore.$state.userqq }}</span>
                        <el-button @click="editField('userqq')">编辑</el-button>
                    </li>
                    <li v-else>
                        <span>绑定QQ：{{ userStore.$state.userqq }}</span>
                        <el-input v-model="editUserqq" placeholder="请输入绑定QQ"></el-input>
                    </li>
                    <li>
                        <span>邮箱：{{ userStore.$state.useremail }}</span>
                    </li>
                    <li>
                        <span>积分：{{ userStore.$state.userpoints }}</span>
                    </li>
                    <li>
                        <span>组别：{{ userStore.$state.usergroups }}</span>
                    </li>
                    <li>
                        <span>密钥：{{ userStore.$state.userkey }}</span>
                    </li>
                </ul>
                <div class="">
                    <el-button type="primary" @click="UserLogout">登出</el-button>
                    <el-button type="primary" @click="confirmUpdate">更新信息</el-button>
                </div>
            </div>
        </el-card>
        <dia-log :parentDialogVisible="userStore.$state.dialogSwtich"
            :parentDialogString="userStore.$state.dialogMessage" />
    </div>
</template>
<script setup>
import { ref, onBeforeMount, watch } from "vue";

let userCenter = ref(true);
let editing = ref(false);
let editUserqq = ref("");
import axios from "axios"
import { useRouter } from 'vue-router';
const router = useRouter();
const beforeMountHandler = () => {
    // 执行你的逻辑代码
    UserInfo()
    GetNotice()
};
onBeforeMount(beforeMountHandler);
import diaLog from './dia-log.vue';
import { useUserStore } from "../stores/counter";
const userStore = useUserStore();
function showDialog(message) {
    userStore.setDiaLogMessage(message)
    userStore.setDiaLogSwitch(true)
};
function GetNotice() {
    axios
        .get("/api/GetNotice")
        .then(function (response) {
            if (response.data.status == true) {
                userStore.setNoticeMessage(response.data.message)
            }
        })
        .catch(function (error) {
            console.log(error);
        });
}
function UserInfo() {
    axios
        .get("/api/UserInfo", {
            headers: {
                Authorization: localStorage.getItem("token"),
            },
        })
        .then(function (response) {
            if (response.data.status == true) {
                userStore.setUserName(response.data.data.username)
                userStore.setUserQQ(response.data.data.userqq)
                userStore.setUserPoints(response.data.data.userpoints)
                userStore.setUserEmail(response.data.data.useremail)
                userStore.setUserGroups(response.data.data.usergroups)
                userStore.setUserKey(response.data.data.userkey)
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
function editField(field) {
    editing.value = true;
    if (field === 'userqq') {
        watch(editUserqq, (newValue, oldValue) => {

            userStore.setUserQQ(newValue);
        });
    }
}


function confirmUpdate() {
    axios
        .get("/api/UserUpdate", {
            params: {
                type: "userqq",
                data: userStore.$state.userqq
            },
            headers: {
                Authorization: localStorage.getItem("token"),
            },
        })
        .then(function (response) {
            console.log(response.data);
            if (response.data.status == true) {
                showDialog(response.data.message);
            } else {
                showDialog(response.data.message);
            }
        })
        .catch(function (error) {
            console.log(error);
        });
}
</script>