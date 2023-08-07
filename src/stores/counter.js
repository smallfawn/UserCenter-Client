import { defineStore } from 'pinia'
export const useUserStore = defineStore('user', {
  state: () => ({
    username: '',
    password: '',
    useremail: '',
    userpoints: '',
    usergroups: '',
    userqq: '',
    userkey: '',
    code: '',
    dialogMessage: '',
    dialogSwtich: false,
    noticeMessage: '',
  }),
  actions: {
    setUserName(value) {
      this.username = value;
    },
    setUserEmail(value) {
      this.useremail = value;
    },
    setUserPoints(value) {
      this.userpoints = value;
    },
    setPassword(value) {
      this.password = value;
    },
    setUserGroups(value) {
      this.usergroups = value;
    },
    setUserQQ(value) {
      this.userqq = value;
    },
    setUserKey(value){
      this.userkey = value;
    },
    setCode(value) {
      this.code = value;
    },
    setDiaLogMessage(value) {
      this.dialogMessage = value
    },
    setDiaLogSwitch(value) {
      this.dialogSwtich = value
    },
    setNoticeMessage(value) {
      this.noticeMessage = value;
    }
  }
});
