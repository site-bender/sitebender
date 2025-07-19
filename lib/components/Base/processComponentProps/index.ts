import extractPropsFromComponent from "../extractPropsFromComponent/index.ts"
import isJSXComponent from "../isJSXComponent/index.ts"

export default function processComponentProps(
	props: Record<string, unknown>,
): Record<string, unknown> {
	const processed: Record<string, unknown> = {}

	for (const [key, value] of Object.entries(props)) {
		if (isJSXComponent(value)) {
			processed[key] = extractPropsFromComponent(value)
		} else {
			processed[key] = value
		}
	}

	return processed
}
