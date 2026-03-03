import { Resend } from 'resend';

// Only initialize if API key is present
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

export async function sendContactNotificationEmail(data: {
    firstName: string;
    lastName: string;
    email: string;
    topic: string;
    message: string;
}) {
    // If no resend client, log and exit silently to prevent crash
    if (!resend) {
        console.warn('⚠️ RESEND_API_KEY is missing. Email notification skipped.');
        return { success: false, error: 'Email service not configured' };
    }

    try {
        await resend.emails.send({
            from: 'ALLSTAR Admin <onboarding@resend.dev>',
            to: ['allstarsportsapparelllc@gmail.com'],
            subject: `NEW ENTRY: ${data.topic.toUpperCase()}`,
            html: `
                <div style="font-family: sans-serif; background: #000; color: #fff; padding: 40px; border: 1px solid #333;">
                    <h1 style="font-style: italic; font-weight: 900; letter-spacing: -2px; margin-bottom: 20px;">ALL<span style="color: #ff3b30;">STAR</span> ALERT</h1>
                    <div style="border-left: 2px solid #ff3b30; padding-left: 20px; margin-bottom: 30px;">
                        <p style="text-transform: uppercase; font-size: 10px; font-weight: 900; color: #666; margin: 0;">Origin Designator</p>
                        <p style="font-size: 18px; font-weight: 700; margin: 5px 0;">${data.firstName} ${data.lastName} (${data.email})</p>
                    </div>
                    <div style="margin-bottom: 30px;">
                        <p style="text-transform: uppercase; font-size: 10px; font-weight: 900; color: #666; margin: 0;">Transmission Content</p>
                        <p style="font-size: 14px; line-height: 1.6; color: #ccc;">${data.message}</p>
                    </div>
                    <p style="font-size: 9px; font-weight: 900; color: #333; text-transform: uppercase;">Authenticated via System Node 01</p>
                </div>
            `,
        });
        return { success: true };
    } catch (error) {
        console.error('Email transmission failed:', error);
        return { success: false, error };
    }
}
