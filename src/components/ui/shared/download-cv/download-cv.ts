/* this was created with Claude's help  */

const BTN = "[data-cv-btn]";
const PANEL = "[data-cv-panel]";
const CV_TO_DOWNLOAD = "[data-dowload-cv]";

const GAP = 16; /* --w-space-4, space between the button and the panel */
const EDGE = 8; /* breathing room against the viewport */
const ARROW_INSET = 20; /* --w-space-5, keeps the arrow off the corners */

type ToggleLike = Event & { newState?: string };

type Placement = {
	top: number;
	left: number;
	arrowX: number;
	side: "above" | "below";
};

const isOpening = (event: Event) => (event as ToggleLike).newState === "open";

const clamp = (value: number, min: number, max: number) =>
	Math.min(Math.max(value, min), Math.max(min, max));

const isOffscreen = (anchor: DOMRect) =>
	anchor.bottom < 0 || anchor.top > document.documentElement.clientHeight;

/* the panel sits above the button with their right edges aligned, and drops
	 below it when there is no room. a popover lives in the top layer, so every
	 number here is viewport space and has to be clamped to it. */
const getPlacement = (anchor: DOMRect, box: DOMRect): Placement => {
	const vw = document.documentElement.clientWidth;
	const vh = document.documentElement.clientHeight;

	const fitsAbove = anchor.top - GAP - box.height >= EDGE;
	const top = fitsAbove ? anchor.top - GAP - box.height : anchor.bottom + GAP;
	const left = clamp(anchor.right - box.width, EDGE, vw - box.width - EDGE);
	const arrowCentre = anchor.left + anchor.width / 2 - left;

	return {
		top: clamp(top, EDGE, vh - box.height - EDGE),
		left,
		/* the arrow points at the middle of the button, in panel coordinates */
		arrowX: clamp(arrowCentre, ARROW_INSET, box.width - ARROW_INSET),
		side: fitsAbove ? "above" : "below",
	};
};

const setupDialog = () => {
	const btn = document.querySelector<HTMLButtonElement>(BTN);
	const panel = document.querySelector<HTMLElement>(PANEL);
	if (!btn || !panel) return;

	/* opt into the anchored layout. without js the css bottom sheet stands */
	panel.dataset.anchored = "";

	const place = () => {
		const { top, left, arrowX, side } = getPlacement(
			btn.getBoundingClientRect(),
			panel.getBoundingClientRect(),
		);

		panel.dataset.placement = side;
		panel.style.top = `${top}px`;
		panel.style.left = `${left}px`;
		panel.style.setProperty("--arrow-x", `${arrowX}px`);
	};

	const reposition = () => {
		/* astro swapped the page while the panel was open */
		if (!btn.isConnected) {
			stopTracking();
			return;
		}

		/* the button scrolled away: close instead of leaving a stray panel */
		if (isOffscreen(btn.getBoundingClientRect())) {
			panel.hidePopover();
			return;
		}

		place();
	};

	const startTracking = () => {
		/* capture: catch scrolls on any ancestor, not just the document */
		addEventListener("scroll", reposition, { passive: true, capture: true });
		addEventListener("resize", reposition);
	};

	const stopTracking = () => {
		removeEventListener("scroll", reposition, { capture: true });
		removeEventListener("resize", reposition);
	};

	panel.addEventListener("beforetoggle", (event) => {
		if (!isOpening(event)) {
			stopTracking();
			return;
		}

		/* toggle fires after paint, so stay hidden until the first measure */
		panel.style.visibility = "hidden";
	});

	panel.addEventListener("toggle", (event) => {
		if (!isOpening(event)) return;

		place();
		panel.style.visibility = "";
		startTracking();
	});

	panel.querySelectorAll<HTMLAnchorElement>(CV_TO_DOWNLOAD).forEach((link) => {
		link.addEventListener("click", () => panel.hidePopover());
	});
};

document.addEventListener("astro:page-load", setupDialog);
