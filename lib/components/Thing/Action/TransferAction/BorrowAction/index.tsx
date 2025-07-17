import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type BorrowActionProps from "../../../../../types/Thing/BorrowAction/index.ts"
import type TransferActionProps from "../../../../../types/Thing/TransferAction/index.ts"

import TransferAction from "../index.tsx"

export type Props = BaseComponentProps<
	BorrowActionProps,
	"BorrowAction",
	ExtractLevelProps<BorrowActionProps, TransferActionProps>
>

export default function BorrowAction(
	{
		lender,
		schemaType = "BorrowAction",
		subtypeProperties = {},
		...props
	}: Props,
) {
	return (
		<TransferAction
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				lender,
				...subtypeProperties,
			}}
		/>
	)
}
