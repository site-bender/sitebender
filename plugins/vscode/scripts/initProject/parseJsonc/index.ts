export default function parseJsonc(text: string): unknown {
	return JSON.parse(
		text
			.replace(/\/\*[\s\S]*?\*\//g, "")
			.replace(/(^|\n)\s*\/\/.*$/gm, ""),
	)
}
