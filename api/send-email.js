import { Resend } from 'resend';

export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method Not Allowed' });

    const { email, subject, message } = req.body;

    if (!email || !subject || !message) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    const resend = new Resend(process.env.RESEND_API_KEY);

    try {
        const response = await resend.emails.send({
            from: 'your@email.com', // Use a verified domain
            to: 'your-inbox@email.com',
            subject,
            text: `From: ${email}\n\n${message}`,
        });

        res.status(200).json({ success: true, response });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
