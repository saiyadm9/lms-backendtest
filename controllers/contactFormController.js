const nodemailer = require("nodemailer");

const userMessageHandler = async (req, res) => {
  if (req.method === "POST") {
    const { name, email, message } = req.body;

    try {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      await transporter.sendMail({
        from: email,
        to: process.env.ADMIN_EMAIL,
        subject: "AcademyOf Scholars Contact",
        text: `
You have received a new message from:

Name: ${name}
Email: ${email}

Message:
${message}
        `,
      });

      return res
        .status(200)
        .json({ success: true, message: "Email sent successfully!" });
    } catch (error) {
      console.error("Email sending failed:", error);
      return res.status(500).json({ error: "Failed to send email." });
    }
  } else {
    return res.status(405).json({ error: "Method not allowed" });
  }
};

module.exports = { userMessageHandler };
