import type BaseProps from "../../../../../types/index.ts"
import type { SportsTeamProps } from "../../../../../types/Thing/Organization/SportsOrganization/SportsTeam/index.ts"

import SportsOrganization from "../index.tsx"

export type Props = SportsTeamProps & BaseProps

export default function SportsTeam({
	athlete,
	coach,
	gender,
	_type = "SportsTeam",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<SportsOrganization
			{...props}
			_type={_type}
			subtypeProperties={{
				athlete,
				coach,
				gender,
				...subtypeProperties,
			}}
		/>
	)
}
