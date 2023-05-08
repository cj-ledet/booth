<template>
  <div class="list row">
    <div class="col-md-6">
      <h4 style="color: white;">Tickets List</h4>
      <button type="submit" class="badge badge-success" v-if="!viewClosedTickets" @click="closedTickets(true)">View Closed Tickets</button>
      <button v-else class="badge badge-primary mr-2" @click="closedTickets(false)">View Open Tickets</button>
      <table class="table table-striped">
        <thead>
          <tr>
            <th scope="col">Ticket ID</th>
            <th scope="col">Subject</th>
            <th scope="col">Severity</th>
            <th scope="col">Details</th>
            <th scope="col">User ID</th>
            <th scope="col">Open Case</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(ticket, index) in tickets"
              :key="index"
              @click="setActiveTicket(ticket, index)"
              :class="{ active: index == currentIndex }"
            <td>{{ ticket.id }}🎟</td>
            <td>{{ ticket.subject }}</td>
            <td>{{ ticket.severity }}</td>
            <td>{{ ticket.details }}</td>
            <td>{{ ticket.user_id }}</td>
            <td>{{ ticket.status }}</td>
            <td>
              <a class="badge badge-warning"
                :href="'/tickets/' + currentTicket.id"
              >
                Edit
              </a>
            </td>
          </tr>
        </tbody>
      </table>

    </div>
    <div class="col-md-6" style="color: white;">
      <div v-if="currentTicket">
        <h4>Ticket</h4>
        <table>
          <tr>
            <td><strong>Ticket ID:</strong></td>
            <td>{{ currentTicket.id }}</td>
          </tr>
          <tr>
            <td><strong>Subject:</strong></td>
            <td>{{ currentTicket.subject }}</td>
          </tr>
          <tr>
            <td><strong>Severity:</strong></td>
            <td>{{ currentTicket.severity }}</td>
          </tr>
          <tr>
            <td><strong>Details:</strong></td>
            <td>{{ currentTicket.details }}</td>
          </tr>
          <tr>
            <td><strong>User ID:</strong></td>
            <td>{{ currentTicket.user_id }}</td>
          </tr>
          <tr>
            <td><strong>Open Case:</strong></td>
            <td>{{ currentTicket.status }}</td>
          </tr>
        </table>
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
      viewClosedTickets: false
    };
  },
  methods: {
    retrieveTickets() {
      TicketDataService.findByUser(this.$store.state.auth.user.id)
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
    //Not currently called but built for possible future need to refresh the list view (ex. deleting items)
    refreshList() {
      this.retrieveTickets();
      this.currentTicket = null;
      this.currentIndex = -1;
    },
    setActiveTicket(ticket, index) {
      this.currentTicket = ticket;
      this.currentIndex = index;
    }
  },
  mounted() {
    this.retrieveTickets();
  }
};
</script>

<style>
.table {
  border-collapse: collapse;
  width: 100%;
}

.table th, .table td {
  padding: 8px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

.table th {
  background-color: #c9c7c7;
}

.table tr:hover {
  background-color: #d9d7d7;
}
</style>
