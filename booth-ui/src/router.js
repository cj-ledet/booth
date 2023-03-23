import { createWebHistory, createRouter } from "vue-router";

const routes = [
    {
      path: "/",
      alias: "/tickets",
      name: "tickets",
      component: () => import("./components/TicketsList")
    },
    {
      path: "/tickets/:id",
      name: "ticket-details",
      component: () => import("./components/Ticket")
    },
    {
      path: "/add",
      name: "add",
      component: () => import("./components/AddTicket")
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
