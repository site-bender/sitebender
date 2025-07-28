import type { BaseComponentProps, ExtractLevelProps } from "../../../../../types/index.ts"
import type ThingProps from "../../../../../types/Thing/index.ts"
import type { OrganizationProps } from "../../../../../types/Thing/Organization/index.ts"
import type { MedicalOrganizationProps } from "../../../../../types/Thing/Organization/MedicalOrganization/index.ts"
import type { PhysicianProps } from "../../../../../types/Thing/Organization/MedicalOrganization/Physician/index.ts"

import MedicalOrganization from "../index.tsx"

export type Props = BaseComponentProps<
	PhysicianProps,
	"Physician",
	ExtractLevelProps<ThingProps, OrganizationProps, MedicalOrganizationProps>
>

export default function Physician({
	availableService,
	hospitalAffiliation,
	medicalSpecialty,
	occupationalCategory,
	usNPI,
	schemaType = "Physician",
	subtypeProperties = {},
	...props
}): Props {
	return (
		<MedicalOrganization
			{...props}
			schemaType={schemaType}
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
