import type { BaseComponentProps, ExtractLevelProps } from "../../../../../types/index.ts"
import type ThingProps from "../../../../../types/Thing/index.ts"
import type { IntangibleProps } from "../../../../../types/Thing/Intangible/index.ts"
import type { StructuredValueProps } from "../../../../../types/Thing/Intangible/StructuredValue/index.ts"
import type { DatedMoneySpecificationProps } from "../../../../../types/Thing/Intangible/StructuredValue/DatedMoneySpecification/index.ts"

import StructuredValue from "../index.tsx"

export type Props = BaseComponentProps<
	DatedMoneySpecificationProps,
	"DatedMoneySpecification",
	ExtractLevelProps<ThingProps, IntangibleProps, StructuredValueProps>
>

export default function DatedMoneySpecification({
	amount,
	currency,
	endDate,
	startDate,
	schemaType = "DatedMoneySpecification",
	subtypeProperties = {},
	...props
}): Props {
	return (
		<StructuredValue
			{...props}
			schemaType={schemaType}
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
