// Remove comments and string/template literals for safer scanning

export default function stripCommentsAndStrings(input: string): string {
	// Remove block comments
	let s = input.replace(/\/\*[\s\S]*?\*\//g, "")

	// Remove line comments
	s = s.replace(/(^|[^:])\/\/.*$/gm, "$1")

	// Remove template strings (greedy but fine for scanning)
	s = s.replace(/`[\s\S]*?`/g, "``")

	// Remove single and double quoted strings
	s = s.replace(/'(?:\\.|[^'\\])*'/g, "''").replace(
		/"(?:\\.|[^"\\])*"/g,
		'""',
	)

	return s
}
