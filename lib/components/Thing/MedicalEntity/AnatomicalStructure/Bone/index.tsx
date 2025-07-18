import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type AnatomicalStructureProps from "../../../../../types/Thing/AnatomicalStructure/index.ts"
import type BoneProps from "../../../../../types/Thing/Bone/index.ts"

import AnatomicalStructure from "../index.tsx"

// Bone adds no properties to the AnatomicalStructure schema type
export type Props = BaseComponentProps<
	BoneProps,
	"Bone",
	ExtractLevelProps<BoneProps, AnatomicalStructureProps>
>

export default function Bone({
	schemaType = "Bone",
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
