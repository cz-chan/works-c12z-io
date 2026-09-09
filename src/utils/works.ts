import type { CollectionEntry } from "astro:content";

import { formatMonthYear } from "@utils/format-date.ts";

type Work = CollectionEntry<"works">;

export const FREELANCE_ID = "freelance";

// top level is only '/works/{company}' no '/works/freelance/{company}'
export const isTopLevel = ({ id }: Work): boolean => !id.includes("/");

export const isGenericWork = (work: Work): boolean =>
	isTopLevel(work) && work.id !== FREELANCE_ID;

export const isChildOf =
	(parentId: string) =>
	({ id }: Work): boolean =>
		id.startsWith(`${parentId}/`);

/* 
	the most recent one appears first. 
	when a task doesn't have a completion date, it means I'm working on it 
*/
export const byRecency = (a: Work, b: Work): number => {
	const aEnd = a.data.end;
	const bEnd = b.data.end;

	// the two are ongoing: there is no end to compare; the beginning decides.
	if (!aEnd && !bEnd) return b.data.start.getTime() - a.data.start.getTime();

	// only one is in progress: that one comes first.
	if (!aEnd) return -1;
	if (!bEnd) return 1;

	// the two who finished: the one who finished later, first.
	return bEnd.getTime() - aEnd.getTime();
};

export const dateRange = ({ data }: Work): string =>
	`${formatMonthYear(data.start)} — ${
		data.end ? formatMonthYear(data.end) : "present"
	}`;

export const toContentListItems = (works: Work[]) =>
	works.map((work) => ({
		title: work.data.company,
		subtitle: work.data.role,
		href: `/works/${work.id}`,
		meta: dateRange(work),
	}));
