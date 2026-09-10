export const processKeywords = (keys: string[]): string[] => {
	// if (keys.length === 0) return []; // [].map() return by default an empty array

	return Array.from(new Set(keys.map((kw) => kw.toLowerCase().trim())));
	/**
	 * unnecesary -> .replace(/\s+/g, "-"))),
	 */
};
