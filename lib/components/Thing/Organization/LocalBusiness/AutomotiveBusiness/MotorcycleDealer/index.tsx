import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../../types/index.ts"
import type AutomotiveBusinessProps from "../../../../../../types/Thing/AutomotiveBusiness/index.ts"
import type MotorcycleDealerProps from "../../../../../../types/Thing/MotorcycleDealer/index.ts"

import AutomotiveBusiness from "./index.tsx"

// MotorcycleDealer adds no properties to the AutomotiveBusiness schema type
export type Props = BaseComponentProps<
	MotorcycleDealerProps,
	"MotorcycleDealer",
	ExtractLevelProps<MotorcycleDealerProps, AutomotiveBusinessProps>
>

export default function MotorcycleDealer({
	schemaType = "MotorcycleDealer",
	subtypeProperties = {},
	...props
}: Props) {
	return (
		<AutomotiveBusiness
			{...props}
			schemaType={schemaType}
			subtypeProperties={subtypeProperties}
		/>
	)
}
