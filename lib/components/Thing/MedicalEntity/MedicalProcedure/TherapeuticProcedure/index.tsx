import type BaseProps from "../../../../../types/index.ts"
import type TherapeuticProcedureProps from "../../../../../types/Thing/MedicalEntity/MedicalProcedure/TherapeuticProcedure/index.ts"

import MedicalProcedure from "../index.tsx"

export type Props = TherapeuticProcedureProps & BaseProps

export default function TherapeuticProcedure({
	adverseOutcome,
	doseSchedule,
	drug,
	_type = "TherapeuticProcedure",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<MedicalProcedure
			{...props}
			_type={_type}
			subtypeProperties={{
				adverseOutcome,
				doseSchedule,
				drug,
				...subtypeProperties,
			}}
		/>
	)
}
