import type BaseProps from "../../../../../../types/index.ts"
import type PsychologicalTreatmentProps from "../../../../../../types/Thing/MedicalEntity/MedicalProcedure/TherapeuticProcedure/PsychologicalTreatment/index.ts"

import TherapeuticProcedure from "../index.tsx"

export type Props = PsychologicalTreatmentProps & BaseProps

export default function PsychologicalTreatment({
	_type = "PsychologicalTreatment",
	children,
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<TherapeuticProcedure
			{...props}
			_type={_type}
			subtypeProperties={{
				...subtypeProperties,
			}}
		>{children}</TherapeuticProcedure>
	)
}
