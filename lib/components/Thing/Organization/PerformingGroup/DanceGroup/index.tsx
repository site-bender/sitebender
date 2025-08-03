import type BaseProps from "../../../../../types/index.ts"
import type { DanceGroup as DanceGroupProps } from "../../../../../types/index.ts"

import PerformingGroup from "../index.tsx"

export type Props = DanceGroupProps & BaseProps

export default function DanceGroup({
	_type = "DanceGroup",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
