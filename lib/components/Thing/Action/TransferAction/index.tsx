import type BaseProps from "../../../../types/index.ts"
import type { TransferAction as TransferActionProps } from "../../../../types/index.ts"

import Action from "../index.tsx"

export type Props = TransferActionProps & BaseProps

export default function TransferAction({
	_type = "TransferAction",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
