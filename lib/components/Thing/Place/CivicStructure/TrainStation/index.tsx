import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type CivicStructureProps from "../../../../../types/Thing/CivicStructure/index.ts"
import type TrainStationProps from "../../../../../types/Thing/TrainStation/index.ts"

import CivicStructure from "../index.tsx"

// TrainStation adds no properties to the CivicStructure schema type
export type Props = BaseComponentProps<
	TrainStationProps,
	"TrainStation",
	ExtractLevelProps<TrainStationProps, CivicStructureProps>
>

export default function TrainStation({
	schemaType = "TrainStation",
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
