import type BaseProps from "../../../../../../types/index.ts"
import type { MotorcycleRepair as MotorcycleRepairProps } from "../../../../../../types/index.ts"

import AutomotiveBusiness from "../index.tsx"

export type Props = MotorcycleRepairProps & BaseProps

export default function MotorcycleRepair({
	_type = "MotorcycleRepair",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
