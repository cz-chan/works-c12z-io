import { z } from "astro/zod";

const OG_IMAGE = "/og-image.webp";
const OG_IMAGE_ALT = "chema ferrandez's works";

const IMAGE_SCHEMA = z
	.object({
		src: z.string().default(OG_IMAGE),
		alt: z.string().default(OG_IMAGE_ALT),
	})
	.default({ src: OG_IMAGE, alt: OG_IMAGE_ALT });

const PAGES_INFO_SCHEMA = z.object({
	heading: z.string().toLowerCase(),
	title: z.string().max(60),
	description: z.string().min(110).max(160),
	ogImage: IMAGE_SCHEMA,
	keywords: z.array(z.string()).min(5).max(8).optional(),
});

// one key per static page, so a typo in PAGES.<page> is a type error
const PAGES_SCHEMA = z.object({
	works: PAGES_INFO_SCHEMA,
	context: PAGES_INFO_SCHEMA,
	contact: PAGES_INFO_SCHEMA,
	error: PAGES_INFO_SCHEMA,
});

export const PAGES = PAGES_SCHEMA.parse({
	works: {
		heading: "my works",
		title: "companies and projects i've been involved with - cz ✌🏽",
		description:
			"the companies and projects i've worked on as a growth product engineer: what i built at each one, when, and where.",
		keywords: [
			"chema ferrandez",
			"chema ferrandez works",
			"growth product engineer experience",
			"cz freelance projects",
			"cz portfolio",
		],
	},
	context: {
		heading: "my context",
		title: "who i am, what i do, and why - cz ✌🏽",
		description:
			"growth, product, and behavioral economics. who i am, how I work, and why i’m obsessed with understanding the minds of the people who use what we build.",
		keywords: [
			"chema ferrandez",
			"who is cz",
			"professional background",
			"growth product engineer",
			"behavioral economics and product",
		],
	},
	contact: {
		heading: "do we work?",
		title: "let's talk about your product - cz ✌🏽",
		description:
			"do you have a product that needs to grow? message me here, tell me what you're working on, and let's see if it makes sense for us to collaborate.",
		keywords: [
			"contact chema ferrandez",
			"cz contact",
			"freelance growth product engineer",
			"work with cz",
			"email chema ferrandez",
		],
	},
	// not indexed: the og only has to say the page is gone
	error: {
		heading: "page not found",
		title: "Esta página no está disponible - cz ✌🏽",
		description:
			"the page you're looking for isn't available: it may have been moved or may never have existed. go back to the home page and continue from there.",
		ogImage: { alt: "page not available - chema ferrandez" },
	},
});
