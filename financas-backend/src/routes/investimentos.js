import express from 'express';
import Investimento from '../models/Investimentos.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

// Listar investimentos do usuário logado
router.get('/', verifyToken, async (req, res) => {
  try {
    const inv = await Investimento.find({ usuarioId: req.userId }).sort({ data: -1 });
    res.json(inv);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Criar investimento
router.post('/investimentos', verifyToken, async (req, res) => {
  const inv = new Investimento({ ...req.body, usuarioId: req.userId });
  try {
    const novo = await inv.save();
    res.status(201).json(novo);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

export default router;
