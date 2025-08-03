import type BaseProps from "../../../../types/index.ts"
import type { Seat as SeatProps } from "../../../../types/index.ts"

import Intangible from "../index.tsx"

export type Props = SeatProps & BaseProps

export default function Seat({
	_type = "Seat",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
