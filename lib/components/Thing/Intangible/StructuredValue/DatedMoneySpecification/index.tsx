import type BaseProps from "../../../../../types/index.ts"
import type { DatedMoneySpecificationProps } from "../../../../../types/Thing/Intangible/StructuredValue/DatedMoneySpecification/index.ts"

import StructuredValue from "../index.tsx"

export type Props = DatedMoneySpecificationProps & BaseProps

export default function DatedMoneySpecification({
	amount,
	currency,
	endDate,
	startDate,
	_type = "DatedMoneySpecification",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<StructuredValue
			{...props}
			_type={_type}
			subtypeProperties={{
				amount,
				currency,
				endDate,
				startDate,
				...subtypeProperties,
			}}
		/>
	)
}
