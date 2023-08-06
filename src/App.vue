<template>
  <div id="app">
    <div class="container">
      <router-view>
      </router-view>
    </div>
  </div>
</template>

<script setup>

</script>

<style scoped>
.container {
  margin-top: 50px;
  max-width: 590px;
  margin-left: auto;
  margin-right: auto;
}

.card-header {
  background-color: #f5f5f5;
  padding: 10px;
}

.login-form {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.login-buttons {
  display: flex;
  justify-content: space-between;
}
</style>
