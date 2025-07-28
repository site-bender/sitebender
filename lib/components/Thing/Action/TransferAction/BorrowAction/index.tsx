import type BaseProps from "../../../../../types/index.ts"
import type { BorrowActionProps } from "../../../../../types/Thing/Action/TransferAction/BorrowAction/index.ts"

import TransferAction from "../index.tsx"

export type Props = BorrowActionProps & BaseProps

export default function BorrowAction({
	lender,
	_type = "BorrowAction",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<TransferAction
			{...props}
			_type={_type}
			subtypeProperties={{
				lender,
				...subtypeProperties,
			}}
		/>
	)
}
