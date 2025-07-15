import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type BusStationProps from "../../../../../types/Thing/BusStation/index.ts"
import type CivicStructureProps from "../../../../../types/Thing/CivicStructure/index.ts"

import CivicStructure from "./index.tsx"

// BusStation adds no properties to the CivicStructure schema type
export type Props = BaseComponentProps<
	BusStationProps,
	"BusStation",
	ExtractLevelProps<BusStationProps, CivicStructureProps>
>

export default function BusStation({
	schemaType = "BusStation",
	subtypeProperties = {},
	...props
}: Props) {
	return (
		<CivicStructure
			{...props}
			schemaType={schemaType}
			subtypeProperties={subtypeProperties}
		/>
	)
}
