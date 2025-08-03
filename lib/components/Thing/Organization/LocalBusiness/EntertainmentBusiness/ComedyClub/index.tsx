import type BaseProps from "../../../../../../types/index.ts"
import type { ComedyClub as ComedyClubProps } from "../../../../../../types/index.ts"

import EntertainmentBusiness from "../index.tsx"

export type Props = ComedyClubProps & BaseProps

export default function ComedyClub({
	_type = "ComedyClub",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
