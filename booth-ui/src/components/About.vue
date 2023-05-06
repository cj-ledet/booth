<template>
    <div class="wrapper">
      <div class="About">
        <h1>Learn about <span>Booth</span></h1>
      </div>
      <div class="text-box">
        <h2>What Booth is all about </h2>
        <p>Booth is the online virtual ticketing system that allows users to make 
          <br> accounts, create work tickets, and manage those tickets to work more 
          <br> efficiently. We designed Booth to be a general purpose ticketing software 
          <br> that allows for easy integration in any type of project field. </p>
      </div>
      <div class="text-box">
        <h2>How to make an Account </h2>
        <img src="../assets/signUp.png" class="image1">
        <p>All you need to do is click Sign Up on the top left 
        <br> of the header to start. Next, choose a Username, 
        <br> Email, and password. You should be able to now start
        <br> making tickets on your new Account!</p>
      </div>
      <div class="text-box">
        <h2>Admin & Engineer </h2>
        <p>There are two kinds of Users on Booth. Admins and Engineers. 
        <br> The Engineer users are the ones who can get the tickets 
        <br> from Admin. Those Admin are the ones who manage tickets
        <br> and figure out who they should be assigned to. </p>
      </div>
      <div class="text-box">
        <h2>Creating a Ticket </h2>
        <img src="../assets/MakeTicket.png" class="image2">
        <p>To create a ticket, first you need to assign
        <br> a Subject. This is the initial Title of all Tickets.
        <br> Next, you assign a level of Severity. The levels
        <br> go from E to A. This is how quickly they need
        <br> to be completed. The details section is for  
        <br> any additional information you would like to be 
        <br> included in that ticket.  </p>
      </div>
    </div>
</template>

<style>
*{
  margin: 0;
  padding: 0;
}

.About {
  width: 600px;
  height: 100px;
  margin: 50px auto 100px auto;
  text-align: center;

}

.About h1 {
  text-align: center;
  color: #fff;
  text-transform: uppercase;
  font-size: 60px;
}

.About h1 span {
  color: #ff0000;
}

.wrapper {
  width: 1170px;
  margin: auto;
  position: relative;
  z-index: 0;
}

.text-box {
  width: 600px;
  min-height: 250px;
  background-color: #fff;
  margin: 50px auto;
  display: block;
  text-align: center;
  border-radius: 5px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  word-wrap: break-word;
  word-break: break-all;
  padding: 10px;
  margin-top: 50px auto;
}
.text-box .image2 {
  float: left;
  margin-right: 20px;
  width: 200px;
  height: auto;
  max-width: 30%;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
}
.text-box .image1 {
  float: right;
  margin-left: 20px;
  max-width: 25%;
  height: auto;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
}
</style>
