interface NavLink {
	label: string;
	note: string;
	href: string;
}

export const homeLinks: NavLink[] = [
	{ label: "past works", note: "what have i been working on?", href: "/works" },
	{
		label: "own projects",
		note: "things i have built",
		href: "#",
	},
	{ label: "my context", note: "who am i", href: "/context" },
	{ label: "do we work?", note: "send me an email", href: "/contact" },
	{ label: "download cv", note: "this web in .pdf format", href: "#" },
];
