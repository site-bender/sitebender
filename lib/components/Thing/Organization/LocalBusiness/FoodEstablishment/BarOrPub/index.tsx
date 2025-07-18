import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../../types/index.ts"
import type BarOrPubProps from "../../../../../../types/Thing/BarOrPub/index.ts"
import type FoodEstablishmentProps from "../../../../../../types/Thing/FoodEstablishment/index.ts"

import FoodEstablishment from "../index.tsx"

// BarOrPub adds no properties to the FoodEstablishment schema type
export type Props = BaseComponentProps<
	BarOrPubProps,
	"BarOrPub",
	ExtractLevelProps<BarOrPubProps, FoodEstablishmentProps>
>

export default function BarOrPub({
	schemaType = "BarOrPub",
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
