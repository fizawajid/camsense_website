// import express from "express";
// import multer from "multer";
// import nodemailer from "nodemailer";
// import cors from "cors";
// import dotenv from "dotenv";
// import fs from "fs";

// dotenv.config();

// const app = express();
// app.use(cors());

// // Store uploaded videos in /uploads temporarily
// const upload = multer({ dest: "uploads/" });

// app.post("/api/test-model", upload.single("video"), async (req, res) => {
//   try {
//     const { email, modelType } = req.body;
//     const video = req.file;

//     if (!email || !modelType || !video) {
//       return res.status(400).json({ error: "Missing fields" });
//     }

//     const transporter = nodemailer.createTransport({
//       service: "gmail",
//       auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASS,
//       },
//     });

//     await transporter.sendMail({
//       from: process.env.EMAIL_USER,
//       to: process.env.TO_EMAIL,
//       subject: `New Model Test Request - ${modelType}`,
//       text: `User Email: ${email}\nModel Selected: ${modelType}`,
//       attachments: [
//         {
//           filename: video.originalname,
//           path: video.path,
//         },
//       ],
//     });

//     fs.unlinkSync(video.path); // delete temp file
//     res.json({ success: true });
//   } catch (error) {
//     console.error("Error sending email:", error);
//     res.status(500).json({ error: "Failed to send email" });
//   }
// });

// app.listen(5000, () => console.log("✅ Server running on port 5000"));

import express from "express";
import multer from "multer";
import cors from "cors";
import dotenv from "dotenv";
import fs from "fs";
import { Resend } from "resend";

dotenv.config();

const app = express();
app.use(cors());

const upload = multer({ dest: "uploads/" });

const resend = new Resend(process.env.RESEND_API_KEY);

app.post("/api/test-model", upload.single("video"), async (req, res) => {
  try {
    const { email, modelType } = req.body;
    const video = req.file;

    if (!email || !modelType || !video) {
      return res.status(400).json({ error: "Missing fields" });
    }

    // Convert the uploaded video to base64
    const videoData = fs.readFileSync(video.path);
    const videoBase64 = videoData.toString("base64");

    // Send the email through Resend
    await resend.emails.send({
      from: "AI Model Testing <onboarding@resend.dev>",
      to: process.env.TO_EMAIL,
      subject: `New Model Test Request - ${modelType}`,
      html: `
        <h2>New AI Model Test Request</h2>
        <p><strong>User Email:</strong> ${email}</p>
        <p><strong>Model Selected:</strong> ${modelType}</p>
        <p>The user's video is attached below.</p>
      `,
      attachments: [
        {
          filename: video.originalname,
          content: videoBase64,
          encoding: "base64",
        },
      ],
    });

    fs.unlinkSync(video.path); // delete the uploaded file
    res.json({ success: true });
 } catch (error) {
  console.error("❌ Error sending email:", error.message);
  console.error(error);
  res.status(500).json({ error: error.message });
}

});

app.listen(5000, () => console.log("✅ Server running on port 5000"));
