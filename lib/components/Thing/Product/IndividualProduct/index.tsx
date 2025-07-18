import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../types/index.ts"
import type IndividualProductProps from "../../../../types/Thing/IndividualProduct/index.ts"
import type ProductProps from "../../../../types/Thing/Product/index.ts"

import Product from "../index.tsx"

export type Props = BaseComponentProps<
	IndividualProductProps,
	"IndividualProduct",
	ExtractLevelProps<IndividualProductProps, ProductProps>
>

export default function IndividualProduct(
	{
		serialNumber,
		schemaType = "IndividualProduct",
		subtypeProperties = {},
		...props
	}: Props,
) {
	return (
		<Product
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				serialNumber,
				...subtypeProperties,
			}}
		/>
	)
}
