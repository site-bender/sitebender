import type BaseProps from "../../../../../types/index.ts"
import type { BoatTrip as BoatTripProps } from "../../../../../types/index.ts"

import Trip from "../index.tsx"

export type Props = BoatTripProps & BaseProps

export default function BoatTrip({
	_type = "BoatTrip",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
