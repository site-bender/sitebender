import type BaseProps from "../../../../../../types/index.ts"
import type { SportsTeam as SportsTeamProps } from "../../../../../../types/index.ts"

import Base from "../../../../Base/index.tsx"

export type Props = SportsTeamProps & BaseProps

export default function SportsTeam({
	_type = "SportsTeam",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
