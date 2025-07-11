export default function extractComponentImportPaths(
	content: string,
): Array<string> {
	const importRegex =
		/import\s+(?:[^"']*?\s+from\s+)?["']~components\/([\w/]+)(?:\/index\.tsx?)?["']/g

	return Array.from(content.matchAll(importRegex))
		.map((match: any) => match[1])
		.filter(Boolean)
}
