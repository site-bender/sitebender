import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../../types/index.ts"
import type AutomotiveBusinessProps from "../../../../../../types/Thing/AutomotiveBusiness/index.ts"
import type MotorcycleRepairProps from "../../../../../../types/Thing/MotorcycleRepair/index.ts"

import AutomotiveBusiness from "./index.tsx"

// MotorcycleRepair adds no properties to the AutomotiveBusiness schema type
export type Props = BaseComponentProps<
	MotorcycleRepairProps,
	"MotorcycleRepair",
	ExtractLevelProps<MotorcycleRepairProps, AutomotiveBusinessProps>
>

export default function MotorcycleRepair({
	schemaType = "MotorcycleRepair",
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
