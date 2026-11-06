/* this was created with Claude's help  */

import { anchorPopover } from "@ui/shared/popover/anchor-popover.ts";

const BTN = "[data-cv-btn]";
const PANEL = "[data-cv-panel]";
const CV_TO_DOWNLOAD = "[data-dowload-cv]";

const setupDialog = () => {
	const btn = document.querySelector<HTMLButtonElement>(BTN);
	const panel = document.querySelector<HTMLElement>(PANEL);
	if (!btn || !panel) return;

	anchorPopover(btn, panel);

	panel.querySelectorAll<HTMLAnchorElement>(CV_TO_DOWNLOAD).forEach((link) => {
		link.addEventListener("click", () => panel.hidePopover());
	});
};

document.addEventListener("astro:page-load", setupDialog);
