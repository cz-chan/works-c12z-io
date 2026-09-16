import { ActionError, defineAction } from "astro:actions";
import { CONTACT_FROM_EMAIL, CONTACT_TO_EMAIL } from "astro:env/server";

import { contactSchema } from "@contact-path/lib/form.schema.ts";
import { sendEmail } from "@plugins/resend/send-email.server.ts";
import { verifyTurnstile } from "@plugins/cloudflare-turnstile/turnstile.server.ts";
import { buildContactEmail } from "@actions/contact-form/template/contact-email.template.ts";

export const contactForm = defineAction({
	accept: "form",
	input: contactSchema,
	handler: async (input, context) => {
		const { "cf-turnstile-response": turnstileToken, company } = input;

		if (company) return { ok: true };

		const isHuman = await verifyTurnstile(
			turnstileToken,
			context.clientAddress,
		);
		if (!isHuman) {
			throw new ActionError({
				code: "FORBIDDEN",
				message: "captcha verification failed, please try again",
			});
		}

		const email = buildContactEmail(input);
		const sent = await sendEmail({
			from: `${email.fromName} <${CONTACT_FROM_EMAIL}>`,
			to: CONTACT_TO_EMAIL,
			subject: email.subject,
			text: email.text,
			html: email.html, // not now
			replyTo: email.replyTo,
		});

		if (!sent) {
			throw new ActionError({
				code: "INTERNAL_SERVER_ERROR",
				message: "could not send the message, please try again later",
			});
		}

		return { ok: true };
	},
});
