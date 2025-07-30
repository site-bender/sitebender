import BaseProps from "../../types/index.ts"
import createTemplate from "./createTemplate/index.tsx"
import generateMicrodata from "./generateMicrodata/index.tsx"
import processProps from "./processProps/index.ts"

export default function Base({
	children: _,
	_template,
	disableJsonLd,
	disableMicrodata,
	isProp,
	...props
}: BaseProps): JSX.Element | Record<string, unknown> | null {
	const processedProps = processProps(props)

	if (isProp) {
		if (Array.isArray(processedProps)) {
			return processedProps[0] || null
		}
		return processedProps || null
	}

	return (
		<span>
			{createTemplate(_template)(processedProps)}
			{disableMicrodata
				? null
				: Array.isArray(processedProps)
				? generateMicrodata(processedProps[0] || {})
				: generateMicrodata(processedProps)}
			{disableJsonLd ? null : (
				<script type="application/ld+json">
					{JSON.stringify(processedProps, null, 2)}
				</script>
			)}
		</span>
	)
}
