import type BaseProps from "../../../../../types/index.ts"
import type { RVPark as RVParkProps } from "../../../../../types/index.ts"

import CivicStructure from "../index.tsx"

export type Props = RVParkProps & BaseProps

export default function RVPark({
	_type = "RVPark",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
