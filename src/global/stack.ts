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

	"amplitude",
	"ranki",
	"resend",
	"googleAnalytics",
	"wingify",
	"clarity",
	"mixpanel",
	"n8n",
	"hubspot",
] as const;
export type ActualStackTypes = (typeof ACTUAL_STACK_AND_TOOLS)[number];

export const STACK_N_TOOLS: Record<ActualStackTypes, StackToolItem> = {
	javascript: {
		name: "JavaScript",
		url: "https://www.javascript100.dev/",
	},
	typescript: {
		name: "TypeScript",
		url: "https://www.typescriptlang.org",
	},
	astro: { name: "Astro", url: "https://astro.build" },
	react: { name: "React", url: "https://react.dev" },
	nextjs: { name: "NextJS", url: "https://nextjs.org" },
	nodejs: { name: "NodeJS", url: "https://nodejs.org" },
	nestjs: { name: "NestJS", url: "https://nestjs.com" },
	express: { name: "Express", url: "https://expressjs.com" },
	docker: { name: "Docker", url: "https://www.docker.com" },
	sql: {
		name: "PostgreSQL",
		url: "https://www.postgresql.org",
	},
	reactNative: {
		name: "React Native",
		url: "https://reactnative.dev",
	},
	amplitude: {
		name: "Amplitude",
		url: "https://amplitude.com",
	},
	ranki: {
		name: "Ranki",
		url: "https://ranki.co",
	},
	resend: {
		name: "Resend",
		url: "https://resend.com",
	},
	googleAnalytics: {
		name: "GA4",
		url: "https://analytics.google.com",
	},
	wingify: {
		name: "Wingify",
		url: "https://wingify.com",
	},
	clarity: {
		name: "Clarity",
		url: "https://clarity.microsoft.com",
	},
	mixpanel: {
		name: "Mixpanel",
		url: "https://mixpanel.com",
	},
	n8n: {
		name: "n8n",
		url: "https://n8n.io/",
	},
	hubspot: {
		name: "Hubspot",
		url: "https://www.hubspot.com/",
	},
	python: {
		name: "Python",
		url: "https://www.python.org/",
	},
};
