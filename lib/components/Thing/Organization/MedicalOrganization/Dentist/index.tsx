import type BaseProps from "../../../../../types/index.ts"
import type DentistProps from "../../../../../types/Thing/Organization/MedicalOrganization/Dentist/index.ts"

import MedicalOrganization from "../index.tsx"

// Dentist adds no properties to the MedicalOrganization schema type
export type Props = DentistProps & BaseProps

export default function Dentist({
	_type = "Dentist",
	children,
	subtypeProperties = {},
	...props
}: Props) {
	return (
		<MedicalOrganization
			{...props}
			_type={_type}
			subtypeProperties={subtypeProperties}
		>
			{children}
		</MedicalOrganization>
	)
}
