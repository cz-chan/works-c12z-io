// https://docs.astro.build/en/recipes/external-links/#recipe

import { defineHastPlugin } from "satteri";

export const hastExternalLinks = defineHastPlugin({
	name: "hast-external-links",
	element: {
		filter: ["a"],
		visit(node, context) {
			if (node.properties.href?.startsWith("https")) {
				context.setProperty(node, "target", "_blank");
				context.setProperty(node, "rel", "noopener noreferrer");
			}
		},
	},
});
