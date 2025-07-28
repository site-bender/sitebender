import type { BaseComponentProps, ExtractLevelProps } from "../../../../../types/index.ts"
import type ThingProps from "../../../../../types/Thing/index.ts"
import type { MedicalEntityProps } from "../../../../../types/Thing/MedicalEntity/index.ts"
import type { AnatomicalStructureProps } from "../../../../../types/Thing/MedicalEntity/AnatomicalStructure/index.ts"
import type { MuscleProps } from "../../../../../types/Thing/MedicalEntity/AnatomicalStructure/Muscle/index.ts"

import AnatomicalStructure from "../index.tsx"

export type Props = BaseComponentProps<
	MuscleProps,
	"Muscle",
	ExtractLevelProps<ThingProps, MedicalEntityProps, AnatomicalStructureProps>
>

export default function Muscle({
	antagonist,
	bloodSupply,
	insertion,
	muscleAction,
	nerve,
	schemaType = "Muscle",
	subtypeProperties = {},
	...props
}): Props {
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
