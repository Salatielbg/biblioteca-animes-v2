<template>
  <v-container fluid class="home-wrapper">
    <div class="home-inner">
    <v-row class="mb-4">
      <v-col cols="12">
        <div class="d-flex justify-space-between align-center flex-wrap ga-3">
          <div class="mb-2 mb-sm-0">
            <h1 :class="$vuetify.display.xs ? 'text-h5' : 'text-h4'" class="mb-2">Biblioteca de Animes</h1>
            <p :class="$vuetify.display.xs ? 'text-body-2' : 'text-subtitle-1'" class="text-grey">Gerencie sua coleção de animes favoritos</p>
          </div>
          <v-btn
            color="primary"
            :size="$vuetify.display.xs ? 'default' : 'large'"
            prepend-icon="mdi-plus"
            @click="$router.push('/gerenciar')"
            :block="$vuetify.display.xs"
          >
            Adicionar Anime
          </v-btn>
        </div>
      </v-col>
    </v-row>

    <!-- Filtros e Busca -->
    <v-row class="mb-4">
      <v-col cols="12" md="6">
        <v-text-field
          v-model="searchQuery"
          label="Buscar anime..."
          prepend-inner-icon="mdi-magnify"
          variant="outlined"
          :density="$vuetify.display.xs ? 'compact' : 'comfortable'"
          clearable
          hide-details
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="6" md="3">
        <v-select
          v-model="filterGenero"
          :items="['Todos', ...generos]"
          label="Filtrar por Gênero"
          variant="outlined"
          :density="$vuetify.display.xs ? 'compact' : 'comfortable'"
          hide-details
        ></v-select>
      </v-col>
      <v-col cols="12" sm="6" md="3">
        <v-select
          v-model="filterStatus"
          :items="['Todos', ...statusOptions]"
          label="Filtrar por Status"
          variant="outlined"
          :density="$vuetify.display.xs ? 'compact' : 'comfortable'"
          hide-details
        ></v-select>
      </v-col>
    </v-row>

    <!-- Estatísticas -->
    <v-row class="mb-4">
      <v-col cols="6" sm="6" md="3" v-for="stat in statistics" :key="stat.title">
        <v-card elevation="2">
          <v-card-text :class="$vuetify.display.xs ? 'pa-3' : ''">
            <div class="d-flex align-center">
              <v-icon :color="stat.color" :size="$vuetify.display.xs ? 30 : 40" class="mr-2 mr-sm-3">{{ stat.icon }}</v-icon>
              <div>
                <div :class="$vuetify.display.xs ? 'text-h6' : 'text-h5'" class="font-weight-bold">{{ stat.value }}</div>
                <div :class="$vuetify.display.xs ? 'text-caption' : 'text-body-2'" class="text-grey">{{ stat.title }}</div>
              </div>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Lista de Animes -->
    <v-row v-if="filteredAnimes.length > 0">
      <v-col
        cols="12"
        sm="6"
        md="4"
        lg="3"
        v-for="anime in filteredAnimes"
        :key="anime.id"
      >
        <AnimeCard
          :anime="anime"
          @view="viewAnime"
          @edit="editAnime"
          @delete="confirmDelete"
        />
      </v-col>
    </v-row>

    <!-- Estado vazio -->
    <v-row v-else>
      <v-col cols="12">
        <v-card elevation="0" class="text-center pa-8">
          <v-icon size="80" color="grey-lighten-1">mdi-television-off</v-icon>
          <h3 class="text-h5 mt-4 mb-2">Nenhum anime encontrado</h3>
          <p class="text-body-1 text-grey mb-4">
            {{ animes.length === 0 ? 'Adicione seu primeiro anime à biblioteca' : 'Tente ajustar os filtros de busca' }}
          </p>
          <v-btn
            v-if="animes.length === 0"
            color="primary"
            prepend-icon="mdi-plus"
            @click="$router.push('/gerenciar')"
          >
            Adicionar Anime
          </v-btn>
        </v-card>
      </v-col>
    </v-row>

    <!-- Dialog de Confirmação de Exclusão -->
    <v-dialog v-model="deleteDialog" max-width="500">
      <v-card>
        <v-card-title class="text-h5">Confirmar Exclusão</v-card-title>
        <v-card-text>
          Tem certeza que deseja excluir <strong>{{ animeToDelete?.titulo }}</strong>?
          Esta ação não pode ser desfeita.
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="grey" variant="text" @click="deleteDialog = false">
            Cancelar
          </v-btn>
          <v-btn color="error" variant="text" @click="deleteAnime">
            Excluir
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Snackbar -->
    <v-snackbar v-model="snackbar" :color="snackbarColor" :timeout="3000">
      {{ snackbarText }}
      <template v-slot:actions>
        <v-btn variant="text" @click="snackbar = false">Fechar</v-btn>
      </template>
    </v-snackbar>
    </div>
  </v-container>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import supabaseService from '@/services/supabaseService';
import AnimeCard from '@/components/AnimeCard.vue';

const router = useRouter();

// Refs
const animes = ref([]);
const searchQuery = ref('');
const filterGenero = ref('Todos');
const filterStatus = ref('Todos');
const deleteDialog = ref(false);
const animeToDelete = ref(null);
const snackbar = ref(false);
const snackbarText = ref('');
const snackbarColor = ref('success');

// Data
const generos = [
  'Ação', 'Aventura', 'Comédia', 'Drama', 'Fantasia',
  'Ficção Científica', 'Romance', 'Suspense', 'Terror',
  'Slice of Life', 'Esporte', 'Mistério'
];

const statusOptions = ['Assistindo', 'Completo', 'Planejado', 'Pausado'];

// Computed
const filteredAnimes = computed(() => {
  if (!Array.isArray(animes.value)) {
    console.error('Animes não é um array:', animes.value);
    return [];
  }

  let result = animes.value;

  // Filtro de busca
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    result = result.filter(anime =>
      anime.titulo.toLowerCase().includes(query) ||
      anime.sinopse.toLowerCase().includes(query)
    );
  }

  // Filtro de gênero
  if (filterGenero.value && filterGenero.value !== 'Todos') {
    result = result.filter(anime => anime.genero === filterGenero.value);
  }

  // Filtro de status
  if (filterStatus.value && filterStatus.value !== 'Todos') {
    result = result.filter(anime => anime.status === filterStatus.value);
  }

  return result;
});

const statistics = computed(() => {
  return [
    {
      title: 'Total de Animes',
      value: animes.value.length,
      icon: 'mdi-television',
      color: 'primary'
    },
    {
      title: 'Assistindo',
      value: animes.value.filter(a => a.status === 'Assistindo').length,
      icon: 'mdi-play-circle',
      color: 'green'
    },
    {
      title: 'Completos',
      value: animes.value.filter(a => a.status === 'Completo').length,
      icon: 'mdi-check-circle',
      color: 'blue'
    },
    {
      title: 'Nota Média',
      value: animes.value.length > 0
        ? (animes.value.reduce((sum, a) => sum + a.nota, 0) / animes.value.length).toFixed(1)
        : '0.0',
      icon: 'mdi-star',
      color: 'amber'
    }
  ];
});

// Methods
const loadAnimes = async () => {
  const response = await supabaseService.getAnimes();
  animes.value = Array.isArray(response.data) ? response.data : [];
};

const deleteAnime = async () => {
  if (animeToDelete.value) {
    const success = await supabaseService.deleteAnime(animeToDelete.value.id);
    if (success) {
      loadAnimes();
      showSnackbar('Anime excluído com sucesso!', 'success');
      deleteDialog.value = false;
      animeToDelete.value = null;
    } else {
      showSnackbar('Erro ao excluir anime.', 'error');
    }
  }
};

const viewAnime = (id) => {
  router.push(`/anime/${id}`);
};

const editAnime = (id) => {
  router.push(`/gerenciar/${id}`);
};

const confirmDelete = (id) => {
  animeToDelete.value = animes.value.find(a => a.id === id) || null;
  deleteDialog.value = true;
};

const showSnackbar = (text, color = 'success') => {
  snackbarText.value = text;
  snackbarColor.value = color;
  snackbar.value = true;
};

// Lifecycle
onMounted(() => {
  loadAnimes();
});
</script>

<style scoped>
.flex-wrap {
  flex-wrap: wrap;
  gap: 16px;
}

.home-wrapper {
  min-height: calc(100vh - 64px); /* considera possível appbar de 64px */
  display: flex;
  align-items: center; /* centraliza verticalmente */
  justify-content: center; /* centraliza horizontalmente */
  padding: 24px;
}

.home-inner {
  width: 100%;
  max-width: 1200px; /* limita largura em telas grandes */
  margin: 0 auto; /* centraliza horizontalmente em telas largas */
}

@media (max-width: 600px) {
  .home-wrapper {
    padding: 12px;
    min-height: calc(100vh - 56px);
  }
}
</style>
