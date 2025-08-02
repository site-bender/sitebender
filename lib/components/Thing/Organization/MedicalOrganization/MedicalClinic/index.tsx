import type BaseProps from "../../../../../types/index.ts"
import type MedicalClinicProps from "../../../../../types/Thing/Organization/MedicalOrganization/MedicalClinic/index.ts"

import MedicalOrganization from "../index.tsx"

export type Props = MedicalClinicProps & BaseProps

export default function MedicalClinic({
	availableService,
	medicalSpecialty,
	_type = "MedicalClinic",
	children,
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<MedicalOrganization
			{...props}
			_type={_type}
			subtypeProperties={{
				availableService,
				medicalSpecialty,
				...subtypeProperties,
			}}
		>
			{children}
		</MedicalOrganization>
	)
}
