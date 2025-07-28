import type BaseProps from "../../../../../types/index.ts"
import type { FinancialProductProps } from "../../../../../types/Thing/Intangible/Service/FinancialProduct/index.ts"

import Service from "../index.tsx"

export type Props = FinancialProductProps & BaseProps

export default function FinancialProduct({
	annualPercentageRate,
	feesAndCommissionsSpecification,
	interestRate,
	_type = "FinancialProduct",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<Service
			{...props}
			_type={_type}
			subtypeProperties={{
				annualPercentageRate,
				feesAndCommissionsSpecification,
				interestRate,
				...subtypeProperties,
			}}
		/>
	)
}
