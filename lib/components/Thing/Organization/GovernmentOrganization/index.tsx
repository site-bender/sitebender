import type BaseProps from "../../../../types/index.ts"
import type GovernmentOrganizationProps from "../../../../types/Thing/Organization/GovernmentOrganization/index.ts"

import Organization from "../index.tsx"

export type Props = GovernmentOrganizationProps & BaseProps

export default function GovernmentOrganization({
	_type = "GovernmentOrganization",
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
		>
			{children}
		</Organization>
	)
}
