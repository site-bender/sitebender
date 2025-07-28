import type BaseProps from "../../../../../../types/index.ts"
import type { CurrencyConversionServiceProps } from "../../../../../../types/Thing/Intangible/Service/FinancialProduct/CurrencyConversionService/index.ts"

import FinancialProduct from "../index.tsx"

export type Props = CurrencyConversionServiceProps & BaseProps

export default function CurrencyConversionService({
	_type = "CurrencyConversionService",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<FinancialProduct
			{...props}
			_type={_type}
			subtypeProperties={{
				...subtypeProperties,
			}}
		/>
	)
}
