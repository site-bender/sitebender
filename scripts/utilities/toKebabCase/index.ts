import pipe from "@sitebender/toolsmith/pipe/index.ts"
import replace from "@sitebender/toolsmith/string/replace/index.ts"
import toLowerCase from "@sitebender/toolsmith/string/toLowerCase/index.ts"

//++ Simple, local kebab-case converter to avoid cross-package deep imports
export default function toKebabCase(input: string): string {
	return pipe(
		input,
		replace(/([a-z])([A-Z])/g)("$1-$2"),
		replace(/[^a-zA-Z0-9]+/g)("-"),
		replace(/-{2,}/g)("-"),
		replace(/(^-|-$)/g)(""),
		toLowerCase,
	)
}
