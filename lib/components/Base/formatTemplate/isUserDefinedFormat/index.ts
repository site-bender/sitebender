// Check if format is user-defined (contains {{ or spaces) vs predefined (single camelCase)
export default function isUserDefinedFormat(format: string): boolean {
	return format.includes("{{") || format.includes(" ")
}
