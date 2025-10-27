import React, { useState } from "react";
import axios from "axios";
import "./Contact.css";

export default function Contact() {
  const [status, setStatus] = useState("idle");
  const [cpf, setCpf] = useState("");
  const [cpfStatus, setCpfStatus] = useState("idle"); // idle | loading | valid | invalid | error
  const [cpfError, setCpfError] = useState("");

  const sanitizeCpf = (value) => value.replace(/\D/g, "");

  // 🔍 Validação do CPF via backend (API Invertexto)
  const handleCpfBlur = async () => {
    const onlyDigits = sanitizeCpf(cpf);

    if (onlyDigits.length !== 11) {
      setCpfStatus("invalid");
      setCpfError("Informe um CPF com 11 dígitos.");
      return;
    }

    setCpfStatus("loading");
    setCpfError("");

    try {
      const response = await axios.post("https://riosprofuturoreact.onrender.com/validate-cpf", { cpf: onlyDigits });
      if (response.data.valid === true) {
        setCpfStatus("valid");
        setCpfError("");
      } else {
        setCpfStatus("invalid");
        setCpfError("CPF inválido.");
      }
    } catch (err) {
      console.error("Erro ao validar CPF:", err);
      setCpfStatus("error");
      setCpfError("Erro na validação. Tente novamente.");
    }
  };

  // ✉️ Envio do formulário
  const handleSubmit = (e) => {
    e.preventDefault();

    // impede envio se CPF for inválido
    if (cpfStatus !== "valid") {
      setCpfError("Por favor, insira um CPF válido antes de enviar.");
      return;
    }

    setStatus("loading");

    // simula envio (ex: envio de e-mail, API etc.)
    setTimeout(() => {
      setStatus("success");
      setTimeout(() => setStatus("idle"), 2500);
    }, 1200);
  };

  return (
    <section id="contact" className="contact-section">
      <h2>Entre em Contato</h2>

      <form className="contact-form" onSubmit={handleSubmit} noValidate>
        <input name="name" type="text" placeholder="Seu nome" required />
        <input name="email" type="email" placeholder="Seu e-mail" required />

        {/* Campo CPF */}
        <div className="cpf-field">
          <input
            name="cpf"
            type="text"
            placeholder="Seu CPF"
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
            onBlur={handleCpfBlur}
            required
          />
          {cpfStatus === "loading" && <p className="cpf-status info">Validando CPF...</p>}
          {cpfStatus === "valid" && <p className="cpf-status success">✅ CPF válido</p>}
          {cpfStatus === "invalid" && <p className="cpf-status error">❌ CPF inválido</p>}
          {cpfStatus === "error" && <p className="cpf-status error">{cpfError}</p>}
        </div>

        <textarea name="message" placeholder="Sua mensagem" required />

        <button
          type="submit"
          className={`submit-btn ${status === "success" ? "success" : ""}`}
          disabled={status === "loading" || cpfStatus === "loading"}
        >
          {status === "loading"
            ? "Enviando..."
            : status === "success"
            ? "Mensagem enviada! ✓"
            : "Enviar"}
        </button>

        {/* Mostra mensagem de erro se CPF for inválido */}
        {cpfError && cpfStatus !== "valid" && <p className="cpf-error">{cpfError}</p>}
      </form>
    </section>
  );
}