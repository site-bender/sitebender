import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type AnatomicalStructureProps from "../../../../../types/Thing/AnatomicalStructure/index.ts"
import type JointProps from "../../../../../types/Thing/Joint/index.ts"

import AnatomicalStructure from "../index.tsx"

export type Props = BaseComponentProps<
	JointProps,
	"Joint",
	ExtractLevelProps<JointProps, AnatomicalStructureProps>
>

export default function Joint(
	{
		biomechnicalClass,
		functionalClass,
		structuralClass,
		schemaType = "Joint",
		subtypeProperties = {},
		...props
	}: Props,
) {
	return (
		<AnatomicalStructure
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				biomechnicalClass,
				functionalClass,
				structuralClass,
				...subtypeProperties,
			}}
		/>
	)
}
