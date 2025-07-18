import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../types/index.ts"
import type IntangibleProps from "../../../../types/Thing/Intangible/index.ts"
import type QuantityProps from "../../../../types/Thing/Quantity/index.ts"

import Intangible from "../index.tsx"

// Quantity adds no properties to the Intangible schema type
export type Props = BaseComponentProps<
	QuantityProps,
	"Quantity",
	ExtractLevelProps<QuantityProps, IntangibleProps>
>

export default function Quantity({
	schemaType = "Quantity",
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
