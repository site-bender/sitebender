import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../../types/index.ts"
import type PsychologicalTreatmentProps from "../../../../../../types/Thing/PsychologicalTreatment/index.ts"
import type TherapeuticProcedureProps from "../../../../../../types/Thing/TherapeuticProcedure/index.ts"

import TherapeuticProcedure from "./index.tsx"

// PsychologicalTreatment adds no properties to the TherapeuticProcedure schema type
export type Props = BaseComponentProps<
	PsychologicalTreatmentProps,
	"PsychologicalTreatment",
	ExtractLevelProps<PsychologicalTreatmentProps, TherapeuticProcedureProps>
>

export default function PsychologicalTreatment({
	schemaType = "PsychologicalTreatment",
	subtypeProperties = {},
	...props
}: Props) {
	return (
		<TherapeuticProcedure
			{...props}
			schemaType={schemaType}
			subtypeProperties={subtypeProperties}
		/>
	)
}
