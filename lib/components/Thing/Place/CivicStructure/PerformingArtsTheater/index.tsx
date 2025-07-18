import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type CivicStructureProps from "../../../../../types/Thing/CivicStructure/index.ts"
import type PerformingArtsTheaterProps from "../../../../../types/Thing/PerformingArtsTheater/index.ts"

import CivicStructure from "../index.tsx"

// PerformingArtsTheater adds no properties to the CivicStructure schema type
export type Props = BaseComponentProps<
	PerformingArtsTheaterProps,
	"PerformingArtsTheater",
	ExtractLevelProps<PerformingArtsTheaterProps, CivicStructureProps>
>

export default function PerformingArtsTheater({
	schemaType = "PerformingArtsTheater",
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
