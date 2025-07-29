import type BaseProps from "../../../../../../../types/index.ts"
import type BrokerageAccountProps from "../../../../../../../types/Thing/Intangible/Service/FinancialProduct/InvestmentOrDeposit/BrokerageAccount/index.ts"

import InvestmentOrDeposit from "../index.tsx"

export type Props = BrokerageAccountProps & BaseProps

export default function BrokerageAccount({
	_type = "BrokerageAccount",
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
