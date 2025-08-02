import type BaseProps from "../../../../../types/index.ts"
import type MoneyTransferProps from "../../../../../types/Thing/Action/TransferAction/MoneyTransfer/index.ts"

import TransferAction from "../index.tsx"

export type Props = MoneyTransferProps & BaseProps

export default function MoneyTransfer({
	amount,
	beneficiaryBank,
	_type = "MoneyTransfer",
	children,
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<TransferAction
			{...props}
			_type={_type}
			subtypeProperties={{
				amount,
				beneficiaryBank,
				...subtypeProperties,
			}}
		>
			{children}
		</TransferAction>
	)
}
