<template>
  <div v-if="currentUser" class="edit-form" style="color: white;">
    <h4>User</h4>
    <form>
      <div class="form-group">
        <label>Username</label>
         <input type="text" class="form-control" id="username"
          v-model="currentUser.username"
        />
      </div>
      <div class="form-group">
        <label>Email</label>
         <input type="text" class="form-control" id="email"
          v-model="currentUser.email"
        />
      </div>
    </form>
    
    <strong>Authorities:</strong>
    <ul>
      <li v-for="role in currentUser.roles" :key="role">{{role}}</li>
    </ul>
    
     <button type="submit" class="badge badge-success"
      @click="updateUser"
    >
      Update
    </button>
    <br>
    <button class="badge badge-primary mr-2"
      v-if="isMod"
      @click="updateMod(false)"
    >
      Remove Mod
    </button>
    
    <button v-else class="badge badge-primary mr-2"
      @click="updateMod(true)"
    >
      Add Mod
    </button>
    
    <br>
    <button class="badge badge-primary mr-2"
      v-if="isAdmin"
      @click="updateAdmin(false)"
    >
      Remove Admin
    </button>
    
    <button v-else class="badge badge-primary mr-2"
      @click="updateAdmin(true)"
    >
      Add Admin
    </button>
    
    <p>{{ message }}</p>
  </div>

  <div v-else>
    <br />
    <p>Please click on a User...</p>
  </div>
</template>

<script>
import UserService from "../services/user.service";
/* eslint-disable */
export default {
  name: "user",
  data() {
    return {
      currentUser: null,
      message: '',
      isMod: false,
      isAdmin: false
    };
  },
  methods: {
    getUser(id) {
      UserService.getUser(id)
        .then(user => {
          this.currentUser = user.data;
          this.currentUser.roles.forEach(role => {
            if (role == "MODERATOR") { this.isMod = true; } 
            if (role == "ADMIN") { this.isAdmin = true; } 
          });
        })
        .catch(e => {
          console.log(e);
        });
    },

    updateUser() {
      UserService.updateUser(this.currentUser.id, this.currentUser)
        .then(response => {
          this.message = response.message;
        })
        .catch(e => {
          this.message = 'Error: Unable to update user!';
        });
    },
    
    updateMod(status) {
      let role = "";
      if (status) { role = { roles: [ "addMod" ] }; } 
      else { role = { roles: [ "removeMod" ] }; }
      UserService.updateUser(this.currentUser.id, role)
        .then(response => {
          this.message = response.message;
        })
        .catch(e => {
          this.message = 'Error: Unable to update user role!';
        });
        this.getUser(this.$route.params.id);
    },
    
    updateAdmin(status) {
      let role = "";
      if (status) { role = { roles: [ "addAdmin" ] }; } 
      else { role = { roles: [ "removeAdmin" ] }; }
      UserService.updateUser(this.currentUser.id, role)
        .then(response => {
          this.message = response.message;
        })
        .catch(e => {
          this.message = 'Error: Unable to update user role!';
        });
        this.getUser(this.$route.params.id);
    },
    
  },
  mounted() {
    this.message = '';
    this.isMod = false;
    this.isAdmin = false;
    this.getUser(this.$route.params.id);
  }
};
</script>

<style>
.edit-form {
  max-width: 300px;
  margin: auto;
}
</style>
