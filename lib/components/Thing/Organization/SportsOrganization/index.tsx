import type BaseProps from "../../../../types/index.ts"
import type SportsOrganizationProps from "../../../../types/Thing/Organization/SportsOrganization/index.ts"

import Organization from "../index.tsx"

export type Props = SportsOrganizationProps & BaseProps

export default function SportsOrganization({
	sport,
	_type = "SportsOrganization",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<Organization
			{...props}
			_type={_type}
			subtypeProperties={{
				sport,
				...subtypeProperties,
			}}
		/>
	)
}
