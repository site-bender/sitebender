import type { BaseComponentProps, ExtractLevelProps } from "../../../../../types/index.ts"
import type ThingProps from "../../../../../types/Thing/index.ts"
import type { IntangibleProps } from "../../../../../types/Thing/Intangible/index.ts"
import type { ServiceProps } from "../../../../../types/Thing/Intangible/Service/index.ts"
import type { FinancialProductProps } from "../../../../../types/Thing/Intangible/Service/FinancialProduct/index.ts"

import Service from "../index.tsx"

export type Props = BaseComponentProps<
	FinancialProductProps,
	"FinancialProduct",
	ExtractLevelProps<ThingProps, IntangibleProps, ServiceProps>
>

export default function FinancialProduct({
	annualPercentageRate,
	feesAndCommissionsSpecification,
	interestRate,
	schemaType = "FinancialProduct",
	subtypeProperties = {},
	...props
}): Props {
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
