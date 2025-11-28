/*
  Firebase Function — Envio de E-mails via Zoho SMTP
  --------------------------------------------------
  • Compatível com deploy em 2nd Gen Functions (Node 22)
  • Protegido contra erros de ambiente e análise estática
  • Suporte CORS (para localhost e domínios públicos)
*/

const functions = require("firebase-functions");
const nodemailer = require("nodemailer");
const cors = require("cors")({ origin: true });

// 🔒 Função utilitária segura para obter a senha do Zoho
function getZohoPass() {
  try {
    const cfg = functions && functions.config ? functions.config() : null;
    if (cfg && cfg.zoho && cfg.zoho.pass) return cfg.zoho.pass;
  } catch (e) {
    // Ignora erro durante análise estática
  }
  return process.env.ZOHO_PASS || null;
}

// 🚀 Handler principal de envio
async function sendMailHandler(req, res) {
  const ZOHO_USER = "nascente@pensologocreio.com.br";
  const ZOHO_PASS = getZohoPass();

  if (!ZOHO_PASS) {
    console.error("Erro crítico: ZOHO_PASS ausente no ambiente.");
    return res.status(500).send("Erro de configuração no servidor.");
  }

  if (req.method !== "POST") {
    return res.status(405).send("Método não permitido");
  }

  const { nome, email, mensagem } = req.body || {};

  if (!nome || !email || !mensagem) {
    return res.status(400).send("Campos obrigatórios ausentes.");
  }

  const transporter = nodemailer.createTransport({
    host: "smtp.zoho.com",
    port: 465,
    secure: true,
    auth: {
      user: ZOHO_USER,
      pass: ZOHO_PASS,
    },
  });

  try {
    await transporter.sendMail({
      from: `"Penso Logo Creio" <${ZOHO_USER}>`,
      to: ZOHO_USER,
      subject: `Nova mensagem de ${nome}`,
      text: `Nome: ${nome}\nE-mail: ${email}\n\nMensagem:\n${mensagem}`,
      replyTo: email,
    });

    console.log("✅ E-mail enviado com sucesso de:", email);
    return res.status(200).send("E-mail enviado com sucesso");
  } catch (err) {
    console.error("❌ Erro ao enviar e-mail:", err);
    return res.status(500).send("Falha ao enviar e-mail");
  }
}

// 🌐 Exportação com suporte CORS
exports.sendMail = functions.https.onRequest((req, res) => {
  cors(req, res, () => sendMailHandler(req, res));
});
