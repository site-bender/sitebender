import type BaseProps from "../../../../../types/index.ts"
import type { CheckAction as CheckActionProps } from "../../../../../types/index.ts"

import FindAction from "../index.tsx"

export type Props = CheckActionProps & BaseProps

export default function CheckAction({
	_type = "CheckAction",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
