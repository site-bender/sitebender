import type { BaseComponentProps, ExtractLevelProps } from "../../../../../types/index.ts"
import type ThingProps from "../../../../../types/Thing/index.ts"
import type { OrganizationProps } from "../../../../../types/Thing/Organization/index.ts"
import type { MedicalOrganizationProps } from "../../../../../types/Thing/Organization/MedicalOrganization/index.ts"
import type { MedicalClinicProps } from "../../../../../types/Thing/Organization/MedicalOrganization/MedicalClinic/index.ts"

import MedicalOrganization from "../index.tsx"

export type Props = BaseComponentProps<
	MedicalClinicProps,
	"MedicalClinic",
	ExtractLevelProps<ThingProps, OrganizationProps, MedicalOrganizationProps>
>

export default function MedicalClinic({
	availableService,
	medicalSpecialty,
	schemaType = "MedicalClinic",
	subtypeProperties = {},
	...props
}): Props {
	return (
		<MedicalOrganization
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				availableService,
				medicalSpecialty,
				...subtypeProperties,
			}}
		/>
	)
}
