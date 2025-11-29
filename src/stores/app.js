import { defineStore } from 'pinia';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

export const useAppStore = defineStore('app', {
  state: () => ({
    user: {
      name: '',
      email: '',
      photoURL: ''
    },
    isLogged: false
  }),
  getters: {
    getUser: (state) => state.user
  },
  actions: {
    login(user) {
      this.user = {
        name: user.name,
        email: user.email,
        photoURL: user.photoURL
      };
      this.isLogged = true;
    },
    logout() {
      this.user = {
        name: '',
        email: '',
        photoURL: ''
      };
      this.isLogged = false;
    },
    initializeAuth() {
      const auth = getAuth();
      onAuthStateChanged(auth, (user) => {
        if (user) {
          this.login({
            name: user.displayName,
            email: user.email,
            photoURL: user.photoURL
          });
        } else {
          this.logout();
        }
      });
    }
  }
});
