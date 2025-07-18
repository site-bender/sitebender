import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type ArchiveOrganizationProps from "../../../../../types/Thing/ArchiveOrganization/index.ts"
import type LocalBusinessProps from "../../../../../types/Thing/LocalBusiness/index.ts"

import LocalBusiness from "../index.tsx"

export type Props = BaseComponentProps<
	ArchiveOrganizationProps,
	"ArchiveOrganization",
	ExtractLevelProps<ArchiveOrganizationProps, LocalBusinessProps>
>

export default function ArchiveOrganization(
	{
		archiveHeld,
		schemaType = "ArchiveOrganization",
		subtypeProperties = {},
		...props
	}: Props,
) {
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
