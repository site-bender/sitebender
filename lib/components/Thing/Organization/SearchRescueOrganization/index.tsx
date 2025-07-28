import type BaseProps from "../../../../types/index.ts"
import type { SearchRescueOrganizationProps } from "../../../../types/Thing/Organization/SearchRescueOrganization/index.ts"

import Organization from "../index.tsx"

export type Props = SearchRescueOrganizationProps & BaseProps

export default function SearchRescueOrganization({
	_type = "SearchRescueOrganization",
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
		/>
	)
}
