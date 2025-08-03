import type BaseProps from "../../../../../types/index.ts"
import type { BorrowAction as BorrowActionProps } from "../../../../../types/index.ts"

import TransferAction from "../index.tsx"

export type Props = BorrowActionProps & BaseProps

export default function BorrowAction({
	_type = "BorrowAction",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
