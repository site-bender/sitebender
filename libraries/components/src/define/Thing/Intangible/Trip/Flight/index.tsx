import type BaseProps from "../../../../../../types/index.ts"
import type { Flight as FlightProps } from "../../../../../../types/index.ts"

import Base from "../../../../Base/index.tsx"

export type Props = FlightProps & BaseProps

export default function Flight({
	_type = "Flight",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
