import type { BaseComponentProps, ExtractLevelProps } from "../../../../../types/index.ts"
import type ThingProps from "../../../../../types/Thing/index.ts"
import type { OrganizationProps } from "../../../../../types/Thing/Organization/index.ts"
import type { LocalBusinessProps } from "../../../../../types/Thing/Organization/LocalBusiness/index.ts"
import type { ArchiveOrganizationProps } from "../../../../../types/Thing/Organization/LocalBusiness/ArchiveOrganization/index.ts"

import LocalBusiness from "../index.tsx"

export type Props = BaseComponentProps<
	ArchiveOrganizationProps,
	"ArchiveOrganization",
	ExtractLevelProps<ThingProps, OrganizationProps, LocalBusinessProps>
>

export default function ArchiveOrganization({
	archiveHeld,
	schemaType = "ArchiveOrganization",
	subtypeProperties = {},
	...props
}): Props {
	return (
		<LocalBusiness
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				archiveHeld,
				...subtypeProperties,
			}}
		/>
	)
}
