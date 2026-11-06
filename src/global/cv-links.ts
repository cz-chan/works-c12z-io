type CvVariant = "compressed" | "extended";

interface CVLinks {
	id: CvVariant;
	label: string;
	note: string;
	href: string;
	download: string;
	md: string;
}

export const cvLinks: CVLinks[] = [
	{
		id: "extended",
		download: "chema-ferrandez-cv-extended.pdf",
		href: "/cv/chema-ferrandez-cv-extended.pdf",
		md: "/cv/chema-ferrandez-cv-extended.md",
		label: "download extended cv",
		note: "the complete web with all details.",
	},
	{
		id: "compressed",
		download: "chema-ferrandez-cv-compressed.pdf",
		href: "/cv/chema-ferrandez-cv-compressed.pdf",
		md: "/cv/chema-ferrandez-cv-compressed.md",
		label: "download compressed cv",
		note: "a single page that does not show the details",
	},
];
