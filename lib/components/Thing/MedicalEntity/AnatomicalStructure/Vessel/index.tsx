import type BaseProps from "../../../../../types/index.ts"
import type { Vessel as VesselProps } from "../../../../../types/index.ts"

import Base from "../../../../Base/index.tsx"

export type Props = VesselProps & BaseProps

export default function Vessel({
	_type = "Vessel",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
