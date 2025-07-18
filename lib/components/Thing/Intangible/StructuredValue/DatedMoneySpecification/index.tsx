import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type DatedMoneySpecificationProps from "../../../../../types/Thing/DatedMoneySpecification/index.ts"
import type StructuredValueProps from "../../../../../types/Thing/StructuredValue/index.ts"

import StructuredValue from "../index.tsx"

export type Props = BaseComponentProps<
	DatedMoneySpecificationProps,
	"DatedMoneySpecification",
	ExtractLevelProps<DatedMoneySpecificationProps, StructuredValueProps>
>

export default function DatedMoneySpecification(
	{
		amount,
		currency,
		endDate,
		startDate,
		schemaType = "DatedMoneySpecification",
		subtypeProperties = {},
		...props
	}: Props,
) {
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
