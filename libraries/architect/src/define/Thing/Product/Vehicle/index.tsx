import type BaseProps from "../../../../../types/index.ts"
import type { Vehicle as VehicleProps } from "../../../../../types/index.ts"

import Base from "../../../Base/index.tsx"

export type Props = VehicleProps & BaseProps

export default function Vehicle({
	_type = "Vehicle",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
