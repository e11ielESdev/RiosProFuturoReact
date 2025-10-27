// server.js
const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
const PORT = process.env.PORT || 5000;

// 🔒 Token da API Invertexto (você configurará em uma variável de ambiente)
const INVERTEXTO_API_KEY = process.env.INVERTEXTO_API_KEY || "22529|a7OZF2ISsdbHkiP4rReTgDlEiDKqZXHE";

// Configuração básica
app.use(cors());
app.use(express.json());

// ✅ Função para consultar a API Invertexto
async function validarCPFInvertexto(cpf) {
  const url = "https://api.invertexto.com/v1/validator";
  const params = {
    token: INVERTEXTO_API_KEY,
    value: cpf,
    type: "cpf", // especifica que queremos validar CPF
  };

  try {
    const response = await axios.get(url, { params });
    return response.data;
  } catch (error) {
    console.error("Erro ao consultar API Invertexto:", error.message);
    throw error;
  }
}

// 🚀 Rota principal para validação de CPF
app.post("/validate-cpf", async (req, res) => {
  const { cpf } = req.body;

  if (!cpf) {
    return res.status(400).json({ valid: false, error: "CPF não informado" });
  }

  const onlyDigits = cpf.replace(/\D/g, "");
  if (onlyDigits.length !== 11) {
    return res.status(400).json({ valid: false, error: "CPF deve ter 11 dígitos" });
  }

  try {
    const result = await validarCPFInvertexto(onlyDigits);

    // A resposta padrão da API é: { "valid": true/false, "type": "cpf" }
    if (result && typeof result.valid === "boolean") {
      return res.json({ valid: result.valid, raw: result });
    } else {
      return res.status(500).json({ valid: false, error: "Resposta inesperada da API" });
    }
  } catch (error) {
    return res.status(500).json({ valid: false, error: "Erro ao validar CPF na API externa" });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Servidor rodando na porta ${PORT}`);
});
