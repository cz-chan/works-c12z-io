import { glob } from "astro/loaders";
import { defineCollection } from "astro:content";
import { z } from "astro/zod";

const works = defineCollection({
	loader: glob({
		pattern: "**/*.{md,mdx}",
		base: "./src/content/works",
	}),
	schema: z.object({
		company: z.string().max(60),
		role: z.string(),
		description: z.string().min(110).max(160),
		start: z.date(),
		end: z.date().optional(),
		where: z.string(),
		url: z.string().startsWith("https://").optional(),
	}),
});

export const collections = {
	works: works,
};
