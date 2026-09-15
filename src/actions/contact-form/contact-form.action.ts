import { ActionError, defineAction } from "astro:actions";

import { contactSchema } from "@contact-path/lib/form.schema.ts";
import { verifyTurnstile } from "@plugins/cloudflare/cloudflare-turnstile.server.ts";

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

		return { ok: true };
	},
});
