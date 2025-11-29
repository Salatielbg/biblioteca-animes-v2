const API_URL = 'http://localhost:3000'; // URL do backend Express.js

const handleError = (action, error) => {
  console.error(`Erro ao ${action}:`, error);
  return { success: false, message: `Erro ao ${action}. Por favor, tente novamente mais tarde.` };
};

const supabaseService = {
  async getAnimes() {
    try {
      const response = await fetch(`${API_URL}/animes`);
      if (!response.ok) {
        throw new Error('Erro ao carregar animes');
      }
      const data = await response.json();
      return { success: true, data };
    } catch (error) {
      return handleError('carregar animes', error);
    }
  },

  async getAnimeById(id) {
    try {
      const response = await fetch(`${API_URL}/animes/${id}`);
      if (!response.ok) {
        throw new Error('Erro ao carregar o anime');
      }
      const data = await response.json();
      console.log('Dados do anime carregado:', data);
      return { success: true, data };
    } catch (error) {
      return handleError(`carregar o anime com ID ${id}`, error);
    }
  },

  async createAnime(anime) {
    try {
      const response = await fetch(`${API_URL}/animes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(anime),
      });
      if (!response.ok) {
        throw new Error('Erro ao criar anime');
      }
      const data = await response.json();
      return { success: true, data };
    } catch (error) {
      return handleError('criar anime', error);
    }
  },

  async updateAnime(id, updatedAnime) {
    try {
      const response = await fetch(`${API_URL}/animes/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedAnime),
      });
      if (!response.ok) {
        throw new Error('Erro ao atualizar anime');
      }
      const data = await response.json();
      return { success: true, data };
    } catch (error) {
      return handleError(`atualizar o anime com ID ${id}`, error);
    }
  },

  async deleteAnime(id) {
    try {
      const response = await fetch(`${API_URL}/animes/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Erro ao deletar anime');
      }
      return { success: true, message: 'Anime deletado com sucesso' };
    } catch (error) {
      return handleError(`deletar o anime com ID ${id}`, error);
    }
  },
};

export default supabaseService
