// https://resend.com/docs/api-reference/introduction
// https://resend.com/docs/api-reference/emails/send-email

import { RESEND_API_KEY } from "astro:env/server";

const RESEND_URL = "https://api.resend.com/emails";
const TIMEOUT_MS = 5000;

// email needs (at least) with same fields names
interface SendEmailOptions {
	from: string;
	to: string;
	subject: string;
	text: string;
	replyTo?: string;
	html?: string;
}

export const sendEmail = async (
	options: SendEmailOptions,
): Promise<boolean> => {
	const { from, to, subject, text, replyTo, html } = options;

	try {
		const payload = {
			from: from,
			to: to,
			subject: subject,
			text: text,
			// an automated message has no one to respond to
			...(replyTo && { reply_to: replyTo }),
			// by default resend not acept html
			...(html && { html }),
		};

		const response = await fetch(RESEND_URL, {
			method: "POST",
			headers: {
				Authorization: `Bearer ${RESEND_API_KEY}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify(payload),
			signal: AbortSignal.timeout(TIMEOUT_MS),
		});

		if (!response.ok) {
			console.error(
				"resend rejected the email",
				response.status,
				await response.text(),
			);
			return false;
		}

		return true;
	} catch (error) {
		console.error("resend request failed!", error);
		return false;
	}
};
