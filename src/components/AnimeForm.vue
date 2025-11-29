<template>
  <v-form ref="formRef" v-model="valid" @submit.prevent="handleSubmit">
    <v-row>
      <v-col cols="12" sm="6">
        <v-text-field
          v-model="formData.titulo"
          label="Título do Anime *"
          :rules="[rules.required]"
          variant="outlined"
          prepend-inner-icon="mdi-television"
          class="mb-2"
        ></v-text-field>
      </v-col>

      <v-col cols="12" sm="6">
        <v-select
          v-model="formData.genero"
          :items="generos"
          label="Gênero *"
          :rules="[rules.required]"
          variant="outlined"
          prepend-inner-icon="mdi-tag"
          class="mb-2"
        ></v-select>
      </v-col>

      <v-col cols="12" sm="6">
        <v-select
          v-model="formData.status"
          :items="statusOptions"
          label="Status *"
          :rules="[rules.required]"
          variant="outlined"
          prepend-inner-icon="mdi-progress-check"
          class="mb-2"
        ></v-select>
      </v-col>

      <v-col cols="12" sm="6">
        <v-text-field
          v-model.number="formData.episodios"
          label="Número de Episódios *"
          type="number"
          :rules="[rules.required, rules.episodios]"
          variant="outlined"
          prepend-inner-icon="mdi-counter"
          class="mb-2"
        ></v-text-field>
      </v-col>

      <v-col cols="12" sm="6">
        <v-slider
          v-model="formData.nota"
          label="Nota"
          :min="0"
          :max="10"
          :step="0.5"
          thumb-label
          prepend-icon="mdi-star"
          class="mb-4"
        >
          <template v-slot:append>
            <v-chip color="amber" size="small">{{ formData.nota }}/10</v-chip>
          </template>
        </v-slider>
      </v-col>

      <v-col cols="12" sm="6">
        <v-text-field
          v-model="formData.imagemUrl"
          label="URL da Imagem"
          variant="outlined"
          prepend-inner-icon="mdi-image"
          placeholder="https://exemplo.com/imagem.jpg"
          class="mb-2"
        ></v-text-field>
      </v-col>

      <v-col cols="12" sm="6" class="d-flex align-center justify-center">
          <v-card v-if="previewUrl" elevation="2" class="preview-card">
          <v-img :src="previewUrl" height="120" width="160" cover :alt="formData.titulo || 'Preview da imagem'" />
        </v-card>
        <div v-else class="preview-placeholder text-caption text-grey">Cole a URL da imagem para pré-visualização</div>
      </v-col>

      <v-col cols="12">
        <v-textarea
          v-model="formData.sinopse"
          label="Sinopse *"
          :rules="[rules.required]"
          variant="outlined"
          prepend-inner-icon="mdi-text"
          rows="4"
          class="mb-4"
        ></v-textarea>
      </v-col>

      <v-col cols="12" class="mt-2">
        <v-row>
          <v-col cols="12" sm="6">
            <v-btn
              color="grey"
              variant="outlined"
              @click="$emit('cancel')"
              block
            >
              Cancelar
            </v-btn>
          </v-col>
          <v-col cols="12" sm="6">
            <v-btn
              color="primary"
              type="submit"
              :disabled="!valid"
              :loading="loading"
              block
            >
              {{ submitLabel }}
            </v-btn>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-form>
</template>

<script setup>
import { ref, watch, computed } from 'vue'

// Props
const props = defineProps({
  anime: { type: Object, default: null },
  submitLabel: { type: String, default: 'Salvar' },
  loading: { type: Boolean, default: false }
})

// Emits
const emit = defineEmits(['submit', 'cancel'])

// Refs
const formRef = ref(null)
const valid = ref(false)

// Data
const generos = [
  'Ação',
  'Aventura',
  'Comédia',
  'Drama',
  'Fantasia',
  'Ficção Científica',
  'Romance',
  'Suspense',
  'Terror',
  'Slice of Life',
  'Esporte',
  'Mistério'
]

const statusOptions = ['Assistindo', 'Completo', 'Planejado', 'Pausado']

const formData = ref({
  titulo: props.anime?.titulo || '',
  genero: props.anime?.genero || '',
  nota: props.anime?.nota || 5,
  episodios: props.anime?.episodios || 12,
  status: props.anime?.status || 'Planejado',
  sinopse: props.anime?.sinopse || '',
  imagemUrl: props.anime?.imagemUrl || ''
})

// Preview da imagem (reativa ao campo imagemUrl)
const previewUrl = computed(() => {
  const url = formData.value.imagemUrl
  if (url && /^(https?:)?\/\//.test(url)) return url
  return ''
})

// Rules
const rules = {
  required: (v) => !!v || 'Campo obrigatório',
  episodios: (v) => v > 0 || 'Deve ser maior que 0'
}

// Watch para atualizar formData quando anime prop mudar
watch(() => props.anime, (newAnime) => {
  if (newAnime) {
    formData.value = {
      titulo: newAnime.titulo,
      genero: newAnime.genero,
      nota: newAnime.nota,
      episodios: newAnime.episodios,
      status: newAnime.status,
      sinopse: newAnime.sinopse,
      imagemUrl: newAnime.imagemUrl || ''
    }
  }
}, { deep: true })

// Methods
const handleSubmit = async () => {
  const { valid: isValid } = await formRef.value.validate()
  if (isValid) {
    emit('submit', formData.value)
  }
}
</script>

<style scoped>
.gap-2 {
  gap: 8px;
}
</style>
