import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type FinancialProductProps from "../../../../../types/Thing/FinancialProduct/index.ts"
import type ServiceProps from "../../../../../types/Thing/Service/index.ts"

import Service from "../index.tsx"

export type Props = BaseComponentProps<
	FinancialProductProps,
	"FinancialProduct",
	ExtractLevelProps<FinancialProductProps, ServiceProps>
>

export default function FinancialProduct(
	{
		annualPercentageRate,
		feesAndCommissionsSpecification,
		interestRate,
		schemaType = "FinancialProduct",
		subtypeProperties = {},
		...props
	}: Props,
) {
	return (
		<Service
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				annualPercentageRate,
				feesAndCommissionsSpecification,
				interestRate,
				...subtypeProperties,
			}}
		/>
	)
}
