import type BaseProps from "../../../../types/index.ts"
import type { PerformingGroup as PerformingGroupProps } from "../../../../types/index.ts"

import Base from "../../../Base/index.tsx"

export type Props = PerformingGroupProps & BaseProps

export default function PerformingGroup({
	_type = "PerformingGroup",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
