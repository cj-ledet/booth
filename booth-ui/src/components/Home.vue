<body>
<header>
    <div class="welcome-text">
      <h1>Welcome to <span>Booth</span></h1>
      <a href="#">Start Now</a><br>
      <a href="#">Learn About Booth</a>      
    </div>
</header>

<style>
*{
  margin: 0;
  padding: 0;
}
header{
  background: url("../assets/background1.jpg");
	height: 100vh;
	width: 100%;
	-webkit-background-size: cover;
	background-size: cover;
	background-position: center center;
	position: relative;
}
.welcome-text {
	position: absolute;
	width: 600px;
	height: 300px;
	margin: 20% 30%;
	text-align: center;
}
.welcome-text h1 {
	text-align: center;
	color: #fff;
	text-transform: uppercase;
	font-size: 60px;
}
.welcome-text h1 span {
	color: #ff0000;
}
.welcome-text a {
	border: 1px solid #fff;
	padding: 10px 25px;
	text-decoration: none;
	text-transform: uppercase;
	font-size: 14px;
	margin-top: 20px;
	display: inline-block;
	color: #fff;
}
.welcome-text a:hover {
	background: #fff;
	color: #333;
}
</style>

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
