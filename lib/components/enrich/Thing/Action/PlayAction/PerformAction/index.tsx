import type BaseProps from "../../../../../types/index.ts"
import type { PerformAction as PerformActionProps } from "../../../../../types/index.ts"

import Base from "../../../../Base/index.tsx"

export type Props = PerformActionProps & BaseProps

export default function PerformAction({
	_type = "PerformAction",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
