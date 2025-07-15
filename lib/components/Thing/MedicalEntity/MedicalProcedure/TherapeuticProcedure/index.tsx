import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type MedicalProcedureProps from "../../../../../types/Thing/MedicalProcedure/index.ts"
import type TherapeuticProcedureProps from "../../../../../types/Thing/TherapeuticProcedure/index.ts"

import MedicalProcedure from "./index.tsx"

export type Props = BaseComponentProps<
	TherapeuticProcedureProps,
	"TherapeuticProcedure",
	ExtractLevelProps<TherapeuticProcedureProps, MedicalProcedureProps>
>

export default function TherapeuticProcedure(
	{
		adverseOutcome,
		doseSchedule,
		drug,
		schemaType = "TherapeuticProcedure",
		subtypeProperties = {},
		...props
	}: Props,
) {
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
