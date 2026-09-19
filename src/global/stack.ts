interface StackToolItem {
	name: string;
	url: string;
}

export const ACTUAL_TOOLS = [
	"amplitude",
	"ranki",
	"resend",
	"googleAnalytics",
	"vwo",
	"clarity",
	"mixpanel",
] as const;
export type ActualToolsTypes = (typeof ACTUAL_TOOLS)[number];

export const ACTUAL_STACK = [
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
] as const;
export type ActualStackTypes = (typeof ACTUAL_STACK)[number];

export const STACK: Record<ActualStackTypes, StackToolItem> = {
	javascript: {
		name: "JavaScript",
		url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
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
};

export const TOOLS: Record<ActualToolsTypes, StackToolItem> = {
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
		name: "Google Analytics",
		url: "https://analytics.google.com",
	},
	vwo: {
		name: "VWO",
		url: "https://vwo.com",
	},
	clarity: {
		name: "Clarity",
		url: "https://clarity.microsoft.com",
	},
	mixpanel: {
		name: "Mixpanel",
		url: "https://mixpanel.com",
	},
};
