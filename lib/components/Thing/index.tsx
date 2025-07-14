import type { BaseComponentProps } from "../../types/index.ts"
import type ThingProps from "../../types/Thing/index.ts"

import createJsonLd from "../helpers/createJsonLd/index.ts"

export type Props = BaseComponentProps<
	ThingProps,
	"Thing",
	Record<string, unknown>
>

export default function Thing(
	{ disableJsonLd, schemaType = "Thing", subtypeProperties, ...props }: Props,
) {
	const jsonLd = createJsonLd(schemaType, props, subtypeProperties)

	return (
		<>
			<span>Schema type is {schemaType}</span>
			<pre>{JSON.stringify(props, null, 2)}</pre>
			{disableJsonLd ? null : (
				<script type="application/ld+json">
					{JSON.stringify(jsonLd, null, 2)}
				</script>
			)}
		</>
	)
}
