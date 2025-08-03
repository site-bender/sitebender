import type BaseProps from "../../../../../types/index.ts"
import type { DeactivateAction as DeactivateActionProps } from "../../../../../types/index.ts"

import ControlAction from "../index.tsx"

export type Props = DeactivateActionProps & BaseProps

export default function DeactivateAction({
	_type = "DeactivateAction",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
