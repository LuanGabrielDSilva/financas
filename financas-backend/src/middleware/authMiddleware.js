import jwt from "jsonwebtoken";

export const verificarToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ msg: "Acesso negado" });

  const token = authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ msg: "Token não fornecido" });

  try {
    const decodificado = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decodificado;
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token inválido" });
  }
};
