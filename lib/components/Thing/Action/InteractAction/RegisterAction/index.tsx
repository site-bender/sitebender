import type BaseProps from "../../../../../types/index.ts"
import type { RegisterAction as RegisterActionProps } from "../../../../../types/index.ts"

import InteractAction from "../index.tsx"

export type Props = RegisterActionProps & BaseProps

export default function RegisterAction({
	_type = "RegisterAction",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
