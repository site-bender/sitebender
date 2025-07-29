import type BaseProps from "../../../../../../types/index.ts"
import type DrugPrescriptionStatusProps from "../../../../../../types/Thing/Intangible/Enumeration/MedicalEnumeration/DrugPrescriptionStatus/index.ts"

import MedicalEnumeration from "../index.tsx"

export type Props = DrugPrescriptionStatusProps & BaseProps

export default function DrugPrescriptionStatus({
	_type = "DrugPrescriptionStatus",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<MedicalEnumeration
			{...props}
			_type={_type}
			subtypeProperties={{
				...subtypeProperties,
			}}
		/>
	)
}
