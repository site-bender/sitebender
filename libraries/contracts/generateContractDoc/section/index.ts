//++ Creates a markdown section with title and content

type Section = Array<string>

export default function section(
	title: string,
	content: Array<string>,
): Section {
	return [title, "", ...content, ""]
}

export type { Section }
