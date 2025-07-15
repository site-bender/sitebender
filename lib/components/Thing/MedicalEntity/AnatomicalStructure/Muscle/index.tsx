import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type AnatomicalStructureProps from "../../../../../types/Thing/AnatomicalStructure/index.ts"
import type MuscleProps from "../../../../../types/Thing/Muscle/index.ts"

import AnatomicalStructure from "./index.tsx"

export type Props = BaseComponentProps<
	MuscleProps,
	"Muscle",
	ExtractLevelProps<MuscleProps, AnatomicalStructureProps>
>

export default function Muscle(
	{
		antagonist,
		bloodSupply,
		insertion,
		muscleAction,
		nerve,
		schemaType = "Muscle",
		subtypeProperties = {},
		...props
	}: Props,
) {
	return (
		<AnatomicalStructure
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				antagonist,
				bloodSupply,
				insertion,
				muscleAction,
				nerve,
				...subtypeProperties,
			}}
		/>
	)
}
