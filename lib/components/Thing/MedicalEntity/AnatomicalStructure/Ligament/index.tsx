import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type AnatomicalStructureProps from "../../../../../types/Thing/AnatomicalStructure/index.ts"
import type LigamentProps from "../../../../../types/Thing/Ligament/index.ts"

import AnatomicalStructure from "./index.tsx"

// Ligament adds no properties to the AnatomicalStructure schema type
export type Props = BaseComponentProps<
	LigamentProps,
	"Ligament",
	ExtractLevelProps<LigamentProps, AnatomicalStructureProps>
>

export default function Ligament({
	schemaType = "Ligament",
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
