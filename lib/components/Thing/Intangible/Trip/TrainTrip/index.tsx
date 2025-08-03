import type BaseProps from "../../../../../types/index.ts"
import type { TrainTrip as TrainTripProps } from "../../../../../types/index.ts"

import Trip from "../index.tsx"

export type Props = TrainTripProps & BaseProps

export default function TrainTrip({
	_type = "TrainTrip",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
