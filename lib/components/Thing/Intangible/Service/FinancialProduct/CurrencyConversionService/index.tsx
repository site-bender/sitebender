import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../../types/index.ts"
import type CurrencyConversionServiceProps from "../../../../../../types/Thing/CurrencyConversionService/index.ts"
import type FinancialProductProps from "../../../../../../types/Thing/FinancialProduct/index.ts"

import FinancialProduct from "./index.tsx"

// CurrencyConversionService adds no properties to the FinancialProduct schema type
export type Props = BaseComponentProps<
	CurrencyConversionServiceProps,
	"CurrencyConversionService",
	ExtractLevelProps<CurrencyConversionServiceProps, FinancialProductProps>
>

export default function CurrencyConversionService({
	schemaType = "CurrencyConversionService",
	subtypeProperties = {},
	...props
}: Props) {
	return (
		<FinancialProduct
			{...props}
			schemaType={schemaType}
			subtypeProperties={subtypeProperties}
		/>
	)
}
