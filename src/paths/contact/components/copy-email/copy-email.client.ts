import { WORK_MAIL } from "@global/pages-info.ts";

const COPY_BTN = "[data-copy-email]";
const TOAST_DATA = "[data-copy-toast]";

const toastMessages = {
	success: "copied email!",
	error: "could not copy!",
};
type ToastStatus = keyof typeof toastMessages; // to paint the toast

const copy = () => {
	const emailBtn = document.querySelector<HTMLButtonElement>(COPY_BTN);
	const toast = document.querySelector<HTMLElement>(TOAST_DATA);

	if (!emailBtn) return; // narrowing
	if (!toast) return; // narrowing

	const showToast = (status: ToastStatus) => {
		toast.textContent = toastMessages[status];
		delete toast.dataset.status;
		void toast.offsetWidth;
		toast.dataset.status = status;
	};

	emailBtn.addEventListener("click", async () => {
		try {
			await navigator.clipboard.writeText(WORK_MAIL);

			showToast("success");
		} catch {
			showToast("error");
		}
	});

	// clear status and text once the animation ends
	toast.addEventListener("animationend", () => {
		toast.textContent = "";
		delete toast.dataset.status;
	});
};

copy();
