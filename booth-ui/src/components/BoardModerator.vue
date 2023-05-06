<template>
  <div class="list row">
    <div class="col-md-8">
      <div class="input-group mb-3">
        <input type="text" class="form-control" placeholder="Search by User ID" v-model="user_id"/>
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
      <h4 style="color: white;">Tickets List</h4>
      <button type="submit" class="badge badge-success" v-if="!viewClosedTickets" @click="closedTickets(true)">View Closed Tickets</button>
      <button v-else class="badge badge-primary mr-2" @click="closedTickets(false)">View Open Tickets</button>
      <ul class="list-group">
        <li class="list-group-item"
          :class="{ active: index == currentIndex }"
          v-for="(ticket, index) in tickets"
          :key="index"
          @click="setActiveTicket(ticket, index)"
        >{{ ticket.id }}🎟 {{ ticket.subject }}</li>
      </ul>

    </div>
    <div class="col-md-6" style="color: white;">
      <div v-if="currentTicket">
        <h4>Ticket</h4>
        <div>
          <label><strong>Ticket ID:</strong></label> {{ currentTicket.id }}
        </div>
        <div>
          <label><strong>Subject:</strong></label> {{ currentTicket.subject }}
        </div>
        <div>
          <label><strong>Severity:</strong></label> {{ currentTicket.severity }}
        </div>
        <div>
          <label><strong>Details:</strong></label> {{ currentTicket.details }}
        </div>
        <div>
          <label><strong>User ID:</strong></label> {{ currentTicket.user_id }}
        </div>
        <div>
          <label><strong>Open Case:</strong></label> {{ currentTicket.status }}
        </div>

        <a class="badge badge-warning"
          :href="'/tickets/' + currentTicket.id"
        >
          Edit
        </a>
      </div>
      <div v-else>
        <br />
        <p>Select a Ticket...</p>
      </div>
    </div>
  </div>
</template>

<script>
import UserService from "../services/user.service";
export default {
  name: "tickets-list",
  data() {
    return {
      tickets: [],
      currentTicket: null,
      currentIndex: -1,
      user_id: "",
      viewClosedTickets: false
    };
  },
  methods: {
    retrieveTickets() {
      UserService.getModeratorBoard()
        .then(response => {
          if (!this.viewClosedTickets) { this.tickets = response.data.filter(ticket => ticket.status === true); }
          else { this.tickets = response.data.filter(ticket => ticket.status === false); }
        })
        .catch(e => {
          console.log(e);
        });
    },
    closedTickets(status) {
      this.viewClosedTickets = status;
      this.retrieveTickets();
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
      UserService.getModeratorBoardByUser(this.user_id)
        .then(response => {
          if (!this.viewClosedTickets) { this.tickets = response.data.filter(ticket => ticket.status === true); }
          else { this.tickets = response.data.filter(ticket => ticket.status === false); }
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
