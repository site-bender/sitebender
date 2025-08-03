import type BaseProps from "../../../../../types/index.ts"
import type { IgnoreAction as IgnoreActionProps } from "../../../../../types/index.ts"

import AssessAction from "../index.tsx"

export type Props = IgnoreActionProps & BaseProps

export default function IgnoreAction({
	_type = "IgnoreAction",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
