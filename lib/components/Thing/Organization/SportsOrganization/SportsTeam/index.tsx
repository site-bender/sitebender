import type { BaseComponentProps, ExtractLevelProps } from "../../../../../types/index.ts"
import type ThingProps from "../../../../../types/Thing/index.ts"
import type { OrganizationProps } from "../../../../../types/Thing/Organization/index.ts"
import type { SportsOrganizationProps } from "../../../../../types/Thing/Organization/SportsOrganization/index.ts"
import type { SportsTeamProps } from "../../../../../types/Thing/Organization/SportsOrganization/SportsTeam/index.ts"

import SportsOrganization from "../index.tsx"

export type Props = BaseComponentProps<
	SportsTeamProps,
	"SportsTeam",
	ExtractLevelProps<ThingProps, OrganizationProps, SportsOrganizationProps>
>

export default function SportsTeam({
	athlete,
	coach,
	gender,
	schemaType = "SportsTeam",
	subtypeProperties = {},
	...props
}): Props {
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
