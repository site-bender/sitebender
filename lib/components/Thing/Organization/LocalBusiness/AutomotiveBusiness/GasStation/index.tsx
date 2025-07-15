import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../../types/index.ts"
import type AutomotiveBusinessProps from "../../../../../../types/Thing/AutomotiveBusiness/index.ts"
import type GasStationProps from "../../../../../../types/Thing/GasStation/index.ts"

import AutomotiveBusiness from "./index.tsx"

// GasStation adds no properties to the AutomotiveBusiness schema type
export type Props = BaseComponentProps<
	GasStationProps,
	"GasStation",
	ExtractLevelProps<GasStationProps, AutomotiveBusinessProps>
>

export default function GasStation({
	schemaType = "GasStation",
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
