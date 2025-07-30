import type BaseProps from "../../../../../../types/index.ts"
import type MedicalSpecialtyProps from "../../../../../../types/Thing/Intangible/Enumeration/MedicalEnumeration/MedicalSpecialty/index.ts"

import MedicalEnumeration from "../index.tsx"

export type Props = MedicalSpecialtyProps & BaseProps

export default function MedicalSpecialty({
	_type = "MedicalSpecialty",
	children,
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
		>{children}</MedicalEnumeration>
	)
}
