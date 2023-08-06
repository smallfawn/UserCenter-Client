import { defineStore } from 'pinia'


export const useUserStore = defineStore('user', {
  state: () => ({
    username: '',
    password: '',
    useremail: '',
    userpoints: '',
    usergroup: '',
    userqq: '',
    code: '',
    dialogMessage: '',
    dialogSwtich: false,
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
    setUserGroup(value) {
      this.usergroup = value;
    },
    setUserQQ(value) {
      this.userqq = value;
    },
    setCode(value) {
      this.code = value;
    },
    setDiaLogMessage(value) {
      this.dialogMessage = value
    },
    setDiaLogSwitch(value) {
      this.dialogSwtich = value
    }
  }
});
