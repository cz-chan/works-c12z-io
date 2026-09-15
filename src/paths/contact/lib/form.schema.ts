import { z } from "astro/zod";

export const subjectSchema = z.enum(["work", "hello", "bug", "other"]);
export type SubjectTypes = z.infer<typeof subjectSchema>;

export const contactSchema = z.object({
	name: z.string().trim().min(2).max(100),
	email: z.email(),
	subject: subjectSchema,
	message: z.string().trim().min(1).max(600),
	privacy: z.literal("on"),
	"cf-turnstile-response": z.string().min(1, "please complete the captcha"),
	company: z.string().optional(), // honeypot
});

export const FIELDS = contactSchema.keyof().enum;
export type FieldName = keyof z.infer<typeof contactSchema>;

export const SUBJECT_LABELS: Record<SubjectTypes, string> = {
	hello: "just to say hi!",
	work: "let's talk about work",
	bug: "a bug on the site",
	other: "something else",
};
