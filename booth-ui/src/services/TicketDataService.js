import http from "../http-common";

class TicketDataService {
  getAll() {
    return http.get("/tickets");
  }
  get(id) {
    return http.get(`/tickets/${id}`);
  }
  create(data) {
    return http.post("/tickets", data);
  }
  findByUser(user_id) {
    return http.get(`/tickets?user_id=${user_id}`);
  }
}
export default new TicketDataService();
