import express from 'express';
import Transacao from '../models/Transacao.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

// GET todas as transações do usuário logado
router.get('/', verifyToken, async (req, res) => {
  try {
    const transacoes = await Transacao.find({ usuarioId: req.userId }).sort({ data: -1 });
    res.json(transacoes);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao carregar transações' });
  }
});

// POST criar nova transação
router.post('/', verifyToken, async (req, res) => {
  try {
    const { tipo, valor, status, metodo, descricao } = req.body;
    const novaTransacao = new Transacao({
      usuarioId: req.userId,
      tipo,
      valor,
      status,
      metodo,
      descricao
    });
    const salva = await novaTransacao.save();
    res.status(201).json(salva);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao criar transação' });
  }
});

// PUT editar transação
router.put('/:id', verifyToken, async (req, res) => {
  const { id } = req.params;
  const { tipo, valor, status, metodo, descricao } = req.body;

  try {
    const transacaoAtualizada = await Transacao.findOneAndUpdate(
      { _id: id, usuarioId: req.userId },
      { tipo, valor, status, metodo, descricao },
      { new: true }
    );

    if (!transacaoAtualizada) {
      return res.status(404).json({ error: 'Transação não encontrada' });
    }

    res.json(transacaoAtualizada);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao atualizar transação' });
  }
});

// DELETE excluir transação
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    const excluida = await Transacao.findOneAndDelete({ _id: req.params.id, usuarioId: req.userId });
    if (!excluida) return res.status(404).json({ error: 'Transação não encontrada' });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao excluir transação' });
  }
});

export default router;
