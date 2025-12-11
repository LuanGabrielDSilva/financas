import mongoose from 'mongoose';

const ContatoSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  email: { type: String, required: true },
  mensagem: { type: String, required: true },
  criadoEm: { type: Date, default: Date.now }
});

// O terceiro parâmetro indica o nome da coleção no MongoDB
export default mongoose.model('Contato', ContatoSchema, 'contato');
