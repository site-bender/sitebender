import type BaseProps from "../../../../../../types/index.ts"
import type { MotorizedBicycle as MotorizedBicycleProps } from "../../../../../../types/index.ts"

import Base from "../../../../Base/index.tsx"

export type Props = MotorizedBicycleProps & BaseProps

export default function MotorizedBicycle({
	_type = "MotorizedBicycle",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
