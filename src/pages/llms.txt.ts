import type { APIRoute } from "astro";

const llms = ``;

export const GET: APIRoute = () => {
	return new Response(llms);
};
