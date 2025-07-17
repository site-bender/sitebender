import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../../types/index.ts"
import type DistilleryProps from "../../../../../../types/Thing/Distillery/index.ts"
import type FoodEstablishmentProps from "../../../../../../types/Thing/FoodEstablishment/index.ts"

import FoodEstablishment from "../index.tsx"

// Distillery adds no properties to the FoodEstablishment schema type
export type Props = BaseComponentProps<
	DistilleryProps,
	"Distillery",
	ExtractLevelProps<DistilleryProps, FoodEstablishmentProps>
>

export default function Distillery({
	schemaType = "Distillery",
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
