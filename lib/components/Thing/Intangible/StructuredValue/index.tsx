import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../types/index.ts"
import type IntangibleProps from "../../../../types/Thing/Intangible/index.ts"
import type StructuredValueProps from "../../../../types/Thing/StructuredValue/index.ts"

import Intangible from "./index.tsx"

// StructuredValue adds no properties to the Intangible schema type
export type Props = BaseComponentProps<
	StructuredValueProps,
	"StructuredValue",
	ExtractLevelProps<StructuredValueProps, IntangibleProps>
>

export default function StructuredValue({
	schemaType = "StructuredValue",
	subtypeProperties = {},
	...props
}: Props) {
	return (
		<Intangible
			{...props}
			schemaType={schemaType}
			subtypeProperties={subtypeProperties}
		/>
	)
}
