<template>
  <v-container :fluid="$vuetify.display.xs" class="home-wrapper">
    <div class="home-inner">
    <v-row>
      <v-col cols="12" md="10" lg="8" class="mx-auto">
        <v-btn
          variant="text"
          prepend-icon="mdi-arrow-left"
          @click="$router.push('/')"
          class="mb-4"
          :size="$vuetify.display.xs ? 'small' : 'default'"
        >
          Voltar
        </v-btn>

        <v-card elevation="4">
          <v-card-title :class="$vuetify.display.xs ? 'text-h6 pa-4' : 'text-h5 pa-6'">
            <v-icon class="mr-2" :size="$vuetify.display.xs ? 'default' : 'large'">{{ isEdit ? 'mdi-pencil' : 'mdi-plus' }}</v-icon>
            {{ isEdit ? 'Editar Anime' : 'Adicionar Novo Anime' }}
          </v-card-title>

          <v-divider></v-divider>

          <v-card-text :class="$vuetify.display.xs ? 'pa-4' : 'pa-6'">
            <AnimeForm
              :anime="currentAnime"
              :submit-label="isEdit ? 'Salvar Alterações' : 'Adicionar Anime'"
              :loading="loading"
              @submit="handleSubmit"
              @cancel="$router.push('/')"
            />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

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
import { ref, onMounted, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import supabaseService from '@/services/supabaseService'
import AnimeForm from '@/components/AnimeForm.vue'

const router = useRouter()
const route = useRoute()

// Refs
const currentAnime = ref(undefined)
const loading = ref(false)
const snackbar = ref(false)
const snackbarText = ref('')
const snackbarColor = ref('success')

// Computed
const isEdit = computed(() => !!route.params.id)

// Methods
const loadAnime = async () => {
  if (route.params.id) {
    const id = Number(route.params.id)
    const anime = await supabaseService.getAnimeById(id)
    if (anime) {
      currentAnime.value = anime.data
    } else {
      showSnackbar('Anime não encontrado!', 'error')
      router.push('/')
    }
  }
}

const handleSubmit = async (data) => {
  loading.value = true

  try {
    if (isEdit.value && route.params.id) {
      const id = Number(route.params.id)
      const result = await supabaseService.updateAnime(id, data)
      if (result.success) {
        showSnackbar('Anime atualizado com sucesso!', 'success')
        setTimeout(() => router.push('/'), 1000)
      } else {
        showSnackbar('Erro ao atualizar anime!', 'error')
      }
    } else {
      const result = await supabaseService.createAnime(data)
      if (result) {
        showSnackbar('Anime adicionado com sucesso!', 'success')
        setTimeout(() => router.push('/'), 1000)
      } else {
        showSnackbar('Erro ao adicionar anime!', 'error')
      }
    }
  } catch (error) {
    console.error(error)
    showSnackbar('Erro ao salvar anime!', 'error')
  } finally {
    loading.value = false
  }
}

const showSnackbar = (text, color = 'success') => {
  snackbarText.value = text
  snackbarColor.value = color
  snackbar.value = true
}

// Lifecycle
onMounted(() => {
  loadAnime()
})
</script>
