import BaseProps from "../../../types/schema.org/index.ts"
import toKebabCase from "../../helpers/toKebabCase/index.ts"
import createJsonLd from "./createJsonLd/index.ts"
import createTemplate from "./createTemplate/index.tsx"
import generateMicrodata from "./generateMicrodata/index.tsx"
import processProps from "./processProps/index.ts"

export default function Base({
	_template,
	_type,
	children,
	disableJsonLd,
	disableMicrodata,
	element: Element = "span",
	isProp,
	...props
}: BaseProps): JSX.Element | Record<string, unknown> | null {
	const processedProps = processProps(props)
	const cls = `ld-${toKebabCase(_type || "Base")}`

	if (isProp) {
		if (Array.isArray(processedProps)) {
			return processedProps[0] || null
		}
		return processedProps || null
	}

	return (
		<Element class={cls} data-type={_type}>
			{createTemplate(_template)(processedProps)}
			{children}
			{disableMicrodata
				? null
				: Array.isArray(processedProps)
				? generateMicrodata(processedProps[0] || {})
				: generateMicrodata(processedProps)}
			{disableJsonLd || !_type ? null : (
				<script type="application/ld+json">
					{JSON.stringify(
						Array.isArray(processedProps)
							? createJsonLd(_type, processedProps[0] || {})
							: createJsonLd(_type, processedProps),
						null,
						2,
					)}
				</script>
			)}
		</Element>
	)
}
