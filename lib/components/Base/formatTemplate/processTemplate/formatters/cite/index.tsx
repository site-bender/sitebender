import createElement from "../../../../../../../utilities/createElement/index.ts"

export default function cite(
	value: unknown,
	params?: Record<string, unknown>,
): JSX.Element {
	// Filter out any potentially dangerous attributes
	const safeParams = params
		? {
			...params,
			// Remove any potentially harmful attributes
			onclick: undefined,
			onload: undefined,
			onerror: undefined,
		}
		: {}

	return <cite {...safeParams}>{String(value)}</cite>
}
