<template>
  <div class="login-view d-flex align-center justify-center">
    <div class="login-form">
      <h1>Login</h1>
      <v-btn color="primary" @click="loginWithGoogle">
        <v-icon left>mdi-google</v-icon>
        Login com Google
      </v-btn>
    </div>
  </div>
</template>

<script setup>
import { useAppStore } from '@/stores/app';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useTheme } from 'vuetify';

const appStore = useAppStore();
const theme = useTheme();

const loginWithGoogle = async () => {
  const auth = getAuth();
  const provider = new GoogleAuthProvider();

  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    // Armazenar os dados do usuário no Pinia
    appStore.login({
      name: user.displayName,
      email: user.email,
      photoURL: user.photoURL,
    });
  } catch (error) {
    console.error('Erro ao fazer login com Google:', error);
  }
};

const toggleTheme = () => {
  const currentTheme = theme.global.current.value.dark ? 'light' : 'dark';
  theme.change(currentTheme);
};
</script>

<style scoped>
.login-view {
  height: 100vh;
  background-color: v-bind(theme.global.current.value.dark ? '#121212' : '#f0f4f8'); /* Responsivo ao tema */
  display: flex;
  align-items: center;
  justify-content: center;
}

.login-form {
  background-color: v-bind(theme.global.current.value.dark ? '#1E1E1E' : '#ffffff'); /* Fundo responsivo ao tema */
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
  border: 2px solid v-bind(theme.global.current.value.dark ? '#BB86FC' : '#1976D2'); /* Cor primária ou secundária */
}

.login-form h1 {
  color: v-bind(theme.global.current.value.dark ? '#BB86FC' : '#1976D2'); /* Título responsivo ao tema */
  margin-bottom: 1.5rem;
}

.login-form v-btn {
  background-color: v-bind(theme.global.current.value.dark ? '#BB86FC' : '#1976D2'); /* Botão responsivo ao tema */
  color: #ffffff; /* Texto branco para contraste */
}

.login-form v-btn:hover {
  background-color: v-bind(theme.global.current.value.dark ? '#9A67EA' : '#1565C0'); /* Tom mais escuro ao passar o mouse */
}
</style>
