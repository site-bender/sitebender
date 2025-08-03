import type BaseProps from "../../../../../types/index.ts"
import type { Airport as AirportProps } from "../../../../../types/index.ts"

import CivicStructure from "../index.tsx"

export type Props = AirportProps & BaseProps

export default function Airport({
	_type = "Airport",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
