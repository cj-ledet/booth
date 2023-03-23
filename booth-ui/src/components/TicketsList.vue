<template>
  <div class="list row">
    <div class="col-md-8">
      <div class="input-group mb-3">
        <input type="text" class="form-control" placeholder="Search by User ID"
          v-model="user_id"/>
        <div class="input-group-append">
          <button class="btn btn-outline-secondary" type="button"
            @click="searchUserTickets"
          >
            Search
          </button>
        </div>
      </div>
    </div>
    <div class="col-md-6">
      <h4>Tickets List</h4>
      <ul class="list-group">
        <li class="list-group-item"
          :class="{ active: index == currentIndex }"
          v-for="(ticket, index) in tickets"
          :key="index"
          @click="setActiveTicket(ticket, index)"
        >
          {{ ticket.user_id }}
        </li>
      </ul>

    </div>
    <div class="col-md-6">
      <div v-if="currentTicket">
        <h4>Ticket</h4>
        <div>
          <label><strong>Subject:</strong></label> {{ currentTicket.subject }}
        </div>
        <div>
          <label><strong>Severity:</strong></label> {{ currentTicket.severity }}
        </div>
        <div>
          <label><strong>User ID:</strong></label> {{ currentTicket.user_id }}
        </div>

        <a class="badge badge-warning"
          :href="'/tickets/' + currentTicket.id"
        >
          Edit
        </a>
      </div>
      <div v-else>
        <br />
        <p>Please click on a Ticket...</p>
      </div>
    </div>
  </div>
</template>

<script>
import TicketDataService from "../services/TicketDataService";

export default {
  name: "tickets-list",
  data() {
    return {
      tickets: [],
      currentTicket: null,
      currentIndex: -1,
      user_id: ""
    };
  },
  methods: {
    retrieveTickets() {
      TicketDataService.getAll()
        .then(response => {
          this.tickets = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },

    refreshList() {
      this.retrieveTickets();
      this.currentTicket = null;
      this.currentIndex = -1;
    },

    setActiveTicket(ticket, index) {
      this.currentTicket = ticket;
      this.currentIndex = index;
    },
    
    searchUserTickets() {
      TicketDataService.findByUser(this.user_id)
        .then(response => {
          this.tickets = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  mounted() {
    this.retrieveTickets();
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
