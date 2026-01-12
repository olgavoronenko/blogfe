import axios from "axios"

export const useAuthStore = defineStore('authStore', {
  state: () => ({
    user: null,
    errors: null,
  }),

  actions: {
    clearErrors() {
      this.errors = null;
    },

    async getUser() {
      try {
        let res = await axios.get('http://127.0.0.1:8000/api/user');
        this.user = res.data;
      } catch (err) {}
    },

    async getXSRFToken() {
      await axios.get('http://127.0.0.1:8000/sanctum/csrf-cookie');
    },

    async login({ email, password }) {
      try {
   
        await this.getXSRFToken();

        let res = await axios.post('http://127.0.0.1:8000/api/login', {
          email,
          password,
        });

        this.user = res.data;
        this.errors = null;

      } catch (err: any) {
        this.errors = err.response?.data?.errors;
      }
    },

    async register({ name, email, password, password_confirmation }) {
      try {
        let res = await axios.post('http://127.0.0.1:8000/api/register', {
          name,
          email,
          password,
          password_confirmation,
        });
        this.user = res.data;
        this.errors = null;
      } catch (err: any) {
        this.errors = err.response?.data?.errors;
      }
    },

    async logout() {
      await axios.delete('http://127.0.0.1:8000/api/logout');
      this.user = null;
    }
  },
});
