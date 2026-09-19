interface StackToolItem {
	name: string;
	url: string;
	icon: string;
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
		icon: "javascript",
	},
	typescript: {
		name: "TypeScript",
		url: "https://www.typescriptlang.org",
		icon: "typescript",
	},
	astro: { name: "Astro", url: "https://astro.build", icon: "astro" },
	react: { name: "React", url: "https://react.dev", icon: "react" },
	nextjs: { name: "NextJS", url: "https://nextjs.org", icon: "nextjs" },
	nodejs: { name: "NodeJS", url: "https://nodejs.org", icon: "nodejs" },
	nestjs: { name: "NestJS", url: "https://nestjs.com", icon: "nestjs" },
	express: { name: "Express", url: "https://expressjs.com", icon: "express" },
	docker: { name: "Docker", url: "https://www.docker.com", icon: "docker" },
	sql: {
		name: "PostgreSQL",
		url: "https://www.postgresql.org",
		icon: "postgresql",
	},
	reactNative: {
		name: "React Native",
		url: "https://reactnative.dev",
		icon: "react-native",
	},
};

export const TOOLS: Record<ActualToolsTypes, StackToolItem> = {
	amplitude: {
		name: "Amplitude",
		url: "https://amplitude.com",
		icon: "amplitude",
	},
	ranki: {
		name: "Ranki",
		url: "https://ranki.co",
		icon: "ranki",
	},
	resend: {
		name: "Resend",
		url: "https://resend.com",
		icon: "resend",
	},
	googleAnalytics: {
		name: "Google Analytics",
		url: "https://analytics.google.com",
		icon: "ga4",
	},
	vwo: {
		name: "VWO",
		url: "https://vwo.com",
		icon: "vwo",
	},
	clarity: {
		name: "Clarity",
		url: "https://clarity.microsoft.com",
		icon: "clarity",
	},
	mixpanel: {
		name: "Mixpanel",
		url: "https://mixpanel.com",
		icon: "mixpanel",
	},
};
