import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type DistanceProps from "../../../../../types/Thing/Distance/index.ts"
import type QuantityProps from "../../../../../types/Thing/Quantity/index.ts"

import Quantity from "./index.tsx"

// Distance adds no properties to the Quantity schema type
export type Props = BaseComponentProps<
	DistanceProps,
	"Distance",
	ExtractLevelProps<DistanceProps, QuantityProps>
>

export default function Distance({
	schemaType = "Distance",
	subtypeProperties = {},
	...props
}: Props) {
	return (
		<Quantity
			{...props}
			schemaType={schemaType}
			subtypeProperties={subtypeProperties}
		/>
	)
}
