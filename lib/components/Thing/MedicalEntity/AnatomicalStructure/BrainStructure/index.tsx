import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type AnatomicalStructureProps from "../../../../../types/Thing/AnatomicalStructure/index.ts"
import type BrainStructureProps from "../../../../../types/Thing/BrainStructure/index.ts"

import AnatomicalStructure from "../index.tsx"

// BrainStructure adds no properties to the AnatomicalStructure schema type
export type Props = BaseComponentProps<
	BrainStructureProps,
	"BrainStructure",
	ExtractLevelProps<BrainStructureProps, AnatomicalStructureProps>
>

export default function BrainStructure({
	schemaType = "BrainStructure",
	subtypeProperties = {},
	...props
}: Props) {
	return (
		<AnatomicalStructure
			{...props}
			schemaType={schemaType}
			subtypeProperties={subtypeProperties}
		/>
	)
}
