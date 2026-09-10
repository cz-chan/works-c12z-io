export const processKeywords = (keys: string[]): string[] => {
	if (keys.length === 0) return [];

	return Array.from(new Set(keys.map((kw) => kw.toLowerCase().trim())));
	/**
	 * unnecesary -> .replace(/\s+/g, "-"))),
	 */
};
