import type BaseProps from "../../../../../types/index.ts"
import type { ActivateAction as ActivateActionProps } from "../../../../../types/index.ts"

import ControlAction from "../index.tsx"

export type Props = ActivateActionProps & BaseProps

export default function ActivateAction({
	_type = "ActivateAction",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
