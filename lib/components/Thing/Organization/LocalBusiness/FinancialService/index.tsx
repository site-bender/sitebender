import type BaseProps from "../../../../../types/index.ts"
import type FinancialServiceProps from "../../../../../types/Thing/Organization/LocalBusiness/FinancialService/index.ts"

import LocalBusiness from "../index.tsx"

export type Props = FinancialServiceProps & BaseProps

export default function FinancialService({
	feesAndCommissionsSpecification,
	_type = "FinancialService",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<LocalBusiness
			{...props}
			_type={_type}
			subtypeProperties={{
				feesAndCommissionsSpecification,
				...subtypeProperties,
			}}
		/>
	)
}
