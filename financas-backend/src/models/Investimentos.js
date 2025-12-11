import mongoose from 'mongoose';

const investimentoSchema = new mongoose.Schema({
  usuarioId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  tipoInvestimento: { type: String, required: true },
  valor: { type: Number, required: true },
  data: { type: Date, default: Date.now },
  status: { type: String, default: "ativo" }
});

export default mongoose.model('Investimento', investimentoSchema);
