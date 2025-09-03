// Simple, local kebab-case converter to avoid cross-package deep imports
// Keeps scripts self-contained and stable.
export default function toKebabCase(input: string): string {
	return input
		.replace(/([a-z])([A-Z])/g, "$1-$2")
		.replace(/[^a-zA-Z0-9]+/g, "-")
		.replace(/-{2,}/g, "-")
		.replace(/(^-|-$)/g, "")
		.toLowerCase()
}
