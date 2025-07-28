import type { BaseComponentProps, ExtractLevelProps } from "../../../../../types/index.ts"
import type ThingProps from "../../../../../types/Thing/index.ts"
import type { ActionProps } from "../../../../../types/Thing/Action/index.ts"
import type { TransferActionProps } from "../../../../../types/Thing/Action/TransferAction/index.ts"
import type { MoneyTransferProps } from "../../../../../types/Thing/Action/TransferAction/MoneyTransfer/index.ts"

import TransferAction from "../index.tsx"

export type Props = BaseComponentProps<
	MoneyTransferProps,
	"MoneyTransfer",
	ExtractLevelProps<ThingProps, ActionProps, TransferActionProps>
>

export default function MoneyTransfer({
	amount,
	beneficiaryBank,
	schemaType = "MoneyTransfer",
	subtypeProperties = {},
	...props
}): Props {
	return (
		<TransferAction
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				amount,
				beneficiaryBank,
				...subtypeProperties,
			}}
		/>
	)
}
