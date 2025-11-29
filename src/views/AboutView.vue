<template>
  <v-container :fluid="$vuetify.display.xs" class="home-wrapper">
    <div class="home-inner">
    <v-row>
      <v-col cols="12">
        <v-btn
          variant="text"
          prepend-icon="mdi-arrow-left"
          @click="$router.push('/')"
          class="mb-4"
          :size="$vuetify.display.xs ? 'small' : 'default'"
        >
          Voltar
        </v-btn>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" md="10" lg="8" class="mx-auto">
        <v-card elevation="4" class="mb-4">
          <v-card-title :class="$vuetify.display.xs ? 'text-h5 pa-4' : 'text-h4 pa-6'" class="text-center">
            <v-icon :size="$vuetify.display.xs ? 36 : 48" color="primary" class="mr-2 mr-sm-3">mdi-information</v-icon>
            Sobre o Sistema
          </v-card-title>

          <v-divider></v-divider>

          <v-card-text :class="$vuetify.display.xs ? 'pa-4' : 'pa-6'">
            <h3 :class="$vuetify.display.xs ? 'text-subtitle-1' : 'text-h6'" class="mb-3 font-weight-bold">📚 Biblioteca de Animes</h3>
            <p :class="$vuetify.display.xs ? 'text-body-2' : 'text-body-1'" class="mb-4" style="line-height: 1.8;">
              Sistema completo de gerenciamento de animes desenvolvido com <strong>Vue 3</strong> e
              <strong>Vuetify 3</strong>. Esta aplicação permite catalogar, organizar e acompanhar
              sua coleção pessoal de animes favoritos com uma interface moderna e responsiva.
            </p>

            <h3 class="text-h6 mb-3">✨ Funcionalidades Principais</h3>
            <v-list density="compact" class="mb-4">
              <v-list-item prepend-icon="mdi-plus-circle">
                <v-list-item-title>Adicionar novos animes com informações detalhadas</v-list-item-title>
              </v-list-item>
              <v-list-item prepend-icon="mdi-view-list">
                <v-list-item-title>Listar todos os animes em cards visuais</v-list-item-title>
              </v-list-item>
              <v-list-item prepend-icon="mdi-pencil">
                <v-list-item-title>Editar informações de animes existentes</v-list-item-title>
              </v-list-item>
              <v-list-item prepend-icon="mdi-delete">
                <v-list-item-title>Remover animes da biblioteca</v-list-item-title>
              </v-list-item>
              <v-list-item prepend-icon="mdi-filter">
                <v-list-item-title>Filtrar por gênero e status</v-list-item-title>
              </v-list-item>
              <v-list-item prepend-icon="mdi-magnify">
                <v-list-item-title>Buscar animes por título ou sinopse</v-list-item-title>
              </v-list-item>
              <v-list-item prepend-icon="mdi-chart-bar">
                <v-list-item-title>Visualizar estatísticas da coleção</v-list-item-title>
              </v-list-item>
              <v-list-item prepend-icon="mdi-theme-light-dark">
                <v-list-item-title>Alternar entre tema claro e escuro</v-list-item-title>
              </v-list-item>
            </v-list>

            <h3 :class="$vuetify.display.xs ? 'text-subtitle-1' : 'text-h6'" class="mb-3 font-weight-bold">🛠️ Tecnologias Utilizadas</h3>
            <v-row class="mb-4">
              <v-col cols="6" sm="4" md="4" v-for="tech in technologies" :key="tech.name">
                <v-card elevation="2" class="text-center" :class="$vuetify.display.xs ? 'pa-2' : 'pa-4'">
                  <v-icon :color="tech.color" :size="$vuetify.display.xs ? 30 : 40" class="mb-2">{{ tech.icon }}</v-icon>
                  <div :class="$vuetify.display.xs ? 'text-caption' : 'text-subtitle-2'" class="font-weight-bold">{{ tech.name }}</div>
                  <div class="text-caption text-grey">{{ tech.version }}</div>
                </v-card>
              </v-col>
            </v-row>

            <h3 class="text-h6 mb-3">📊 Estatísticas do Sistema</h3>
            <v-row class="mb-4">
              <v-col cols="12" sm="6" v-for="stat in systemStats" :key="stat.label">
                <v-card elevation="1" class="pa-4">
                  <div class="d-flex justify-space-between align-center">
                    <span class="text-subtitle-2">{{ stat.label }}</span>
                    <v-chip :color="stat.color" size="small">{{ stat.value }}</v-chip>
                  </div>
                </v-card>
              </v-col>
            </v-row>

            <v-divider class="my-4"></v-divider>

            <div class="text-center">
              <p class="text-caption text-grey mb-2">
                Desenvolvido para a disciplina de Frameworks Modernos para Desenvolvimento de Sistemas
              </p>
              <p class="text-caption text-grey">
                <strong>UNEMAT - TADS</strong> | Versão {{ version }} | {{ currentYear }}
              </p>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    </div>
  </v-container>
</template>

<script setup>
import { ref, computed } from 'vue'
import { storageService } from '@/services/storage'

const version = ref('1.0.0')
const currentYear = computed(() => new Date().getFullYear())

const technologies = [
  { name: 'Vue 3', version: '3.x', icon: 'mdi-vuejs', color: 'green' },
  { name: 'Vuetify 3', version: '3.x', icon: 'mdi-material-design', color: 'blue' },
  { name: 'Vue Router', version: '4.x', icon: 'mdi-routes', color: 'orange' },
  { name: 'TypeScript', version: '5.x', icon: 'mdi-language-typescript', color: 'blue-darken-2' },
  { name: 'Vite', version: '5.x', icon: 'mdi-lightning-bolt', color: 'purple' },
  { name: 'localStorage', version: 'API', icon: 'mdi-database', color: 'amber' }
]

const systemStats = computed(() => {
  const animes = storageService.getAnimes()
  return [
    { label: 'Total de Animes', value: animes.length, color: 'primary' },
    { label: 'Gêneros Únicos', value: new Set(animes.map(a => a.genero)).size, color: 'secondary' },
    { label: 'Animes Completos', value: animes.filter(a => a.status === 'Completo').length, color: 'success' },
    { label: 'Assistindo Agora', value: animes.filter(a => a.status === 'Assistindo').length, color: 'info' }
  ]
})
</script>
