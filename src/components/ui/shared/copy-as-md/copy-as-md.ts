/* this was created with Claude's help  */

import { anchorPopover } from "@ui/shared/popover/anchor-popover.ts";

const BTN = "[data-cv-md-btn]";
const PANEL = "[data-cv-md-panel]";
const COPY = "[data-copy-cv]";
const STATUS = "[data-cv-md-status]";

const FEEDBACK_MS = 1200;

const fetchMarkdown = async (src: string) => {
	const res = await fetch(src);
	if (!res.ok) throw new Error(`${res.status} ${src}`);
	return new Blob([await res.text()], { type: "text/plain" });
};

/* safari drops the user gesture after an await, so hand the clipboard a
	 promise via ClipboardItem. writeText is the fallback for older browsers. */
const copyFrom = async (src: string) => {
	if ("ClipboardItem" in window && navigator.clipboard?.write) {
		const item = new ClipboardItem({ "text/plain": fetchMarkdown(src) });
		return navigator.clipboard.write([item]);
	}

	const blob = await fetchMarkdown(src);
	return navigator.clipboard.writeText(await blob.text());
};

const setupCopy = () => {
	const btn = document.querySelector<HTMLButtonElement>(BTN);
	const panel = document.querySelector<HTMLElement>(PANEL);
	const status = panel?.querySelector<HTMLElement>(STATUS);
	if (!btn || !panel || !status) return;

	anchorPopover(btn, panel);

	panel.querySelectorAll<HTMLButtonElement>(COPY).forEach((item) => {
		const label = item.textContent?.trim() ?? "";

		item.addEventListener("click", async () => {
			const src = item.dataset.src;
			if (!src || item.dataset.state) return;

			try {
				await copyFrom(src);
				item.dataset.state = "copied";
				item.textContent = "copied ✓";
				status.textContent = "cv copied to clipboard";
			} catch {
				item.dataset.state = "error";
				item.textContent = "could not copy, try again";
				status.textContent = "could not copy the cv";
			}

			setTimeout(() => {
				const copied = item.dataset.state === "copied";
				delete item.dataset.state;
				item.textContent = label;
				status.textContent = "";
				if (copied) panel.hidePopover();
			}, FEEDBACK_MS);
		});
	});
};

document.addEventListener("astro:page-load", setupCopy);
