import type BaseProps from "../../../../../../types/index.ts"
import type { InvestmentOrDepositProps } from "../../../../../../types/Thing/Intangible/Service/FinancialProduct/InvestmentOrDeposit/index.ts"

import FinancialProduct from "../index.tsx"

export type Props = InvestmentOrDepositProps & BaseProps

export default function InvestmentOrDeposit({
	amount,
	_type = "InvestmentOrDeposit",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<FinancialProduct
			{...props}
			_type={_type}
			subtypeProperties={{
				amount,
				...subtypeProperties,
			}}
		/>
	)
}
