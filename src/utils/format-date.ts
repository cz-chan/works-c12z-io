export const formatMonthYear = (date: Date): string =>
	new Intl.DateTimeFormat("en-US", {
		month: "short",
		year: "numeric",
		timeZone: "UTC",
	}).format(date);
