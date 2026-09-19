import { glob } from "astro/loaders";
import { defineCollection } from "astro:content";
import { z } from "astro/zod";

import { ACTUAL_STACK_AND_TOOLS } from "@global/stack.ts";

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
		stackNtools: z.array(z.enum(ACTUAL_STACK_AND_TOOLS)).optional(),
		url: z.string().startsWith("https://").optional(),
		keywords: z.array(z.string()).optional(),
	}),
});

export const collections = {
	works: works,
};
