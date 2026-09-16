import { actions, isInputError } from "astro:actions";
import { resetTurnstile } from "@plugins/cloudflare-turnstile/turnstile.client.ts";

const FORM = "#contact-form";
const STATUS = "[data-form-status]";
const SUBMIT = "[data-submit]";

const SUCCESS = "[data-form-success]";
const RESET = "[data-form-reset]";

const setStatus = (form: HTMLFormElement, message: string) => {
	const status = form.querySelector(STATUS);
	if (status) status.textContent = message;
};

const onSubmit = async (event: SubmitEvent) => {
	event.preventDefault();

	const form = event.currentTarget as HTMLFormElement;
	const submitBtn = form.querySelector<HTMLButtonElement>(SUBMIT);

	/** avoid duplicate submissions */
	if (submitBtn?.disabled) return;

	if (submitBtn) submitBtn.disabled = true;
	form.setAttribute("aria-busy", "true");

	setStatus(form, "");

	const { data, error } = await actions.contactForm(new FormData(form));

	if (isInputError(error)) {
		setStatus(form, "check the form or try again latter.");
	} else if (error) {
		setStatus(form, error.message);
	} else if (data.ok) {
		setStatus(form, ""); // to clean the messages like 'sending...'
		form.reset();

		form.hidden = true;
		const success = document.querySelector<HTMLElement>(SUCCESS);

		if (success) {
			success.hidden = false;
			success.focus();
		}
	}

	/** to avoid 403 error with widgetId*/
	resetTurnstile();

	if (submitBtn) submitBtn.disabled = false;
	form.removeAttribute("aria-busy");
};

document.addEventListener("astro:page-load", () => {
	document
		.querySelector<HTMLFormElement>(FORM)
		?.addEventListener("submit", onSubmit);

	/** create new form when user click the "send another message" (btn*1) */
	document.querySelector<HTMLElement>(RESET)?.addEventListener("click", () => {
		/** create the form (and the confirmation page) from another element (btn*1), from scratch  */
		const form = document.querySelector<HTMLFormElement>(FORM);
		const success = document.querySelector<HTMLElement>(SUCCESS);

		if (!form || !success) return;

		/** create their base states */
		success.hidden = true;
		form.hidden = false;

		setStatus(form, ""); /** the empty form */
		resetTurnstile();

		form.querySelector<HTMLInputElement>("input")?.focus();
	});
});
