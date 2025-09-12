//++ Creates a markdown subsection with title and bulleted items

import type { Section } from "../section/index.ts"

export default function subsection(
	title: string,
	items: Array<string>,
	prefix = "- ",
): Section {
	return [
		title,
		"",
		...items.map((item) => `${prefix}${item}`),
		"",
	]
}
