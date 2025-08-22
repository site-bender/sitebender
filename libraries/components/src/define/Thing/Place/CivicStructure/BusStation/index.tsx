import type BaseProps from "../../../../../types/index.ts"
import type { BusStation as BusStationProps } from "../../../../../types/index.ts"

import Base from "../../../../Base/index.tsx"

export type Props = BusStationProps & BaseProps

export default function BusStation({
	_type = "BusStation",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
