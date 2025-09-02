import type BaseProps from "../../../../../../types/index.ts"
import type { PlanAction as PlanActionProps } from "../../../../../../types/index.ts"

import Base from "../../../../Base/index.tsx"

export type Props = PlanActionProps & BaseProps

export default function PlanAction({
	_type = "PlanAction",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
