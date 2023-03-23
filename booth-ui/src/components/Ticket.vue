<template>
  <div v-if="currentTicket" class="edit-form">
    <h4>Ticket</h4>
    <form>
      <div class="form-group">
        <label for="subject">Subject</label>
        <input type="text" class="form-control" id="subject"
          v-model="currentTicket.subject"
        />
      </div>
      <div class="form-group">
        <label for="severity">Severity</label>
        <input type="text" class="form-control" id="severity"
          v-model="currentTicket.severity"
        />
      </div>

      <div class="form-group">
        <label><strong>User ID</strong></label>
         <input type="text" class="form-control" id="user_id"
          v-model="currentTicket.user_id"
        />
      </div>
    </form>
    <p>{{ message }}</p>
  </div>

  <div v-else>
    <br />
    <p>Please click on a Ticket...</p>
  </div>
</template>

<script>
import TicketDataService from "../services/TicketDataService";

export default {
  name: "ticket",
  data() {
    return {
      currentTicket: null,
      message: ''
    };
  },
  methods: {
    getTicket(id) {
      TicketDataService.get(id)
        .then(response => {
          this.currentTicket = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },
  },
  mounted() {
    this.message = '';
    this.getTicket(this.$route.params.id);
  }
};
</script>

<style>
.edit-form {
  max-width: 300px;
  margin: auto;
}
</style>
