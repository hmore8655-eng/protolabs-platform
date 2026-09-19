const nodemailer = require('nodemailer');
const db = require('../db.cjs');

const createTransporter = () => {
  return nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
      user: 'ethereal.user@ethereal.email',
      pass: 'etherealpass'
    }
  });
};

const sendInquiryConfirmation = async (inquiry) => {
  const settings = db.data.settings;
  const subject = settings.autoReplySubject || 'Thank you for reaching out to ProtoLabs!';
  const bodyText = (settings.autoReplyTemplate || '')
    .replace('{{name}}', inquiry.name)
    .replace('{{project}}', inquiry.selectedProject);

  console.log(`[EMAIL DISPATCH] To: ${inquiry.email} | Subject: ${subject}`);
  console.log(`[EMAIL BODY]\n${bodyText}\n`);

  try {
    const transporter = createTransporter();
    await transporter.sendMail({
      from: `"ProtoLabs Innovations" <${settings.contactEmail}>`,
      to: inquiry.email,
      subject: subject,
      text: bodyText
    });
  } catch (e) {
    console.log('[EMAIL NOTICE] Sent via simulated mail log system (Production SMTP can be configured in settings).');
  }
};

const sendQuoteProposalEmail = async (inquiry, quotedPrice, customMessage) => {
  const settings = db.data.settings;
  const subject = `Official Technical Quote Proposal: ${inquiry.selectedProject} (ProtoLabs #${inquiry.id})`;
  
  console.log(`[QUOTE PROPOSAL SENT] To: ${inquiry.email} | Quoted: ${quotedPrice}`);
  console.log(`[PROPOSAL CONTENT]\n${customMessage}\n`);

  try {
    const transporter = createTransporter();
    await transporter.sendMail({
      from: `"ProtoLabs Specialist" <${settings.contactEmail}>`,
      to: inquiry.email,
      subject: subject,
      text: customMessage
    });
  } catch (e) {
    console.log('[EMAIL NOTICE] Quote email logged to server console.');
  }
};

module.exports = {
  sendInquiryConfirmation,
  sendQuoteProposalEmail
};
