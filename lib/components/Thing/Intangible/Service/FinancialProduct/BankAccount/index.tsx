import type BaseProps from "../../../../../../types/index.ts"
import type { BankAccountProps } from "../../../../../../types/Thing/Intangible/Service/FinancialProduct/BankAccount/index.ts"

import FinancialProduct from "../index.tsx"

export type Props = BankAccountProps & BaseProps

export default function BankAccount({
	accountMinimumInflow,
	accountOverdraftLimit,
	bankAccountType,
	_type = "BankAccount",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<FinancialProduct
			{...props}
			_type={_type}
			subtypeProperties={{
				accountMinimumInflow,
				accountOverdraftLimit,
				bankAccountType,
				...subtypeProperties,
			}}
		/>
	)
}
