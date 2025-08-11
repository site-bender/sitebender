import type BaseProps from "../../../../../../types/index.ts"
import type { SteeringPositionValue as SteeringPositionValueProps } from "../../../../../../types/index.ts"

import Base from "../../../../../Base/index.tsx"

export type Props = SteeringPositionValueProps & BaseProps

export default function SteeringPositionValue({
	_type = "SteeringPositionValue",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
