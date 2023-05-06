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
    
     <button type="submit" class="badge badge-success"
      @click="updateUser"
    >
      Update
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

export default {
  name: "userView",
  data() {
    return {
      currentUser: null,
      message: ''
    };
  },
  methods: {
    getUser(id) {
      UserService.getUser(id)
        .then(response => {
          this.currentUser = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },

    updateUser() {
      UserService.updateUser(this.currentUser.id, this.currentUser)
        .then(response => {
          console.log(response.data);
          this.message = 'The User was updated successfully!';
        })
        .catch(e => {
          console.log(e);
        });
    },
  },
  mounted() {
    this.message = '';
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
