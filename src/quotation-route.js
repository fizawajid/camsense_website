// ─────────────────────────────────────────────────────────────────────────────
// Backend route: POST /api/request-quotation
// Add this to your existing Express server (the same one that handles /api/test-model)
// Uses nodemailer — same package you're likely already using for test-model emails
// ─────────────────────────────────────────────────────────────────────────────

const nodemailer = require('nodemailer');

// Reuse however you already configure your transporter (Gmail, SendGrid, etc.)
// Example with Gmail App Password:
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,   // e.g. camsense.notifications@gmail.com
    pass: process.env.EMAIL_PASS,   // App Password from Google Account settings
  },
});

// ── Route handler ─────────────────────────────────────────────────────────────
app.post('/api/request-quotation', async (req, res) => {
  const { name, email, company, phone, modules, cameraCount, message } = req.body;

  if (!name || !email || !company) {
    return res.status(400).json({ error: 'Name, email, and company are required.' });
  }

  try {
    // 1. Notify your team
    await transporter.sendMail({
      from: `"Camsense Website" <${process.env.EMAIL_USER}>`,
      to: 'safi@camsense.org',          // ← your team's inbox
      subject: `📋 New Quotation Request from ${company}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: auto; background: #0f172a; color: #e2e8f0; padding: 32px; border-radius: 12px;">
          <h2 style="color: #22d3ee; margin-bottom: 4px;">New Quotation Request</h2>
          <p style="color: #94a3b8; margin-top: 0;">Submitted via camsense.org</p>
          <hr style="border-color: #334155; margin: 24px 0;" />

          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; color: #94a3b8; width: 160px;">Full Name</td>
              <td style="padding: 8px 0; color: #f1f5f9; font-weight: 600;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #94a3b8;">Email</td>
              <td style="padding: 8px 0;">
                <a href="mailto:${email}" style="color: #22d3ee;">${email}</a>
              </td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #94a3b8;">Company</td>
              <td style="padding: 8px 0; color: #f1f5f9; font-weight: 600;">${company}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #94a3b8;">Phone</td>
              <td style="padding: 8px 0; color: #f1f5f9;">${phone}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #94a3b8;">Modules</td>
              <td style="padding: 8px 0; color: #f1f5f9;">${modules}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #94a3b8;">Camera Count</td>
              <td style="padding: 8px 0; color: #f1f5f9;">${cameraCount}</td>
            </tr>
          </table>

          ${message ? `
          <hr style="border-color: #334155; margin: 24px 0;" />
          <p style="color: #94a3b8; margin-bottom: 8px;">Additional Message:</p>
          <p style="color: #f1f5f9; background: #1e293b; padding: 16px; border-radius: 8px; white-space: pre-wrap;">${message}</p>
          ` : ''}

          <hr style="border-color: #334155; margin: 24px 0;" />
          <p style="color: #64748b; font-size: 12px;">Sent automatically from camsense.org</p>
        </div>
      `,
    });

    // 2. Auto-reply to the requester
    await transporter.sendMail({
      from: `"Camsense Team" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'We received your quotation request — Camsense',
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: auto; background: #0f172a; color: #e2e8f0; padding: 32px; border-radius: 12px;">
          <h2 style="color: #22d3ee;">Thanks, ${name}!</h2>
          <p style="color: #cbd5e1; line-height: 1.7;">
            We've received your quotation request for <strong style="color: #f1f5f9;">${company}</strong>.
            Our team will review your requirements and get back to you with a tailored proposal within
            <strong style="color: #22d3ee;">24–48 business hours</strong>.
          </p>

          <div style="background: #1e293b; border-left: 4px solid #22d3ee; padding: 16px 20px; border-radius: 0 8px 8px 0; margin: 24px 0;">
            <p style="margin: 0; color: #94a3b8; font-size: 14px;">Your request summary</p>
            <p style="margin: 8px 0 0; color: #f1f5f9;">Modules: ${modules || 'Not specified'}</p>
            <p style="margin: 4px 0 0; color: #f1f5f9;">Cameras: ${cameraCount || 'Not specified'}</p>
          </div>

          <p style="color: #cbd5e1;">
            In the meantime, feel free to reach us at
            <a href="mailto:safi@camsense.org" style="color: #22d3ee;">safi@camsense.org</a>
            or call us at <strong style="color: #f1f5f9;">+92 333 5160474</strong>.
          </p>

          <hr style="border-color: #334155; margin: 24px 0;" />
          <p style="color: #64748b; font-size: 12px;">© 2025 Camsense · NICAT, Rawalpindi</p>
        </div>
      `,
    });

    return res.status(200).json({ message: 'Quotation request submitted successfully.' });

  } catch (err) {
    console.error('Quotation email error:', err);
    return res.status(500).json({ error: 'Failed to send email. Please try again.' });
  }
});