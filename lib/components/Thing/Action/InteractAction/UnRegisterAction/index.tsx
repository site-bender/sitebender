import type BaseProps from "../../../../../types/index.ts"
import type { UnRegisterAction as UnRegisterActionProps } from "../../../../../types/index.ts"

import InteractAction from "../index.tsx"

export type Props = UnRegisterActionProps & BaseProps

export default function UnRegisterAction({
	_type = "UnRegisterAction",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
