<template>
  <div class="submit-form">
    <div v-if="!submitted">
      <h4>Ticket</h4>
      <div class="form-group">        
        <label for="subject">Subject</label>
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
        <label for="severity">Severity</label>
        <input
          class="form-control"
          id="severity"
          required
          v-model="ticket.severity"
          name="severity"
        />
      </div>

      <div class="form-group">
        <label for="details">Details</label>
        <input
          class="form-control"
          id="details"
          required
          v-model="ticket.details"
          name="details"
        />
      </div>
      
      <div class="form-group">
        <label for="user_id">User ID</label>
        <input
          class="form-control"
          id="user_id"
          required
          v-model="ticket.user_id"
          name="user_id"
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
	details: "",
        user_id: ""
      },
      submitted: false
    };
  },
  methods: {
    saveTicket() {
      var data = {
        subject: this.ticket.subject,
        severity: this.ticket.severity,
	details: this.ticket.details,
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
