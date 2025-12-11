import Transacao from '../models/Transacao.js';

export const listarTransacoes = async (req, res) => {
  try {
    const transacoes = await Transacao.find({ usuarioId: req.userId }).sort({ data: -1 });
    res.json(transacoes);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao carregar transações' });
  }
};

export const criarTransacao = async (req, res) => {
  try {
    const { tipo, valor, status, metodo, descricao } = req.body;
    const novaTransacao = new Transacao({ usuarioId: req.userId, tipo, valor, status, metodo, descricao });
    const salva = await novaTransacao.save();
    res.status(201).json(salva);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao criar transação' });
  }
};

// Outros métodos PUT e DELETE podem ser adicionados da mesma forma
