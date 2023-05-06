<template>
  <div class="list row">
    <div class="col-md-6">
      <h4 style="color: white;">Users List</h4>
      <ul class="list-group">
        <li class="list-group-item"
          :class="{ active: index == currentIndex }"
          v-for="(user, index) in users"
          :key="index"
          @click="setActiveUser(user, index)"
        >{{ user.id }}🎟 {{ user.email }}</li>
      </ul>

    </div>
    <div class="col-md-6" style="color: white;">
      <div v-if="currentUser">
        <h4>User</h4>
        <div>
          <label><strong>User ID:</strong></label> {{ currentUser.id }}
        </div>
        <div>
          <label><strong>Username:</strong></label> {{ currentUser.username }}
        </div>
        <div>
          <label><strong>Email:</strong></label> {{ currentUser.email }}
        </div>
        
        <!--TODO Need to restructure backend admin API to accept user ID they would like to edit or view more in depth*/-->
        <a class="badge badge-warning"
          :href="'/admin/' + currentUser.id" 
        >
          Edit
        </a>
      </div>
      <div v-else>
        <br />
        <p style="color: white; font-size: 1.5em;">Select a User...</p>
      </div>
    </div>
  </div>
</template>

<script>
import UserServive from "../services/user.service";

export default {
  name: "users-list",
  data() {
    return {
      users: [],
      currentUser: null,
      currentIndex: -1,
    };
  },
  methods: {
    retrieveUsers() {
      UserServive.getAdminBoard()
        .then(response => {
          this.users = response.data;
        })
        .catch(e => {
          console.log(e);
        });
    },

    /*Not currently called but built for possible future need to refresh the list view (ex. deleting items)*/
    refreshList() {
      this.retrieveUsers();
      this.currentUser = null;
      this.currentIndex = -1;
    },

    setActiveUser(user, index) {
      this.currentUser = user;
      this.currentIndex = index;
    }
  },
  mounted() {
    this.retrieveUsers();
  }
};
</script>

<style>
.list {
  text-align: left;
  max-width: 750px;
  margin: auto;
}
</style>
