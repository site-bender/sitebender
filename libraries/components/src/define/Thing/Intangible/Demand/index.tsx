import type BaseProps from "../../../../types/index.ts"
import type { Demand as DemandProps } from "../../../../types/index.ts"

import Base from "../../../Base/index.tsx"

export type Props = DemandProps & BaseProps

export default function Demand({
	_type = "Demand",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
