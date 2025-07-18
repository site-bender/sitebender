import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../types/index.ts"
import type ProductProps from "../../../../types/Thing/Product/index.ts"
import type ProductModelProps from "../../../../types/Thing/ProductModel/index.ts"

import Product from "../index.tsx"

export type Props = BaseComponentProps<
	ProductModelProps,
	"ProductModel",
	ExtractLevelProps<ProductModelProps, ProductProps>
>

export default function ProductModel(
	{
		isVariantOf,
		predecessorOf,
		successorOf,
		schemaType = "ProductModel",
		subtypeProperties = {},
		...props
	}: Props,
) {
	return (
		<Product
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				isVariantOf,
				predecessorOf,
				successorOf,
				...subtypeProperties,
			}}
		/>
	)
}
