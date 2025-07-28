import type { BaseComponentProps, ExtractLevelProps } from "../../../../types/index.ts"
import type ThingProps from "../../../../types/Thing/index.ts"
import type { OrganizationProps } from "../../../../types/Thing/Organization/index.ts"
import type { MedicalOrganizationProps } from "../../../../types/Thing/Organization/MedicalOrganization/index.ts"

import Organization from "../index.tsx"

export type Props = BaseComponentProps<
	MedicalOrganizationProps,
	"MedicalOrganization",
	ExtractLevelProps<ThingProps, OrganizationProps>
>

export default function MedicalOrganization({
	healthPlanNetworkId,
	isAcceptingNewPatients,
	medicalSpecialty,
	schemaType = "MedicalOrganization",
	subtypeProperties = {},
	...props
}): Props {
	return (
		<Organization
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				healthPlanNetworkId,
				isAcceptingNewPatients,
				medicalSpecialty,
				...subtypeProperties,
			}}
		/>
	)
}
