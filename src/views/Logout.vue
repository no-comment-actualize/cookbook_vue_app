<template>
  <div class="logout">
  </div>
</template>

<script>
import axios from "axios";

export default {
  created: function() {
    delete axios.defaults.headers.common["Authorization"];
    localStorage.removeItem("jwt");
    localStorage.removeItem("user_id");
    localStorage.removeItem("email");
    // this.$router.push("/");
    // if you need to refresh App.vue
    window.location.href = "/";
  }
};
</script>