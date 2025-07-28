import type BaseProps from "../../../../../../../types/index.ts"
import type { InvestmentFundProps } from "../../../../../../../types/Thing/Intangible/Service/FinancialProduct/InvestmentOrDeposit/InvestmentFund/index.ts"

import InvestmentOrDeposit from "../index.tsx"

export type Props = InvestmentFundProps & BaseProps

export default function InvestmentFund({
	_type = "InvestmentFund",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<InvestmentOrDeposit
			{...props}
			_type={_type}
			subtypeProperties={{
				...subtypeProperties,
			}}
		/>
	)
}
