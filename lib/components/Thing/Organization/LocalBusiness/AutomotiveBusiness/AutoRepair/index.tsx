import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../../types/index.ts"
import type AutomotiveBusinessProps from "../../../../../../types/Thing/AutomotiveBusiness/index.ts"
import type AutoRepairProps from "../../../../../../types/Thing/AutoRepair/index.ts"

import AutomotiveBusiness from "../index.tsx"

// AutoRepair adds no properties to the AutomotiveBusiness schema type
export type Props = BaseComponentProps<
	AutoRepairProps,
	"AutoRepair",
	ExtractLevelProps<AutoRepairProps, AutomotiveBusinessProps>
>

export default function AutoRepair({
	schemaType = "AutoRepair",
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
