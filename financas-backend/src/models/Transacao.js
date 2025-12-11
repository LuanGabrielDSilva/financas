import mongoose from 'mongoose';

const transacaoSchema = new mongoose.Schema({
  usuarioId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  tipo: { type: String, enum: ['entrada','saida'], required: true },
  valor: { type: Number, required: true, min: 0 },
  data: { type: Date, default: Date.now },
  status: { type: String },
  metodo: { type: String },
  descricao: { type: String }
});

export default mongoose.model('Transacao', transacaoSchema);
