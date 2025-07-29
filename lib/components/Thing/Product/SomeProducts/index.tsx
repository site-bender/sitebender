import type BaseProps from "../../../../types/index.ts"
import type SomeProductsProps from "../../../../types/Thing/Product/SomeProducts/index.ts"

import Product from "../index.tsx"

export type Props = SomeProductsProps & BaseProps

export default function SomeProducts({
	inventoryLevel,
	_type = "SomeProducts",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<Product
			{...props}
			_type={_type}
			subtypeProperties={{
				inventoryLevel,
				...subtypeProperties,
			}}
		/>
	)
}
