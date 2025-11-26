import express from "express";
import nodemailer from "nodemailer";
import multer from "multer";

const router = express.Router();

// Multer for file upload (memory storage)
const upload = multer({ storage: multer.memoryStorage() });

router.post(
  "/send-form",
  upload.fields([
    { name: "photo1", maxCount: 1 },
    { name: "photo2", maxCount: 1 },
    { name: "photo3", maxCount: 1 },
    { name: "video", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      const form = req.body;
      const files = req.files;

      console.log("Received form:", form);
      console.log("Received files:", Object.keys(files || {}));

     const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false, 
  },
});



      // Verify SMTP connection
      await transporter.verify().catch((err) => {
        console.log("SMTP Connection Error:", err);
      });

      // ---------- MAIL CONTENT ----------
      const mailOptions = {
        from: "VGD Agency Form <ak8628041311@gmail.com>",
        to: "himalayastechies@gmail.com",
        subject: "New Application Form – VGD Agency",
        html: `
          <h2>New Model Application</h2>
          <p><strong>Nome:</strong> ${form.nome}</p>
          <p><strong>Email:</strong> ${form.email}</p>
          <p><strong>Cidade/Estado:</strong> ${form.cidadeEstado}</p>
          <p><strong>Telefone:</strong> ${form.telefone}</p>
          <p><strong>Instagram:</strong> ${form.instagram}</p>
          <br/>
          <h3>Full Form Data</h3>
          <pre>${JSON.stringify(form, null, 2)}</pre>
        `,
        attachments: [],
      };

      // ---------- ATTACH FILES ----------
      if (files) {
        for (const key in files) {
          const file = files[key][0];
          if (file) {
            mailOptions.attachments.push({
              filename: file.originalname,
              content: file.buffer,
            });
          }
        }
      }

      // ---------- SEND MAIL ----------
      await transporter.sendMail(mailOptions);

      return res.status(200).json({
  success: true,
  message: "Email sent successfully!"
});

    } catch (err) {
      console.log("Email Sending Error:", err);
      return res.status(500).json({
        success: false,
        error: "Failed to send email",
        details: err.message,
      });
    }
  }
);

export default router;
