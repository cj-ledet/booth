<template>
  <div class="loginbox">
    <h1>Login</h1>
    <div class="card card-container" style="border-width: 0;">
      <Form @submit="handleLogin" :validation-schema="schema">
        <div class="form-group">
          <label for="username"><strong>Username</strong></label>
          <Field name="username" type="text" class="form-control" />
          <ErrorMessage name="username" class="error-feedback" />
        </div>
        <div class="form-group">
          <label for="password"><strong>Password</strong></label>
          <Field name="password" type="password" class="form-control" />
          <ErrorMessage name="password" class="error-feedback" />
        </div>

        <div class="form-group">
          <button class="btn btn-primary btn-block" :disabled="loading">
            <span
              v-show="loading"
              class="spinner-border spinner-border-sm"
            ></span>
            <span>Login</span>
          </button>
        </div>

        <div class="form-group">
          <div v-if="message" class="alert alert-danger" role="alert">
            {{ message }}
          </div>
        </div>
      </Form>
    </div>
  </div>
</template>

<script>
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";

export default {
  name: "Login",
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    const schema = yup.object().shape({
      username: yup.string().required("Username is required!"),
      password: yup.string().required("Password is required!"),
    });

    return {
      loading: false,
      message: "",
      schema,
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
  },
  created() {
    if (this.loggedIn) {
      this.$router.push("/user");
    }
  },
  methods: {
    handleLogin(user) {
      this.loading = true;

      this.$store.dispatch("auth/login", user).then(
        () => {
          this.$router.push("/user");
        },
        (error) => {
          this.loading = false;
          this.message =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
        }
      );
    },
  },
};
</script>

<style>
.loginbox {
    width: 340px;
    height: 460px;
    background: #ffffff;
    color: #000000;
    top: 50%;
    left: 50%;
    position: absolute;
    transform: translate(-50%,-50%);
    box-sizing: border-box;
    padding: 60px 30px;
}

.loginbox > h1 {
    margin: 0;
    padding: 0 0 20px;
    text-align: center;
    font-size: 22px;
    font-weight: bold;
}

.loginbox label {
    margin: 0;
    padding: 0;
    font-weight: bold;
}

.loginbox field {
    width: 100%;
    margin-bottom: 10px;
}

.loginbox field[type="text"],
.loginbox field[type="password"] {
    border: none;
    border-bottom: 1px solid #000000;
    background: transparent;
    outline: none;
    height: 40px;
    color: #000000;
    font-size: 16px;
}
</style>
