type CvVariant = "compressed" | "extended";

interface CVLinks {
	id: CvVariant;
	label: string;
	note: string;
	href: string;
	download: string;
}

export const cvLinks: CVLinks[] = [
	{
		id: "compressed",
		download: "chema-ferrandez-cv-compressed.pdf",
		href: "/cv/chema-ferrandez-cv-compressed.pdf",
		label: "download compressed cv",
		note: "a single page that does not show the details",
	},
	{
		id: "extended",
		download: "chema-ferrandez-cv-extended.pdf",
		href: "/cv/chema-ferrandez-cv-extended.pdf",
		label: "download extended cv",
		note: "the complete web with all details.",
	},
];
