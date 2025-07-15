import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../../types/index.ts"
import type BakeryProps from "../../../../../../types/Thing/Bakery/index.ts"
import type FoodEstablishmentProps from "../../../../../../types/Thing/FoodEstablishment/index.ts"

import FoodEstablishment from "./index.tsx"

// Bakery adds no properties to the FoodEstablishment schema type
export type Props = BaseComponentProps<
	BakeryProps,
	"Bakery",
	ExtractLevelProps<BakeryProps, FoodEstablishmentProps>
>

export default function Bakery({
	schemaType = "Bakery",
	subtypeProperties = {},
	...props
}: Props) {
	return (
		<FoodEstablishment
			{...props}
			schemaType={schemaType}
			subtypeProperties={subtypeProperties}
		/>
	)
}
