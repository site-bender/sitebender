import type BaseProps from "../../../../../types/index.ts"
import type PhysicianProps from "../../../../../types/Thing/Organization/MedicalOrganization/Physician/index.ts"

import MedicalOrganization from "../index.tsx"

export type Props = PhysicianProps & BaseProps

export default function Physician({
	availableService,
	hospitalAffiliation,
	medicalSpecialty,
	occupationalCategory,
	usNPI,
	_type = "Physician",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<MedicalOrganization
			{...props}
			_type={_type}
			subtypeProperties={{
				availableService,
				hospitalAffiliation,
				medicalSpecialty,
				occupationalCategory,
				usNPI,
				...subtypeProperties,
			}}
		/>
	)
}
