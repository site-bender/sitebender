import type BaseProps from "../../../../../types/index.ts"
import type TreatmentIndicationProps from "../../../../../types/Thing/MedicalEntity/MedicalIndication/TreatmentIndication/index.ts"

import MedicalIndication from "../index.tsx"

export type Props = TreatmentIndicationProps & BaseProps

export default function TreatmentIndication({
	_type = "TreatmentIndication",
	children,
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<MedicalIndication
			{...props}
			_type={_type}
			subtypeProperties={{
				...subtypeProperties,
			}}
		>{children}</MedicalIndication>
	)
}
