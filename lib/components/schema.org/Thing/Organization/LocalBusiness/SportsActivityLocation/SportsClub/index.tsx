import type BaseProps from "../../../../../../types/index.ts"
import type { SportsClub as SportsClubProps } from "../../../../../../types/index.ts"

import Base from "../../../../../Base/index.tsx"

export type Props = SportsClubProps & BaseProps

export default function SportsClub({
	_type = "SportsClub",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
