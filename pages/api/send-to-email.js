// /pages/api/send-to-email.js

import nodemailer from 'nodemailer';
import formidable from 'formidable';
import fs from 'fs/promises';
import path from 'path';

export const config = {
  api: {
    bodyParser: false,
  },
};

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  let videoFilePath = null;

  try {
    // Parse form data
    const form = formidable({ 
      multiples: false,
      uploadDir: path.join(process.cwd(), 'tmp'),
      keepExtensions: true,
    });

    // Create tmp directory if it doesn't exist
    try {
      await fs.mkdir(path.join(process.cwd(), 'tmp'), { recursive: true });
    } catch (err) {
      // Directory might already exist
    }

    const [fields, files] = await form.parse(req);

    const email = fields.email?.[0];
    const modelType = fields.modelType?.[0];
    const videoFile = files.video?.[0];

    if (!email || !modelType || !videoFile) {
      return res.status(400).json({ 
        error: 'Missing required fields. Please fill email, model type, and upload video.' 
      });
    }

    videoFilePath = videoFile.filepath;

    console.log('Email:', email);
    console.log('Model Type:', modelType);
    console.log('Video:', videoFile);
    console.log('Using sender:', process.env.EMAIL_USER);
    console.log('Sending to:', process.env.OFFICE_EMAIL);

    // Send email to office with attachment
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.OFFICE_EMAIL,
      subject: `New Model Testing Request - ${modelType}`,
      html: `
        <h2>New Test Model Request</h2>
        <p><strong>User Email:</strong> ${email}</p>
        <p><strong>Model Type:</strong> ${modelType}</p>
        <p><strong>Video Filename:</strong> ${videoFile.originalFilename}</p>
        <p><strong>Timestamp:</strong> ${new Date().toLocaleString()}</p>
        <hr/>
        <p>Please process this video with the selected model and send results back to <strong>${email}</strong></p>
      `,
      attachments: [
        {
          filename: videoFile.originalFilename,
          path: videoFile.filepath,
        },
      ],
    });

    // Send confirmation to user
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'We received your model testing request - Camsense',
      html: `
        <h2>Request Received ✓</h2>
        <p>Hi,</p>
        <p>Thank you for submitting your video for <strong>${modelType}</strong> analysis.</p>
        <p><strong>Request Details:</strong></p>
        <ul>
          <li>Model: ${modelType}</li>
          <li>Submitted: ${new Date().toLocaleString()}</li>
        </ul>
        <p>Our ML team will process your video and send you the results within <strong>24-48 hours</strong>.</p>
        <hr/>
        <p>Best regards,<br/><strong>Camsense Team</strong></p>
      `,
    });

    // Clean up temp file
    try {
      await fs.unlink(videoFilePath);
    } catch (err) {
      console.error('Error deleting temp file:', err);
    }

    return res.status(200).json({ 
      success: true,
      message: 'Request submitted successfully. Check your email for confirmation.' 
    });

  } catch (error) {
    console.error('API Error:', error);
    
    // Attempt cleanup
    if (videoFilePath) {
      try {
        await fs.unlink(videoFilePath);
      } catch (err) {
        console.error('Error cleaning up file:', err);
      }
    }

    return res.status(500).json({ 
      error: error.message || 'Error processing your request. Please try again.' 
    });
  }
}
