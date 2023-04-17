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
        <label>Details</label>
         <input type="text" class="form-control" id="details"
          v-model="currentTicket.details"
        />
      </div>

      <div class="form-group">
        <label>User ID</label>
         <input type="text" class="form-control" id="user_id"
          v-model="currentTicket.user_id"
        />
      </div>
      <div class="form-group">
        <label>Open Ticket</label>
         <input type="text" class="form-control" id="status"
          v-model="currentTicket.status"
        />
      </div>
    </form>
    
     <button class="badge badge-primary mr-2"
      v-if="currentTicket.status"
      @click="updateStatus(false)"
    >
      Close Ticket
    </button>
    
    <button v-else class="badge badge-primary mr-2"
      @click="updateStatus(true)"
    >
      Open Ticket
    </button>
    
     <button type="submit" class="badge badge-success"
      @click="updateTicket"
    >
      Update
    </button>
    
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
      console.log(id);
      TicketDataService.get(id)
        .then(response => {
          this.currentTicket = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },
    
    updateStatus(status) {
      var data = {
        id: this.currentTicket.id,
        subject: this.currentTicket.subject,
        details: this.currentTicket.details,
        user_id: this.currentTicket.user_id,
        status: status
      };

      TicketDataService.update(this.currentTicket.id, data)
        .then(response => {
          console.log(response.data);
          this.currentTicket.status = status;
          this.message = 'The status was updated successfully!';
        })
        .catch(e => {
          console.log(e);
        });
    },

    updateTicket() {
      TicketDataService.update(this.currentTicket.id, this.currentTicket)
        .then(response => {
          console.log(response.data);
          this.message = 'The ticket was updated successfully!';
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
