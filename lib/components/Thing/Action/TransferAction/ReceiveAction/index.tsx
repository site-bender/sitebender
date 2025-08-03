import type BaseProps from "../../../../../types/index.ts"
import type { ReceiveAction as ReceiveActionProps } from "../../../../../types/index.ts"

import TransferAction from "../index.tsx"

export type Props = ReceiveActionProps & BaseProps

export default function ReceiveAction({
	_type = "ReceiveAction",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
