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
app.use(express.json());

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

app.post("/api/request-quotation", async (req, res) => {
  try {
    const { name, email, company, phone, modules, cameraCount, message } = req.body;

    if (!name || !email || !company) {
      return res.status(400).json({ error: "Name, email, and company are required." });
    }

    // Only send to YOUR verified email — no auto-reply (onboarding@resend.dev restriction)
    const { data, error } = await resend.emails.send({
      from: "Camsense Website <onboarding@resend.dev>",
      to: process.env.TO_EMAIL,   // fizawajid001@gmail.com
      subject: `📋 New Quotation Request from ${company}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: auto; background: #0f172a; color: #e2e8f0; padding: 32px; border-radius: 12px;">
          <h2 style="color: #22d3ee;">New Quotation Request</h2>
          <p style="color: #94a3b8;">Submitted via camsense.org</p>
          <hr style="border-color: #334155;" />
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px 0; color: #94a3b8; width: 160px;">Full Name</td><td style="color: #f1f5f9; font-weight: 600;">${name}</td></tr>
            <tr><td style="padding: 8px 0; color: #94a3b8;">Email</td><td><a href="mailto:${email}" style="color: #22d3ee;">${email}</a></td></tr>
            <tr><td style="padding: 8px 0; color: #94a3b8;">Company</td><td style="color: #f1f5f9; font-weight: 600;">${company}</td></tr>
            <tr><td style="padding: 8px 0; color: #94a3b8;">Phone</td><td style="color: #f1f5f9;">${phone || "Not provided"}</td></tr>
            <tr><td style="padding: 8px 0; color: #94a3b8;">Modules</td><td style="color: #f1f5f9;">${modules || "Not specified"}</td></tr>
            <tr><td style="padding: 8px 0; color: #94a3b8;">Cameras</td><td style="color: #f1f5f9;">${cameraCount || "Not specified"}</td></tr>
          </table>
          ${message ? `<hr style="border-color: #334155; margin: 24px 0;" /><p style="color: #94a3b8;">Message:</p><p style="color: #f1f5f9; background: #1e293b; padding: 16px; border-radius: 8px;">${message}</p>` : ""}
          <hr style="border-color: #334155; margin: 24px 0;" />
          <p style="color: #64748b; font-size: 12px;">Sent from camsense.org</p>
        </div>
      `,
    });

    // Resend returns { data, error } — check error explicitly
    if (error) {
      console.error("❌ Resend error:", error);
      return res.status(500).json({ error: error.message });
    }

    console.log("✅ Quotation email sent:", data);
    res.json({ success: true });

  } catch (error) {
    console.error("❌ Quotation route error:", error.message);
    res.status(500).json({ error: error.message });
  }
});


app.listen(5000, () => console.log("✅ Server running on port 5000"));
