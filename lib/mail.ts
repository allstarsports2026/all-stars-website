import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendContactNotificationEmail(data: {
    firstName: string;
    lastName: string;
    email: string;
    topic: string;
    message: string;
}) {
    if (!process.env.RESEND_API_KEY) {
        console.warn("⚠️ RESEND_API_KEY not found. Skipping email notification.");
        return;
    }

    try {
        await resend.emails.send({
            from: 'Allstar Sports <notifications@allstarsports.app>', // Change this to a verified domain
            to: ['admin@allstarsports.app'], // Change this to site owner email
            subject: `New Transmission: ${data.topic}`,
            html: `
                <div style="font-family: sans-serif; background-color: #f4f4f4; padding: 40px;">
                    <div style="max-width: 600px; margin: 0 auto; bg: white; border: 1px solid #eee;">
                        <h1 style="color: #000; font-weight: 900; text-transform: uppercase; font-style: italic;">New Transmission Inbound</h1>
                        <p><strong>From:</strong> ${data.firstName} ${data.lastName} (${data.email})</p>
                        <p><strong>Topic:</strong> ${data.topic}</p>
                        <div style="background: #fafafa; padding: 20px; border-left: 4px solid #03A3FF; margin-top: 20px;">
                            <p style="font-style: italic;">"${data.message}"</p>
                        </div>
                        <p style="margin-top: 40px; font-size: 10px; color: #999;">ALLSTAR SPORTS APPAREL • ADMIN PORTAL NOTIFICATION</p>
                    </div>
                </div>
            `
        });
    } catch (error) {
        console.error("Error sending email:", error);
    }
}
