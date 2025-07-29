import type BaseProps from "../../../../../../types/index.ts"
import type MedicineSystemProps from "../../../../../../types/Thing/Intangible/Enumeration/MedicalEnumeration/MedicineSystem/index.ts"

import MedicalEnumeration from "../index.tsx"

export type Props = MedicineSystemProps & BaseProps

export default function MedicineSystem({
	_type = "MedicineSystem",
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
