<template>
  <div class="submit-form">
    <div v-if="!submitted">
      <div class="form-group">
        <label for="title">Subject</label>
        <input
          type="text"
          class="form-control"
          id="subject"
          required
          v-model="ticket.subject"
          name="subject"
        />
      </div>

      <div class="form-group">
        <label for="description">Severity</label>
        <input
          class="form-control"
          id="severity"
          required
          v-model="ticket.severity"
          name="severity"
        />
      </div>

      <button @click="saveTicket" class="btn btn-success">Submit</button>
    </div>

    <div v-else>
      <h4>You submitted successfully!</h4>
      <button class="btn btn-success" @click="newTicket">Add</button>
    </div>
  </div>
</template>

<script>
import TicketDataService from "../services/TicketDataService";

export default {
  name: "add-ticket",
  data() {
    return {
      ticket: {
        id: null,
        subject: "",
        severity: "",
        user_id: ""
      },
      submitted: false
    };
  },
  methods: {
    saveTicket() {
      var data = {
        subject: this.ticket.subject,
        description: this.ticket.severity,
		user_id: this.ticket.user_id
      };

      TicketDataService.create(data)
        .then(response => {
          this.ticket.id = response.data.id;
          console.log(response.data);
          this.submitted = true;
        })
        .catch(e => {
          console.log(e);
        });
    },
    
    newTicket() {
      this.submitted = false;
      this.ticket = {};
    }
  }
};
</script>

<style>
.submit-form {
  max-width: 300px;
  margin: auto;
}
</style>
