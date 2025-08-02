import type BaseProps from "../../../../types/index.ts"
import type ResearchOrganizationProps from "../../../../types/Thing/Organization/ResearchOrganization/index.ts"

import Organization from "../index.tsx"

export type Props = ResearchOrganizationProps & BaseProps

export default function ResearchOrganization({
	_type = "ResearchOrganization",
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
