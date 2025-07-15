import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type MoneyTransferProps from "../../../../../types/Thing/MoneyTransfer/index.ts"
import type TransferActionProps from "../../../../../types/Thing/TransferAction/index.ts"

import TransferAction from "./index.tsx"

export type Props = BaseComponentProps<
	MoneyTransferProps,
	"MoneyTransfer",
	ExtractLevelProps<MoneyTransferProps, TransferActionProps>
>

export default function MoneyTransfer(
	{
		amount,
		beneficiaryBank,
		schemaType = "MoneyTransfer",
		subtypeProperties = {},
		...props
	}: Props,
) {
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
