import express from "express";
import Mensagem from "../models/Mensagem.js"; // Model do MongoDB

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { nome, email, mensagem } = req.body;

    const novaMensagem = new Mensagem({
      nome,
      email,
      mensagem,
      criadoEm: new Date()
    });

    const salva = await novaMensagem.save();
    res.status(201).json(salva);
  } catch (err) {
    console.log(err);
    res.status(500).json({ erro: "Não foi possível enviar a mensagem." });
  }
});

export default router;
