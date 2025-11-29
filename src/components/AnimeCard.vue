<template>
  <v-card class="anime-card" elevation="4" hover>
    <v-img
      :src="anime.imagemUrl || 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=400'"
      :alt="anime.titulo || 'Capa do anime'"
      :height="$vuetify.display.xs ? 160 : ($vuetify.display.sm ? 200 : 220)"
      cover
      class="anime-image"
    >
      <v-chip
        :color="getStatusColor(anime.status)"
        class="ma-2"
        :size="$vuetify.display.xs ? 'x-small' : 'small'"
      >
        {{ anime.status }}
      </v-chip>
    </v-img>

    <v-card-title :class="$vuetify.display.xs ? 'text-subtitle-1' : 'text-h6'">
      {{ anime.titulo }}
    </v-card-title>

    <v-card-subtitle class="pb-2">
      <v-chip size="x-small" class="mr-2">{{ anime.genero }}</v-chip>
      <span class="text-caption">{{ anime.episodios }} ep</span>
    </v-card-subtitle>

    <v-card-text class="py-2">
      <div class="d-flex align-center mb-2 flex-wrap">
        <v-rating
          :model-value="anime.nota"
          density="compact"
          half-increments
          readonly
          :size="$vuetify.display.xs ? 'x-small' : 'small'"
          color="amber"
        ></v-rating>
        <span class="ml-2 text-caption">{{ anime.nota }}/10</span>
      </div>
      <p class="text-body-2 text-truncate-3">{{ anime.sinopse }}</p>
    </v-card-text>

    <v-card-actions class="px-3 pb-3">
      <v-row class="w-100" align="center" no-gutters>
        <v-col :cols="$vuetify.display.xs ? 12 : 'auto'">
          <v-btn
            color="primary"
            variant="text"
            :size="$vuetify.display.xs ? 'x-small' : 'small'"
            @click="$emit('view', anime.id)"
            :block="$vuetify.display.xs"
          >
            <v-icon :start="!$vuetify.display.xs" :size="$vuetify.display.xs ? 'small' : 'default'">mdi-eye</v-icon>
            <span v-if="!$vuetify.display.xs">Ver Detalhes</span>
          </v-btn>
        </v-col>

        <v-spacer v-if="!$vuetify.display.xs"></v-spacer>

        <v-col :cols="$vuetify.display.xs ? 12 : 'auto'" class="d-flex justify-end">
          <v-btn
            color="secondary"
            variant="text"
            icon="mdi-pencil"
            :size="$vuetify.display.xs ? 'x-small' : 'small'"
            @click="$emit('edit', anime.id)"
            class="mr-2"
          ></v-btn>
          <v-btn
            color="error"
            variant="text"
            icon="mdi-delete"
            :size="$vuetify.display.xs ? 'x-small' : 'small'"
            @click="$emit('delete', anime.id)"
          ></v-btn>
        </v-col>
      </v-row>
    </v-card-actions>
  </v-card>
</template>

<script setup>
const { anime } = defineProps({ anime: Object })

defineEmits(['view', 'edit', 'delete'])

// Métodos
const getStatusColor = (status) => {
  const colors = {
    'Assistindo': 'green',
    'Completo': 'blue',
    'Planejado': 'orange',
    'Pausado': 'grey'
  }
  return colors[status] || 'grey'
}
</script>

<style scoped>
.anime-card {
  transition: transform 0.2s ease-in-out;
}

.anime-card:hover {
  transform: translateY(-4px);
}

.anime-image {
  position: relative;
}

.text-truncate-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  /* Propriedade padrão para compatibilidade futura */
  line-clamp: 3;
}
</style>
