import type { BaseComponentProps, ExtractLevelProps } from "../../../../../types/index.ts"
import type ThingProps from "../../../../../types/Thing/index.ts"
import type { MedicalEntityProps } from "../../../../../types/Thing/MedicalEntity/index.ts"
import type { MedicalProcedureProps } from "../../../../../types/Thing/MedicalEntity/MedicalProcedure/index.ts"
import type { TherapeuticProcedureProps } from "../../../../../types/Thing/MedicalEntity/MedicalProcedure/TherapeuticProcedure/index.ts"

import MedicalProcedure from "../index.tsx"

export type Props = BaseComponentProps<
	TherapeuticProcedureProps,
	"TherapeuticProcedure",
	ExtractLevelProps<ThingProps, MedicalEntityProps, MedicalProcedureProps>
>

export default function TherapeuticProcedure({
	adverseOutcome,
	doseSchedule,
	drug,
	schemaType = "TherapeuticProcedure",
	subtypeProperties = {},
	...props
}): Props {
	return (
		<MedicalProcedure
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				adverseOutcome,
				doseSchedule,
				drug,
				...subtypeProperties,
			}}
		/>
	)
}
