import type { AstroIntegration } from "astro";
import { existsSync, readFileSync, writeFileSync } from "node:fs";

// @astrojs/vercel ignores vercel.json headers, so patch the build output config
export const noindexCV = (): AstroIntegration => {
	let root: URL;
	return {
		name: "noindex-cv",
		hooks: {
			"astro:config:done": ({ config }) => {
				root = config.root;
			},
			"astro:build:done": ({ logger }) => {
				const configPath = new URL(".vercel/output/config.json", root);
				if (!existsSync(configPath)) return logger.warn("vercel output config not found");

				const config = JSON.parse(readFileSync(configPath, "utf-8"));
				config.routes.unshift({
					src: "^/cv/(.*)$",
					headers: { "X-Robots-Tag": "noindex, nofollow, noarchive" },
					continue: true,
				});
				// without charset, browsers decode .md as windows-1252 and break accents
				config.routes.unshift({
					src: "^/cv/(.*)\\.md$",
					headers: { "Content-Type": "text/markdown; charset=utf-8" },
					continue: true,
				});
				writeFileSync(configPath, JSON.stringify(config, null, "\t"));
			},
		},
	};
};
