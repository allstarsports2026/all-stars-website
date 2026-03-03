import { Resend } from 'resend';

if (!process.env.RESEND_API_KEY) {
  if (process.env.NODE_ENV === 'production') {
    console.warn('⚠️ RESEND_API_KEY is not defined. Email functionality will not work.');
  }
}


export const resend = new Resend(process.env.RESEND_API_KEY || 're_dummy_key');


export const EMAIL_FROM = 'Church App <hello@churchapp.live>';


export async function sendEmail({ to, subject, text, from = EMAIL_FROM }: { 
  to: string | string[], 
  subject: string, 
  text: string, 
  from?: string 
}) {
  if (!process.env.RESEND_API_KEY) return;
  
  try {
    return await resend.emails.send({
      from,
      to,
      subject,
      text,
    });
  } catch (error) {
    console.error("Resend error:", error);
    throw error;
  }
}

