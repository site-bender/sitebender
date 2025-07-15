import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../../types/index.ts"
import type CompoundPriceSpecificationProps from "../../../../../../types/Thing/CompoundPriceSpecification/index.ts"
import type PriceSpecificationProps from "../../../../../../types/Thing/PriceSpecification/index.ts"

import PriceSpecification from "./index.tsx"

export type Props = BaseComponentProps<
	CompoundPriceSpecificationProps,
	"CompoundPriceSpecification",
	ExtractLevelProps<CompoundPriceSpecificationProps, PriceSpecificationProps>
>

export default function CompoundPriceSpecification(
	{
		priceComponent,
		priceType,
		schemaType = "CompoundPriceSpecification",
		subtypeProperties = {},
		...props
	}: Props,
) {
	return (
		<PriceSpecification
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				priceComponent,
				priceType,
				...subtypeProperties,
			}}
		/>
	)
}
