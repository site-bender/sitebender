import type BaseProps from "../../../../../types/index.ts"
import type ArchiveOrganizationProps from "../../../../../types/Thing/Organization/LocalBusiness/ArchiveOrganization/index.ts"

import LocalBusiness from "../index.tsx"

export type Props = ArchiveOrganizationProps & BaseProps

export default function ArchiveOrganization({
	archiveHeld,
	_type = "ArchiveOrganization",
	children,
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<LocalBusiness
			{...props}
			_type={_type}
			subtypeProperties={{
				archiveHeld,
				...subtypeProperties,
			}}
		>{children}</LocalBusiness>
	)
}
