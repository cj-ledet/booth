<template>
  <header>
    <div class="wrapper">
        <div class="logoPic">
           <!-- <<img src="images/ticket.png" alt=""> -->
        </div>
    </div>

    <div class="welcome-text">
      <h1>Welcome to <span>Booth</span></h1>
      <a href="#">Start Now</a><br>
      <a href="#">Learn About Booth</a>      
    </div>
  </header>
</template>

<script>
import UserService from "../services/user.service";

export default {
  name: "Home",
  data() {
    return {
      content: "",
    };
  },
  mounted() {
    UserService.getPublicContent().then(
      (response) => {
        this.content = response.data;
      },
      (error) => {
        this.content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
      }
    );
  },
};
</script>
