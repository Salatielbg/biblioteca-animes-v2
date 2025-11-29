const STORAGE_KEY = 'biblioteca-animes'

export const storageService = {
  getAnimes() {
    try {
      const data = localStorage.getItem(STORAGE_KEY)
      return data ? JSON.parse(data) : []
    } catch (error) {
      console.error('Erro ao carregar animes:', error)
      return []
    }
  },

  saveAnimes(animes) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(animes))
    } catch (error) {
      console.error('Erro ao salvar animes:', error)
    }
  },

  addAnime(anime) {
    const animes = this.getAnimes()
    const newId = animes.length > 0 ? Math.max(...animes.map(a => a.id)) + 1 : 1
    const newAnime = { ...anime, id: newId }
    animes.push(newAnime)
    this.saveAnimes(animes)
    return newAnime
  },

  updateAnime(id, anime) {
    const animes = this.getAnimes()
    const index = animes.findIndex(a => a.id === id)
    if (index !== -1) {
      const existing = animes[index]
      const updated = { ...existing, ...anime, id: existing.id }
      animes[index] = updated
      this.saveAnimes(animes)
      return true
    }
    return false
  },

  deleteAnime(id) {
    const animes = this.getAnimes()
    const filtered = animes.filter(a => a.id !== id)
    if (filtered.length !== animes.length) {
      this.saveAnimes(filtered)
      return true
    }
    return false
  },

  getAnimeById(id) {
    const animes = this.getAnimes()
    return animes.find(a => a.id === id)
  },

  initializeSampleData() {
    const animes = this.getAnimes()
    if (animes.length === 0) {
      const sampleAnimes = [
        {
          titulo: 'Attack on Titan',
          genero: 'Ação',
          nota: 9.5,
          episodios: 87,
          status: 'Completo',
          sinopse: 'Humanidade luta pela sobrevivência contra titãs devoradores de humanos.',
          imagemUrl: 'https://cdn.myanimelist.net/images/anime/10/47347.jpg'
        },
        {
          titulo: 'Death Note',
          genero: 'Suspense',
          nota: 9.0,
          episodios: 37,
          status: 'Completo',
          sinopse: 'Um estudante encontra um caderno sobrenatural que pode matar qualquer pessoa.',
          imagemUrl: 'https://cdn.myanimelist.net/images/anime/1079/138100.jpg'
        },
        {
          titulo: 'My Hero Academia',
          genero: 'Ação',
          nota: 8.5,
          episodios: 113,
          status: 'Assistindo',
          sinopse: 'Em um mundo onde quase todos têm superpoderes, um garoto sem poderes sonha em ser herói.',
          imagemUrl: 'https://cdn.myanimelist.net/images/anime/10/78745.jpg'
        },
        {
          titulo: 'Demon Slayer',
          genero: 'Aventura',
          nota: 9.2,
          episodios: 44,
          status: 'Assistindo',
          sinopse: 'Um jovem se torna caçador de demônios para vingar sua família e curar sua irmã.',
          imagemUrl: 'https://cdn.myanimelist.net/images/anime/1286/99889.jpg'
        },
        {
          titulo: 'One Piece',
          genero: 'Aventura',
          nota: 8.8,
          episodios: 1000,
          status: 'Pausado',
          sinopse: 'Piratas buscam o tesouro lendário One Piece para se tornar o Rei dos Piratas.',
          imagemUrl: 'https://cdn.myanimelist.net/images/anime/1244/138851.jpg'
        },
        {
          titulo: 'Steins;Gate',
          genero: 'Ficção Científica',
          nota: 9.3,
          episodios: 24,
          status: 'Completo',
          sinopse: 'Cientistas amadores descobrem como enviar mensagens ao passado.',
          imagemUrl: 'https://cdn.myanimelist.net/images/anime/1935/127974.jpg'
        }
      ]

      sampleAnimes.forEach(anime => this.addAnime(anime))
    }
  }
}
