import { createWebHistory, createRouter } from "vue-router";
import Home from "./components/Home.vue";
import Login from "./components/Login.vue";
import Register from "./components/Register.vue";
// lazy-loaded
const Profile = () => import("./components/Profile.vue")
const BoardAdmin = () => import("./components/BoardAdmin.vue")
const BoardModerator = () => import("./components/BoardModerator.vue")
const BoardUser = () => import("./components/BoardUser.vue")
const User = () => import("./components/User.vue")
const About = () => import("./components/About.vue")

const routes = [
    {
      path: "/tickets/:id",
      name: "ticket-details",
      component: () => import("./components/Ticket")
    },
    {
      path: "/add",
      name: "add",
      component: () => import("./components/AddTicket")
    },
    {
      path: "/",
      name: "home",
      component: Home,
    },
    {
      path: "/home",
      component: Home,
    },
    {
      path: "/about",
      component: About,
    },
    {
      path: "/login",
      component: Login,
    },
    {
      path: "/register",
      component: Register,
    },
    {
      path: "/profile",
      name: "profile",
      component: Profile,
    },
    {
      path: "/admin",
      name: "admin",
      component: BoardAdmin,
    },
    {
      path: "/admin/:id",
      name: "user-details",
      component: User,
    },
    {
      path: "/mod",
      name: "moderator",
      component: BoardModerator,
    },
    {
      path: "/user",
      name: "user",
      component: BoardUser,
    },    
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
  const publicPages = ['/login', '/register', '/home', '/'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem('user');

  // trying to access a restricted page + not logged in
  // redirect to login page
  if (authRequired && !loggedIn) {
    next('/login');
  } else {
    next();
  }
});

export default router;
