import type BaseProps from "../../../../types/index.ts"
import type EducationalOrganizationProps from "../../../../types/Thing/Organization/EducationalOrganization/index.ts"

import Organization from "../index.tsx"

export type Props = EducationalOrganizationProps & BaseProps

export default function EducationalOrganization({
	_type = "EducationalOrganization",
	children,
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<Organization
			{...props}
			_type={_type}
			subtypeProperties={{
				...subtypeProperties,
			}}
		>{children}</Organization>
	)
}
