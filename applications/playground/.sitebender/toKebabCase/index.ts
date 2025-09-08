export default function toKebabCase(input: string): string {
	return input
		.replace(/([A-Z]+)([A-Z][a-z])/g, '$1-$2')
		.replace(/([a-z])([A-Z])/g, '$1-$2')
		.toLowerCase();
}
