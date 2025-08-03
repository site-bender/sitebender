import type BaseProps from "../../../../../../types/index.ts"
import type { NightClub as NightClubProps } from "../../../../../../types/index.ts"

import EntertainmentBusiness from "../index.tsx"

export type Props = NightClubProps & BaseProps

export default function NightClub({
	_type = "NightClub",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
