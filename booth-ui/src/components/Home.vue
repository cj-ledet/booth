<template>
  <div>
  <header>
    <div class="welcome-text" >
      <h1>Welcome to <span>Booth</span></h1>
      <a href="/register">Signup Now</a><br>
      <a href="/about">Learn About Booth</a>      
    </div>
  </header>
  </div>
</template>
<style>
body{
	background: url("../assets/background1.jpg");
	background-size: cover;
	background-repeat: no-repeat;
	background-position: center center;
	background-attachment: fixed;
}
header{
	height: 80vh;
	-webkit-background-size: cover;
	background-size: cover;
	background-position: center center;
	position: relative;
}
.welcome-text {
	position: absolute;
	width: 600px;
	height: 300px;

        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
	text-align: center;
}
.welcome-text h1 {
	color: #fff;
	text-transform: uppercase;
	font-size: 60px;
        text-align: center;
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
