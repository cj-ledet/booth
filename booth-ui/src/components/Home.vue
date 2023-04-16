

<template>
  <head>
  <meta charset="UTF-8">
    <title>Booth</title>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700;900&display=swap" rel="stylesheet">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="../assets/style.css">    
  </head>   
  <header>
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
