<script setup>
import { useUserStore } from "../stores/counter";
const userStore = useUserStore();
// 确认按钮点击事件
const confirm = () => {
    userStore.setDiaLogMessage("")
    userStore.setDiaLogSwitch(false);
};

// 取消按钮点击事件
const cancel = () => {
    userStore.setDiaLogMessage("")
    userStore.setDiaLogSwitch(false);
};
</script>

<template>
    <el-dialog v-model="userStore.$state.dialogSwtich" title="Tips" width="30%">
        <span>{{ userStore.$state.dialogMessage }}</span>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="cancel">取消</el-button>
                <el-button type="primary" @click="confirm">
                    确认
                </el-button>
            </span>
        </template>
    </el-dialog>
</template>