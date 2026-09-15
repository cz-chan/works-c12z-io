// https://developers.cloudflare.com/turnstile/get-started/server-side-validation/
import { CLOUDFLARE_TURNSTILE_SECRET_KEY } from "astro:env/server";

const SITEVERIFY_URL =
	"https://challenges.cloudflare.com/turnstile/v0/siteverify";
const TIMEOUT_MS = 5000;

// cloudflare response type "DTO"
interface SiteverifyResponse {
	success: boolean;
	"error-codes": string[];
	hostname?: string;
	challenge_ts?: string;
}

export const verifyTurnstile = async (
	token: string,
	ip?: string,
): Promise<boolean> => {
	try {
		const body = new URLSearchParams({
			secret: CLOUDFLARE_TURNSTILE_SECRET_KEY,
			response: token,
		});
		if (ip) body.set("remoteip", ip);

		const resp = await fetch(SITEVERIFY_URL, {
			method: "POST",
			headers: { "Content-Type": "application/x-www-form-urlencoded" },
			body: body,
			signal: AbortSignal.timeout(TIMEOUT_MS),
		});

		if (!resp.ok) return false;

		const data = (await resp.json()) as SiteverifyResponse;
		return data.success;
	} catch (error) {
		return false;
	}
};
