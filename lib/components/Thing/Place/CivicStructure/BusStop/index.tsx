import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type BusStopProps from "../../../../../types/Thing/BusStop/index.ts"
import type CivicStructureProps from "../../../../../types/Thing/CivicStructure/index.ts"

import CivicStructure from "./index.tsx"

// BusStop adds no properties to the CivicStructure schema type
export type Props = BaseComponentProps<
	BusStopProps,
	"BusStop",
	ExtractLevelProps<BusStopProps, CivicStructureProps>
>

export default function BusStop({
	schemaType = "BusStop",
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
