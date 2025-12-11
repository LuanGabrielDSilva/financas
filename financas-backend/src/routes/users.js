import express from 'express';
import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const router = express.Router();

// Registro
router.post('/register', async (req,res)=>{
  try {
    const { nome, email, senha } = req.body;

    // Validações básicas
    if(!nome || !email || !senha) return res.status(400).json({ msg: 'Todos os campos são obrigatórios' });

    const emailValido = /.+@(gmail\.com|hotmail\.com|outlook\.com)$/;
    if(!emailValido.test(email)) return res.status(400).json({ msg: 'Email inválido' });

    const userExists = await User.findOne({ email });
    if(userExists) return res.status(400).json({ msg: 'Email já cadastrado' });

    const novoUser = new User({ nome, email, senha });
    await novoUser.save();

    res.status(201).json({ message: 'Usuário criado com sucesso', user: novoUser });
  } catch(err){
    res.status(500).json({ msg: err.message });
  }
});

// Login
router.post('/login', async (req,res)=>{
  try {
    const { email, senha } = req.body;
    if(!email || !senha) return res.status(400).json({ msg: 'Preencha todos os campos' });

    const user = await User.findOne({ email });
    if(!user) return res.status(400).json({ msg: 'Usuário não encontrado' });

    const senhaCorreta = await bcrypt.compare(senha, user.senha);
    if(!senhaCorreta) return res.status(400).json({ msg: 'Senha incorreta' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ token, user: { id: user._id, nome: user.nome, email: user.email } });
  } catch(err){
    res.status(500).json({ msg: err.message });
  }
});

export default router;
