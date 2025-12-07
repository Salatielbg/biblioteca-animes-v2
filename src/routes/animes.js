import { Router } from "express";
import { supabase } from "../config/supabase.js";
const router = Router();

/**
 * @swagger
 * /animes:
 *   get:
 *     summary: Retorna a lista de todos os animes
 *     tags:
 *       - Animes
 *     responses:
 *       200:
 *         description: Lista de animes retornada com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   titulo:
 *                     type: string
 *                   genero:
 *                     type: string
 *                   nota:
 *                     type: number
 *                   episodios:
 *                     type: integer
 *                   status:
 *                     type: string
 *                   sinopse:
 *                     type: string
 *                   imagemUrl:
 *                     type: string
 *       500:
 *         description: Erro ao buscar animes.
 */
router.get("/", async (req, res) => {
  try {
    const { data, error } = await supabase.from('animes').select('*');
    if (error) throw error;
    res.json(data);
  } catch (error) {
    console.error('Erro ao buscar animes:', error);
    res.status(500).json({ message: 'Erro ao buscar animes' });
  }
});

/**
 * @swagger
 * /animes/{id}:
 *   get:
 *     summary: Retorna um anime específico pelo ID
 *     tags:
 *       - Animes
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do anime
 *     responses:
 *       200:
 *         description: Anime retornado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 titulo:
 *                   type: string
 *                 genero:
 *                   type: string
 *                 nota:
 *                   type: number
 *                 episodios:
 *                   type: integer
 *                 status:
 *                   type: string
 *                 sinopse:
 *                   type: string
 *                 imagemUrl:
 *                   type: string
 *       500:
 *         description: Erro ao buscar o anime.
 */
router.get("/:id", async (req, res) => {
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

/**
 * @swagger
 * /animes:
 *   post:
 *     summary: Cadastro de um novo anime
 *     tags:
 *       - Animes
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - titulo
 *               - genero
 *               - episodios
 *             properties:
 *               titulo:
 *                 type: string
 *                 description: Título do anime
 *               genero:
 *                 type: string
 *                 description: Gênero do anime
 *               nota:
 *                 type: number
 *                 description: Nota de classificação
 *               episodios:
 *                 type: integer
 *                 description: Número de episódios
 *               status:
 *                 type: string
 *                 description: Status do anime (em andamento, concluído, etc)
 *               sinopse:
 *                 type: string
 *                 description: Sinopse do anime
 *               imagemUrl:
 *                 type: string
 *                 description: URL da imagem de capa
 *     responses:
 *       201:
 *         description: Anime criado com sucesso.
 *       500:
 *         description: Erro ao criar anime.
 */
router.post("/", async (req, res) => {
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
    ]).select();
    if (error) throw error;
    res.status(201).json({ message: 'Anime criado com sucesso', anime: data[0] });
  } catch (error) {
    console.error('Erro ao criar anime:', error);
    res.status(500).json({ message: 'Erro ao criar anime' });
  }
});

/**
 * @swagger
 * /animes/{id}:
 *   put:
 *     summary: Atualiza um anime existente
 *     tags:
 *       - Animes
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do anime a ser atualizado
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               titulo:
 *                 type: string
 *               genero:
 *                 type: string
 *               nota:
 *                 type: number
 *               episodios:
 *                 type: integer
 *               status:
 *                 type: string
 *               sinopse:
 *                 type: string
 *               imagemUrl:
 *                 type: string
 *     responses:
 *       200:
 *         description: Anime atualizado com sucesso.
 *       404:
 *         description: Anime não encontrado.
 *       500:
 *         description: Erro ao atualizar anime.
 */
router.put("/:id", async (req, res) => {
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
    res.status(201).json({ message: 'Anime atualizado com sucesso', anime: data[0] });
  } catch (error) {
    console.error(`Erro ao atualizar o anime com ID ${id}:`, error);
    res.status(500).json({ message: 'Erro ao atualizar anime' });
  }
});

/**
 * @swagger
 * /animes/{id}:
 *   delete:
 *     summary: Deleta um anime existente
 *     tags:
 *       - Animes
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do anime a ser deletado
 *     responses:
 *       200:
 *         description: Anime deletado com sucesso.
 *       404:
 *         description: Anime não encontrado.
 *       500:
 *         description: Erro ao deletar anime.
 */
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const { error } = await supabase.from('animes').delete().eq('id', id);
    if (error) throw error;
    res.json({ message: 'Anime deletado com sucesso' });
  } catch (error) {
    console.error(`Erro ao deletar o anime com ID ${id}:`, error);
    res.status(500).json({ message: 'Erro ao deletar anime' });
  }
});

export default router;
