import type BaseProps from "../../../../../../types/index.ts"
import type MedicalTherapyProps from "../../../../../../types/Thing/MedicalEntity/MedicalProcedure/TherapeuticProcedure/MedicalTherapy/index.ts"

import TherapeuticProcedure from "../index.tsx"

export type Props = MedicalTherapyProps & BaseProps

export default function MedicalTherapy({
	contraindication,
	duplicateTherapy,
	seriousAdverseOutcome,
	_type = "MedicalTherapy",
	children,
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<TherapeuticProcedure
			{...props}
			_type={_type}
			subtypeProperties={{
				contraindication,
				duplicateTherapy,
				seriousAdverseOutcome,
				...subtypeProperties,
			}}
		>
			{children}
		</TherapeuticProcedure>
	)
}
