import type BaseProps from "../../../../../../../types/index.ts"
import type DepositAccountProps from "../../../../../../../types/Thing/Intangible/Service/FinancialProduct/BankAccount/DepositAccount/index.ts"

import BankAccount from "../index.tsx"

export type Props = DepositAccountProps & BaseProps

export default function DepositAccount({
	_type = "DepositAccount",
	children,
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<BankAccount
			{...props}
			_type={_type}
			subtypeProperties={{
				...subtypeProperties,
			}}
		>
			{children}
		</BankAccount>
	)
}
