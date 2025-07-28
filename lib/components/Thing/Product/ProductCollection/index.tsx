import type BaseProps from "../../../../types/index.ts"
import type { ProductCollectionProps } from "../../../../types/Thing/Product/ProductCollection/index.ts"

import Product from "../index.tsx"

export type Props = ProductCollectionProps & BaseProps

export default function ProductCollection({
	includesObject,
	_type = "ProductCollection",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<Product
			{...props}
			_type={_type}
			subtypeProperties={{
				includesObject,
				...subtypeProperties,
			}}
		/>
	)
}
