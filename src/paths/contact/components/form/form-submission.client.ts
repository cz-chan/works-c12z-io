import { actions, isInputError } from "astro:actions";
import { resetTurnstile } from "@plugins/cloudflare-turnstile/turnstile.client.ts";

const FORM = "#contact-form";
const STATUS = "[data-form-status]";
const SUBMIT = "[data-submit]";

const setStatus = (form: HTMLFormElement, message: string) => {
	const status = form.querySelector(STATUS);
	if (status) status.textContent = message;
};

const onSubmit = async (event: SubmitEvent) => {
	event.preventDefault();

	const form = event.currentTarget as HTMLFormElement;
	const submitBtn = form.querySelector<HTMLButtonElement>(SUBMIT);

	if (submitBtn?.disabled) return; // avoid duplicate submissions

	if (submitBtn) submitBtn.disabled = true;
	form.setAttribute("aria-busy", "true");

	setStatus(form, "sending...");

	const { data, error } = await actions.contactForm(new FormData(form));

	if (isInputError(error)) {
		setStatus(form, "check the form and try again");
	} else if (error) {
		setStatus(form, error.message);
	} else if (data.ok) {
		form.reset();

		setStatus(form, "message sent, thanks!");
	}

	// to avoid 403 error with widgetId
	resetTurnstile();

	if (submitBtn) submitBtn.disabled = false;
	form.removeAttribute("aria-busy");
};

document.addEventListener("astro:page-load", () => {
	document
		.querySelector<HTMLFormElement>(FORM)
		?.addEventListener("submit", onSubmit);
});
