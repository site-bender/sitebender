import type BaseProps from "../../../../../../types/index.ts"
import type { HealthClub as HealthClubProps } from "../../../../../../types/index.ts"

import SportsActivityLocation from "../index.tsx"

// HealthClub adds no properties to the ListItem schema type
export type Props = HealthClubProps & BaseProps

export default function HealthClub({
	_type = "HealthClub",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
