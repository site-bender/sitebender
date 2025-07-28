import type { BaseComponentProps, ExtractLevelProps } from "../../../../../types/index.ts"
import type ThingProps from "../../../../../types/Thing/index.ts"
import type { MedicalEntityProps } from "../../../../../types/Thing/MedicalEntity/index.ts"
import type { AnatomicalStructureProps } from "../../../../../types/Thing/MedicalEntity/AnatomicalStructure/index.ts"
import type { NerveProps } from "../../../../../types/Thing/MedicalEntity/AnatomicalStructure/Nerve/index.ts"

import AnatomicalStructure from "../index.tsx"

export type Props = BaseComponentProps<
	NerveProps,
	"Nerve",
	ExtractLevelProps<ThingProps, MedicalEntityProps, AnatomicalStructureProps>
>

export default function Nerve({
	branch,
	nerveMotor,
	sensoryUnit,
	sourcedFrom,
	schemaType = "Nerve",
	subtypeProperties = {},
	...props
}): Props {
	return (
		<AnatomicalStructure
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				branch,
				nerveMotor,
				sensoryUnit,
				sourcedFrom,
				...subtypeProperties,
			}}
		/>
	)
}
