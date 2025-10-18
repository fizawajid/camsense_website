import express from "express";
import multer from "multer";
import nodemailer from "nodemailer";
import cors from "cors";
import dotenv from "dotenv";
import fs from "fs";

dotenv.config();

const app = express();
app.use(cors());

// Store uploaded videos in /uploads temporarily
const upload = multer({ dest: "uploads/" });

app.post("/api/test-model", upload.single("video"), async (req, res) => {
  try {
    const { email, modelType } = req.body;
    const video = req.file;

    if (!email || !modelType || !video) {
      return res.status(400).json({ error: "Missing fields" });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.TO_EMAIL,
      subject: `New Model Test Request - ${modelType}`,
      text: `User Email: ${email}\nModel Selected: ${modelType}`,
      attachments: [
        {
          filename: video.originalname,
          path: video.path,
        },
      ],
    });

    fs.unlinkSync(video.path); // delete temp file
    res.json({ success: true });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ error: "Failed to send email" });
  }
});

app.listen(5000, () => console.log("✅ Server running on port 5000"));
