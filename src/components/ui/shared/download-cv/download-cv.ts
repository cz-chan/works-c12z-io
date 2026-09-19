const DIALOG_BTN = "[data-cv-trigger]";
const DIALOG = "[data-cv-dialog]";
const CV_TO_DOWNLOAD = "[data-dowload-cv]";

const showDialog = () => {
	const openDialogBtn = document.querySelector<HTMLButtonElement>(DIALOG_BTN);
	const dialogElement = document.querySelector<HTMLDialogElement>(DIALOG);
	const downloadLink =
		document.querySelector<HTMLAnchorElement>(CV_TO_DOWNLOAD);

	openDialogBtn?.addEventListener("click", () => {
		dialogElement?.showModal();
	});

	downloadLink?.addEventListener("click", () => {
		dialogElement?.close();
	});
};

document.addEventListener("astro:page-load", showDialog);
