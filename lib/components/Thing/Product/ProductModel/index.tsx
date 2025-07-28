import type BaseProps from "../../../../types/index.ts"
import type { ProductModelProps } from "../../../../types/Thing/Product/ProductModel/index.ts"

import Product from "../index.tsx"

export type Props = ProductModelProps & BaseProps

export default function ProductModel({
	isVariantOf,
	predecessorOf,
	successorOf,
	_type = "ProductModel",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<Product
			{...props}
			_type={_type}
			subtypeProperties={{
				isVariantOf,
				predecessorOf,
				successorOf,
				...subtypeProperties,
			}}
		/>
	)
}
