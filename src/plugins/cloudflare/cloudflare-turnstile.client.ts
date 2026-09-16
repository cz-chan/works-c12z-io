// https://developers.cloudflare.com/turnstile/get-started/client-side-rendering/widget-configurations/
// Explicit render: implicit mode only scans the DOM on first load, so widgets
// would not appear after a ClientRouter navigation. We render on astro:page-load.

import { CLOUDFLARE_TURNSTILE_PUBLIC_KEY } from "astro:env/client";

interface TurnstileOptions {
	sitekey: string;
	theme?: "auto" | "light" | "dark";
	size?: "normal" | "flexible" | "compact";
	appearance?: "always" | "execute" | "interaction-only";
}

interface Turnstile {
	render(container: HTMLElement, options: TurnstileOptions): string;
	remove(widgetId: string): void;
	reset(widgetId: string): void;
}

declare global {
	// without that you create another Window without affecting the real one
	interface Window {
		turnstile?: Turnstile;
	}
}

const DEFAULT_OPTIONS = {
	theme: "light",
	size: "flexible",
	appearance: "interaction-only",
} satisfies Partial<TurnstileOptions>;

// must match the attribute in CloudflareTurnstile.component.astro
const SELECTOR = "[data-cloudflare-turnstile]";

let widgetId: string | undefined; // turnstile.remove() needs it on navigation.

const renderWidget = (turnstile: Turnstile) => {
	const widget = document.querySelector<HTMLElement>(SELECTOR); // select the element

	if (!widget || widget.childElementCount > 0) return;

	widgetId = turnstile.render(widget, {
		sitekey: CLOUDFLARE_TURNSTILE_PUBLIC_KEY,
		...DEFAULT_OPTIONS,
	});
};

const onPageLoad = () => {
	if (!document.querySelector(SELECTOR)) return;

	if (window.turnstile) return renderWidget(window.turnstile);

	document.getElementById("cf-turnstile-api")?.addEventListener(
		"load",
		() => {
			// api.js may load but fail to run (adblock, CSP)
			if (window.turnstile) renderWidget(window.turnstile);
		},
		{ once: true },
	);
};

const onBeforeSwap = () => {
	if (!widgetId || !window.turnstile) return;

	window.turnstile.remove(widgetId);
	widgetId = undefined;
};

export const resetTurnstile = () => {
	// the “widgetID” can only be used once; if it is retained, a 403 error is generated.
	if (widgetId && window.turnstile) window.turnstile.reset(widgetId);
};

document.addEventListener("astro:page-load", onPageLoad);
document.addEventListener("astro:before-swap", onBeforeSwap);
