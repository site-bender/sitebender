import type { BaseComponentProps, ExtractLevelProps } from "../../../../../types/index.ts"
import type ThingProps from "../../../../../types/Thing/index.ts"
import type { ActionProps } from "../../../../../types/Thing/Action/index.ts"
import type { TransferActionProps } from "../../../../../types/Thing/Action/TransferAction/index.ts"
import type { BorrowActionProps } from "../../../../../types/Thing/Action/TransferAction/BorrowAction/index.ts"

import TransferAction from "../index.tsx"

export type Props = BaseComponentProps<
	BorrowActionProps,
	"BorrowAction",
	ExtractLevelProps<ThingProps, ActionProps, TransferActionProps>
>

export default function BorrowAction({
	lender,
	schemaType = "BorrowAction",
	subtypeProperties = {},
	...props
}): Props {
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
