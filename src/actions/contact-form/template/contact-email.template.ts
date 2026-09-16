import type { z } from "astro/zod";
import { contactSchema } from "@contact-path/lib/form.schema.ts";
import { STYLES } from "@actions/contact-form/template/contact-email.styles.ts";

type ContactFormInput = z.infer<typeof contactSchema>;

// & first: escaping it later would turn "&lt;" into "&amp;lt;"
const escapeHtml = (value: string) =>
	value
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;");

// hxxps:// is still readable but no client turns it into a clickable link
const defangUrls = (value: string) =>
	value.replace(/https?:\/\//gi, (match) => match.replace(/t/gi, "x"));

export const buildContactEmail = (input: ContactFormInput) => {
	// \r\n prevents header injection, <> would break the "Name <email>" format
	const safeName = input.name
		.replace(/[\r\n<>]/g, "")
		.trim()
		.slice(0, 60);

	const subject = `${input.subject} — ${safeName}`;

	// plain text version: spam filters penalise html-only emails
	const text = [
		`name: ${defangUrls(input.name)}`,
		`email: ${input.email}`,
		`subject: ${input.subject}`,
		"",
		defangUrls(input.message),
	].join("\n");

	const row = (label: string, value: string) =>
		[
			"<tr>",
			`<td style="${STYLES.label}">${label}</td>`,
			`<td style="${STYLES.value}">${escapeHtml(value)}</td>`,
			"</tr>",
		].join("");

	// role="presentation" stops screen readers announcing a data table
	const html = [
		`<div style="${STYLES.body}">`,
		`<div style="${STYLES.card}">`,
		`<div style="${STYLES.header}">`,
		`<p style="${STYLES.eyebrow}">works.c12z.io</p>`,
		`<p style="${STYLES.title}">new message from the contact form in work.c12z.io</p>`,
		"</div>",
		`<div style="${STYLES.content}">`,
		'<table role="presentation" cellpadding="0" cellspacing="0"',
		' style="border-collapse:collapse">',
		row("name", input.name),
		row("email", input.email),
		row("subject", input.subject),
		"</table>",
		`<div style="${STYLES.quote}">`,
		`<p style="${STYLES.message}">`,
		escapeHtml(defangUrls(input.message)),
		"</p>",
		"</div>",
		`<a href="mailto:${encodeURIComponent(input.email)}"`,
		` style="${STYLES.button}">reply to ${escapeHtml(safeName)}</a>`,
		"</div>",
		"</div>",
		"</div>",
	].join("");

	return { subject, text, html, replyTo: input.email, fromName: safeName };
};
