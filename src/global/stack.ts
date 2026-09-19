interface StackToolItem {
	name: string;
	url: string;
}
export const ACTUAL_STACK_AND_TOOLS = [
	"javascript",
	"typescript",
	"astro",
	"react",
	"nextjs",
	"nodejs",
	"nestjs",
	"express",
	"docker",
	"sql",
	"reactNative",
	"python",
	"prisma",

	"amplitude",
	"ranki",
	"resend",
	"googleAnalytics",
	"wingify",
	"clarity",
	"mixpanel",
	"n8n",
	"hubspot",
	"brevo",
] as const;
export type ActualStackTypes = (typeof ACTUAL_STACK_AND_TOOLS)[number];

export const STACK_N_TOOLS: Record<ActualStackTypes, StackToolItem> = {
	javascript: {
		name: "javascript",
		url: "https://www.javascript100.dev/",
	},
	typescript: {
		name: "typescript",
		url: "https://www.typescriptlang.org",
	},
	astro: { name: "astro", url: "https://astro.build" },
	react: { name: "react", url: "https://react.dev" },
	nextjs: { name: "nextjs", url: "https://nextjs.org" },
	nodejs: { name: "nodejs", url: "https://nodejs.org" },
	nestjs: { name: "nestjs", url: "https://nestjs.com" },
	express: { name: "express", url: "https://expressjs.com" },
	docker: { name: "docker", url: "https://www.docker.com" },
	sql: {
		name: "postgresql",
		url: "https://www.postgresql.org",
	},
	reactNative: {
		name: "react native",
		url: "https://reactnative.dev",
	},
	python: {
		name: "python",
		url: "https://www.python.org/",
	},
	prisma: {
		name: "prisma",
		url: "https://www.prisma.io/",
	},

	amplitude: {
		name: "amplitude",
		url: "https://amplitude.com",
	},
	ranki: {
		name: "ranki",
		url: "https://ranki.co",
	},
	resend: {
		name: "resend",
		url: "https://resend.com",
	},
	googleAnalytics: {
		name: "ga4",
		url: "https://analytics.google.com",
	},
	wingify: {
		name: "wingify",
		url: "https://wingify.com",
	},
	clarity: {
		name: "clarity",
		url: "https://clarity.microsoft.com",
	},
	mixpanel: {
		name: "mixpanel",
		url: "https://mixpanel.com",
	},
	n8n: {
		name: "n8n",
		url: "https://n8n.io/",
	},
	hubspot: {
		name: "hubspot",
		url: "https://www.hubspot.com/",
	},
	brevo: {
		name: "brevo",
		url: "https://www.brevo.com/",
	},
};
