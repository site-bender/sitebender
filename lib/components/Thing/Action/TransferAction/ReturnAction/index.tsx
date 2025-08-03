import type BaseProps from "../../../../../types/index.ts"
import type { ReturnAction as ReturnActionProps } from "../../../../../types/index.ts"

import TransferAction from "../index.tsx"

export type Props = ReturnActionProps & BaseProps

export default function ReturnAction({
	_type = "ReturnAction",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
