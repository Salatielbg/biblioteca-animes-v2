<template>
  <v-container v-if="anime" :fluid="$vuetify.display.xs" class="home-wrapper">
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
      <v-col cols="12" md="4">
        <v-card elevation="4">
          <v-img
            :src="anime.value.imagemUrl || 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=600'"
            :alt="anime.value.titulo || 'Capa do anime'"
            :height="$vuetify.display.xs ? 300 : 500"
            cover
          ></v-img>
        </v-card>

        <v-card elevation="2" class="mt-4">
          <v-card-text>
            <div class="d-flex justify-space-between align-center mb-2">
              <span class="text-subtitle-2 text-grey">Status</span>
              <v-chip :color="getStatusColor(anime.value.status)" size="small">
                {{ anime.value.status }}
              </v-chip>
            </div>
            <v-divider class="my-2"></v-divider>
            <div class="d-flex justify-space-between align-center mb-2">
              <span class="text-subtitle-2 text-grey">Gênero</span>
              <v-chip size="small">{{ anime.value.genero }}</v-chip>
            </div>
            <v-divider class="my-2"></v-divider>
            <div class="d-flex justify-space-between align-center mb-2">
              <span class="text-subtitle-2 text-grey">Episódios</span>
              <span class="font-weight-bold">{{ anime.value.episodios }}</span>
            </div>
            <v-divider class="my-2"></v-divider>
            <div class="d-flex justify-space-between align-center">
              <span class="text-subtitle-2 text-grey">Nota</span>
              <div class="d-flex align-center">
                <v-rating
                  :model-value="anime.value.nota"
                  density="compact"
                  half-increments
                  readonly
                  size="small"
                  color="amber"
                ></v-rating>
                <span class="ml-2 font-weight-bold">{{ anime.value.nota }}/10</span>
              </div>
            </div>
          </v-card-text>
        </v-card>

        <div class="d-flex flex-column gap-2 mt-4">
          <v-btn
            color="primary"
            prepend-icon="mdi-pencil"
            block
            @click="$router.push(`/gerenciar/${anime.value.id}`)"
          >
            Editar Anime
          </v-btn>
          <v-btn
            color="error"
            prepend-icon="mdi-delete"
            variant="outlined"
            block
            @click="confirmDelete"
          >
            Excluir Anime
          </v-btn>
        </div>
      </v-col>

      <v-col cols="12" md="8">
        <v-card elevation="4">
          <v-card-title :class="$vuetify.display.xs ? 'text-h5 pa-4' : 'text-h4 pa-6'">
            {{ anime.value.titulo }}
          </v-card-title>

          <v-divider></v-divider>

          <v-card-text :class="$vuetify.display.xs ? 'pa-4' : 'pa-6'">
            <h3 :class="$vuetify.display.xs ? 'text-subtitle-1' : 'text-h6'" class="mb-3 font-weight-bold">Sinopse</h3>
            <p :class="$vuetify.display.xs ? 'text-body-2' : 'text-body-1'" style="line-height: 1.8;">
              {{ anime.value.sinopse }}
            </p>
          </v-card-text>
        </v-card>

        <v-card elevation="2" class="mt-4">
          <v-card-title :class="$vuetify.display.xs ? 'text-subtitle-1 pa-4' : 'text-h6 pa-6'">
            Informações Adicionais
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text class="pa-6">
            <v-row>
              <v-col cols="12" sm="6">
                <div class="info-item">
                  <v-icon color="primary" class="mr-2">mdi-television</v-icon>
                  <div>
                    <div class="text-caption text-grey">Título</div>
                    <div class="font-weight-bold">{{ anime.value.titulo }}</div>
                  </div>
                </div>
              </v-col>
              <v-col cols="12" sm="6">
                <div class="info-item">
                  <v-icon color="primary" class="mr-2">mdi-tag</v-icon>
                  <div>
                    <div class="text-caption text-grey">Gênero</div>
                    <div class="font-weight-bold">{{ anime.value.genero }}</div>
                  </div>
                </div>
              </v-col>
              <v-col cols="12" sm="6">
                <div class="info-item">
                  <v-icon color="primary" class="mr-2">mdi-counter</v-icon>
                  <div>
                    <div class="text-caption text-grey">Total de Episódios</div>
                    <div class="font-weight-bold">{{ anime.value.episodios }} episódios</div>
                  </div>
                </div>
              </v-col>
              <v-col cols="12" sm="6">
                <div class="info-item">
                  <v-icon color="primary" class="mr-2">mdi-progress-check</v-icon>
                  <div>
                    <div class="text-caption text-grey">Status de Visualização</div>
                    <div class="font-weight-bold">{{ anime.value.status }}</div>
                  </div>
                </div>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Dialog de Confirmação -->
    <v-dialog v-model="deleteDialog" max-width="500">
      <v-card>
        <v-card-title class="text-h5">Confirmar Exclusão</v-card-title>
        <v-card-text>
          Tem certeza que deseja excluir <strong>{{ anime.value.titulo }}</strong>?
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
  <v-container v-else class="home-wrapper">
    <div class="home-inner">
    <v-row>
      <v-col cols="12">
        <v-card elevation="0" class="text-center pa-8">
          <v-icon size="80" color="grey-lighten-1">mdi-alert-circle</v-icon>
          <h3 class="text-h5 mt-4 mb-2">Anime não encontrado</h3>
          <p class="text-body-1 text-grey mb-4">
            O anime que você está procurando não existe ou foi removido.
          </p>
          <v-btn color="primary" prepend-icon="mdi-arrow-left" @click="$router.push('/')">
            Voltar para Home
          </v-btn>
        </v-card>
      </v-col>
    </v-row>
    </div>
  </v-container>

</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import supabaseService from '@/services/supabaseService';

const router = useRouter();
const route = useRoute();

// Refs
const anime = ref(undefined);
const deleteDialog = ref(false);
const snackbar = ref(false);
const snackbarText = ref('');
const snackbarColor = ref('success');

// Methods
const loadAnime = async () => {
  const id = Number(route.params.id);
  response = await supabaseService.getAnimeById(id);
  anime.value = response.data;
};


const getStatusColor = (status) => {
  const colors = {
    'Assistindo': 'green',
    'Completo': 'blue',
    'Planejado': 'orange',
    'Pausado': 'grey'
  };
  return colors[status] || 'grey';
};

const confirmDelete = () => {
  deleteDialog.value = true;
};

const deleteAnime = async () => {
  if (anime.value) {
    const success = await supabaseService.deleteAnime(anime.value.id);
    if (success) {
      showSnackbar('Anime excluído com sucesso!', 'success');
      deleteDialog.value = false;
      setTimeout(() => router.push('/'), 1000);
    } else {
      showSnackbar('Erro ao excluir anime.', 'error');
    }
  }
};

const showSnackbar = (text, color = 'success') => {
  snackbarText.value = text;
  snackbarColor.value = color;
  snackbar.value = true;
};

// Lifecycle
onMounted(() => {
  loadAnime();
});
</script>

<style scoped>
.gap-2 {
  gap: 8px;
}

.info-item {
  display: flex;
  align-items: flex-start;
  gap: 8px;
}

.home-wrapper {
  min-height: calc(100vh - 64px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
}

.home-inner {
  width: 100%;
  max-width: 1100px;
  margin: 0 auto;
}

@media (max-width: 600px) {
  .home-wrapper { padding: 12px; min-height: calc(100vh - 56px); }
}
</style>
