import type BaseProps from "../../../../../types/index.ts"
import type { BusStop as BusStopProps } from "../../../../../types/index.ts"

import Base from "../../../../Base/index.tsx"

export type Props = BusStopProps & BaseProps

export default function BusStop({
	_type = "BusStop",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
