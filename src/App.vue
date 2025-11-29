<template>
  <v-app>
    <v-app-bar color="primary" prominent>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title class="d-flex align-center">
        <v-icon size="32" class="mr-2">mdi-television-classic</v-icon>
        <span class="font-weight-bold">Biblioteca de Animes</span>
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <template v-if="appStore.isLogged">
        <v-avatar size="36" class="mr-2">
            <img :src="appStore.user.photoURL" style="width: 100%; height: 100%; object-fit: cover;" />
        </v-avatar>
        <span class="mr-4">{{ appStore.user.name }}</span>
        <v-btn style="background-color: red; color: white;" @click="logout">Logout</v-btn>
      </template>

      <v-btn icon @click="toggleTheme">
        <v-icon>{{ theme.global.current.value.dark ? 'mdi-weather-sunny' : 'mdi-weather-night' }}</v-icon>
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" temporary>
      <v-list>
        <v-list-item
          prepend-icon="mdi-library-shelves"
          title="Biblioteca de Animes"
          subtitle="Sistema de Gerenciamento"
        ></v-list-item>
      </v-list>

      <v-divider></v-divider>

      <v-list density="compact" nav>
        <v-list-item
          v-for="item in menuItems"
          :key="item.title"
          :prepend-icon="item.icon"
          :title="item.title"
          :to="item.to"
          :value="item.title"
        ></v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <RouterView />
    </v-main>

    <v-footer app class="bg-grey-lighten-3">
      <v-container>
        <v-row>
          <v-col cols="12" class="text-center">
            <span class="text-caption">
              © {{ currentYear }} Biblioteca de Animes | Desenvolvido com Vue 3 + Vuetify 3
            </span>
          </v-col>
        </v-row>
      </v-container>
    </v-footer>
  </v-app>
</template>

<script setup>
import { ref, computed } from 'vue'
import { RouterView } from 'vue-router'
import { useTheme } from 'vuetify'
import { useAppStore } from '@/stores/app'
import { useRouter } from 'vue-router';
import { getAuth, signOut } from 'firebase/auth';

const theme = useTheme()
const drawer = ref(false)
const appStore = useAppStore()
const router = useRouter()

const currentYear = computed(() => new Date().getFullYear())

const menuItems = [
  { title: 'Home', icon: 'mdi-home', to: '/' },
  { title: 'Adicionar Anime', icon: 'mdi-plus-circle', to: '/gerenciar' },
  { title: 'Sobre', icon: 'mdi-information', to: '/sobre' },
]

const toggleTheme = () => {
  theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark'
}

const logout = async () => {
  const auth = getAuth();
  try {
    await signOut(auth); // Encerra a sessão no Firebase
    appStore.logout();
    router.push('/login'); // Redirecionar para a tela de login
  } catch (error) {
    console.error('Erro ao fazer logout:', error);
  }
};
</script>

<style>
/* Reset de estilos globais */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  overflow-y: auto;
}

body {
  font-family: 'Roboto', sans-serif;
}
</style>
