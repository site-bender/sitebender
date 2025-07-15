import type { BaseComponentProps } from "../../types/index.ts"
import type ThingProps from "../../types/Thing/index.ts"

import createJsonLd from "./createJsonLd/index.ts"
import formatTemplate from "./formatTemplate/index.ts"
import FORMATTERS from "./formatTemplate/processTemplate/formatters/index.ts"

export type Props = BaseComponentProps<
	ThingProps,
	"Thing",
	Record<string, unknown>
>

export default function Thing(
	{ disableJsonLd, format, schemaType = "Thing", subtypeProperties, ...props }:
		Props,
) {
	const jsonLd = createJsonLd(schemaType, props, subtypeProperties)
	const allProps = { ...props, ...subtypeProperties }

	// Generate formatted content if format is provided
	const formattedContent = format
		? formatTemplate(format, {
			props: allProps,
			formatters: FORMATTERS,
		})
		: null

	return (
		<>
			{formattedContent
				? (
					<span>
						{formattedContent.map((item, index) => (
							<span key={index}>{item}</span>
						))}
					</span>
				)
				: (
					<>
						<span>Schema type is {schemaType}</span>
						<pre>{JSON.stringify(allProps, null, 2)}</pre>
					</>
				)}
			{disableJsonLd ? null : (
				<script type="application/ld+json">
					{JSON.stringify(jsonLd, null, 2)}
				</script>
			)}
		</>
	)
}
