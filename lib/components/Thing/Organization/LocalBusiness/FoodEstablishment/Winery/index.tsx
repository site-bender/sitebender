import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../../types/index.ts"
import type FoodEstablishmentProps from "../../../../../../types/Thing/FoodEstablishment/index.ts"
import type WineryProps from "../../../../../../types/Thing/Winery/index.ts"

import FoodEstablishment from "../index.tsx"

// Winery adds no properties to the FoodEstablishment schema type
export type Props = BaseComponentProps<
	WineryProps,
	"Winery",
	ExtractLevelProps<WineryProps, FoodEstablishmentProps>
>

export default function Winery({
	schemaType = "Winery",
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
