import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

import transacoesRoutes from './routes/transacoes.js';
import investimentosRoutes from './routes/investimentos.js';
import authRoutes from './routes/auth.js';

dotenv.config();

const app = express();

// Configurar CORS para permitir o frontend
app.use(cors({
  origin: 'http://localhost:5173', // URL do seu frontend
  credentials: true // se você usar cookies/token
}));

app.use(express.json());

// Rotas
app.use('/api/transacoes', transacoesRoutes);
app.use('/api/investimentos', investimentosRoutes);
app.use('/api/auth', authRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB conectado'))
  .catch(err => console.log(err));

app.listen(5000, () => console.log('Servidor rodando na porta 5000'));
