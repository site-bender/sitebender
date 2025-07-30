import type BaseProps from "../../../../types/index.ts"
import type MedicalOrganizationProps from "../../../../types/Thing/Organization/MedicalOrganization/index.ts"

import Organization from "../index.tsx"

export type Props = MedicalOrganizationProps & BaseProps

export default function MedicalOrganization({
	healthPlanNetworkId,
	isAcceptingNewPatients,
	medicalSpecialty,
	_type = "MedicalOrganization",
	children,
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<Organization
			{...props}
			_type={_type}
			subtypeProperties={{
				healthPlanNetworkId,
				isAcceptingNewPatients,
				medicalSpecialty,
				...subtypeProperties,
			}}
		>{children}</Organization>
	)
}
