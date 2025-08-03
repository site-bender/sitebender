import type BaseProps from "../../../../../types/index.ts"
import type { BusTrip as BusTripProps } from "../../../../../types/index.ts"

import Trip from "../index.tsx"

export type Props = BusTripProps & BaseProps

export default function BusTrip({
	_type = "BusTrip",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
