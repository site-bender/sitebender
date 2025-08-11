import type BaseProps from "../../../../../../types/index.ts"
import type { LymphaticVessel as LymphaticVesselProps } from "../../../../../../types/index.ts"

import Base from "../../../../../Base/index.tsx"

export type Props = LymphaticVesselProps & BaseProps

export default function LymphaticVessel({
	_type = "LymphaticVessel",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
