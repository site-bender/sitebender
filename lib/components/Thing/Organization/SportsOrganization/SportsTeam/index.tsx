import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type SportsOrganizationProps from "../../../../../types/Thing/SportsOrganization/index.ts"
import type SportsTeamProps from "../../../../../types/Thing/SportsTeam/index.ts"

import SportsOrganization from "../index.tsx"

export type Props = BaseComponentProps<
	SportsTeamProps,
	"SportsTeam",
	ExtractLevelProps<SportsTeamProps, SportsOrganizationProps>
>

export default function SportsTeam(
	{
		athlete,
		coach,
		gender,
		schemaType = "SportsTeam",
		subtypeProperties = {},
		...props
	}: Props,
) {
	return (
		<SportsOrganization
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				athlete,
				coach,
				gender,
				...subtypeProperties,
			}}
		/>
	)
}
