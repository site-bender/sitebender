import type BaseProps from "../../../../types/index.ts"
import type { FloorPlan as FloorPlanProps } from "../../../../types/index.ts"

import Base from "../../../Base/index.tsx"

export type Props = FloorPlanProps & BaseProps

export default function FloorPlan({
	_type = "FloorPlan",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
