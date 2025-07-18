import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type CivicStructureProps from "../../../../../types/Thing/CivicStructure/index.ts"
import type PlaceOfWorshipProps from "../../../../../types/Thing/PlaceOfWorship/index.ts"

import CivicStructure from "../index.tsx"

// PlaceOfWorship adds no properties to the CivicStructure schema type
export type Props = BaseComponentProps<
	PlaceOfWorshipProps,
	"PlaceOfWorship",
	ExtractLevelProps<PlaceOfWorshipProps, CivicStructureProps>
>

export default function PlaceOfWorship({
	schemaType = "PlaceOfWorship",
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
