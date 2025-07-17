import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type CivicStructureProps from "../../../../../types/Thing/CivicStructure/index.ts"
import type SubwayStationProps from "../../../../../types/Thing/SubwayStation/index.ts"

import CivicStructure from "../index.tsx"

// SubwayStation adds no properties to the CivicStructure schema type
export type Props = BaseComponentProps<
	SubwayStationProps,
	"SubwayStation",
	ExtractLevelProps<SubwayStationProps, CivicStructureProps>
>

export default function SubwayStation({
	schemaType = "SubwayStation",
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
