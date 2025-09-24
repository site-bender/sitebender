//++ Extracts the import specifier from a regex match
export default function extractImportSpecifier(match: RegExpExecArray): string {
	return match[2]
}