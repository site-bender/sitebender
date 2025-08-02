import type BaseProps from "../../../../../../types/index.ts"
import type MedicalSpecialtyProps from "../../../../../../types/Thing/Intangible/Enumeration/Specialty/MedicalSpecialty/index.ts"

import Specialty from "../index.tsx"

// MedicalSpecialty adds no properties to the ListItem schema type
export type Props = MedicalSpecialtyProps & BaseProps

export default function MedicalSpecialty({
	_type = "MedicalSpecialty",
	children,
	subtypeProperties = {},
	...props
}: Props) {
	return (
		<Specialty
			{...props}
			_type={_type}
			subtypeProperties={subtypeProperties}
		>
			{children}
		</Specialty>
	)
}
