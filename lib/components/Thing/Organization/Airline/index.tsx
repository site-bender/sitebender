import type BaseProps from "../../../../types/index.ts"
import type { Airline as AirlineProps } from "../../../../types/index.ts"

import Organization from "../index.tsx"

export type Props = AirlineProps & BaseProps

export default function Airline({
	_type = "Airline",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
