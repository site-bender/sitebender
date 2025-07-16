import type { BaseComponentProps } from "../../types/index.ts"
import type ThingProps from "../../types/Thing/index.ts"

import Base from "../Base/index.tsx"
import createJsonLd from "./createJsonLd/index.ts"

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

	return (
		<>
			<Base format={format} props={allProps} />
			{disableJsonLd ? null : (
				<script type="application/ld+json">
					{JSON.stringify(jsonLd, null, 2)}
				</script>
			)}
		</>
	)
}
