import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../../types/index.ts"
import type BreweryProps from "../../../../../../types/Thing/Brewery/index.ts"
import type FoodEstablishmentProps from "../../../../../../types/Thing/FoodEstablishment/index.ts"

import FoodEstablishment from "../index.tsx"

// Brewery adds no properties to the FoodEstablishment schema type
export type Props = BaseComponentProps<
	BreweryProps,
	"Brewery",
	ExtractLevelProps<BreweryProps, FoodEstablishmentProps>
>

export default function Brewery({
	schemaType = "Brewery",
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
