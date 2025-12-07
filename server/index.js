import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import swaggerConfig from '../src/docs/swagger.js';
import animesRoutes from '../src/routes/animes.js';
import { supabase } from '../src/config/supabase.js';

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use('/animes', animesRoutes);
swaggerConfig(app);



// Endpoints
app.get('/animes', async (req, res) => {
  try {
    const { data, error } = await supabase.from('animes').select('*');
    if (error) throw error;
    res.json(data);
  } catch (error) {
    console.error('Erro ao buscar animes:', error);
    res.status(500).json({ message: 'Erro ao buscar animes' });
  }
});

app.get('/animes/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const { data, error } = await supabase.from('animes').select('*').eq('id', id).single();
    if (error) throw error;
    res.json(data);
  } catch (error) {
    console.error(`Erro ao buscar o anime com ID ${id}:`, error);
    res.status(500).json({ message: 'Erro ao buscar o anime' });
  }
});

app.post('/animes', async (req, res) => {
  const { titulo, genero, nota, episodios, status, sinopse, imagemUrl } = req.body;
  try {
    const { data, error } = await supabase.from('animes').insert([
      {
        titulo,
        genero,
        nota,
        episodios,
        status,
        sinopse,
        imagemUrl
      }
    ]);
    if (error) throw error;
    res.status(201).json(data[0]);
  } catch (error) {
    console.error('Erro ao criar anime:', error);
    res.status(500).json({ message: 'Erro ao criar anime' });
  }
});

app.put('/animes/:id', async (req, res) => {
  const { id } = req.params;
  const { titulo, genero, nota, episodios, status, sinopse, imagemUrl } = req.body;
  try {
    const { data, error } = await supabase
      .from('animes')
      .update({
        titulo,
        genero,
        nota,
        episodios,
        status,
        sinopse,
        imagemUrl
      })
      .eq('id', id)
      .select('*');
    if (error) throw error;
    if (data.length === 0) {
      return res.status(404).json({ message: 'Anime não encontrado' });
    }
    res.json(data[0]);
  } catch (error) {
    console.error(`Erro ao atualizar o anime com ID ${id}:`, error);
    res.status(500).json({ message: 'Erro ao atualizar anime' });
  }
});

app.delete('/animes/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const { data, error } = await supabase.from('animes').delete().eq('id', id);
    if (error) throw error;
    if (data.length === 0) {
      return res.status(404).json({ message: 'Anime não encontrado' });
    }
    res.json({ message: 'Anime deletado com sucesso' });
  } catch (error) {
    console.error(`Erro ao deletar o anime com ID ${id}:`, error);
    res.status(500).json({ message: 'Erro ao deletar anime' });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
